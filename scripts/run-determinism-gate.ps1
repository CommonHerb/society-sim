param(
  [Parameter(Mandatory = $false)]
  [string]$Root = ""
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($Root)) {
  $Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
}

$herbRoot = Join-Path $Root "HERB"
if (-not (Test-Path $herbRoot)) {
  throw "HERB root path not found: $herbRoot"
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "Git is required for determinism gate."
}

$manifestPath = Join-Path $Root "docs\DETERMINISM_MANIFEST.txt"
if (-not (Test-Path $manifestPath)) {
  throw "Determinism manifest not found: $manifestPath"
}

$activePaths = @("src", "boot", "programs")
$allowedExt = @(".herb", ".asm", ".inc", ".ld")

$tracked = @()
foreach ($p in $activePaths) {
  $entries = & git -C $herbRoot ls-files "$p/*"
  if ($LASTEXITCODE -ne 0) {
    throw "Failed to enumerate tracked files under HERB/$p."
  }

  foreach ($rel in $entries) {
    if ([string]::IsNullOrWhiteSpace($rel)) { continue }
    $ext = [System.IO.Path]::GetExtension($rel).ToLowerInvariant()
    if ([string]::IsNullOrWhiteSpace($ext)) {
      throw "Tracked file has no extension in active path: HERB/$rel"
    }
    if (-not ($allowedExt -contains $ext)) {
      throw "Non-pure extension detected in active path during determinism check: HERB/$rel"
    }
    $tracked += $rel
  }
}

$tracked = $tracked | Sort-Object -Unique

$actual = @()
foreach ($rel in $tracked) {
  $full = Join-Path $herbRoot $rel
  if (-not (Test-Path $full)) {
    throw "Tracked file missing from checkout: HERB/$rel"
  }

  $hash = (Get-FileHash -Path $full -Algorithm SHA256).Hash.ToLowerInvariant()
  $norm = ($rel -replace "\\", "/")
  $actual += "$hash  HERB/$norm"
}

$actual = $actual | Sort-Object

$expected = Get-Content -Path $manifestPath |
  ForEach-Object { $_.TrimEnd() } |
  Where-Object { $_ -and -not $_.StartsWith("#") } |
  Sort-Object

if ($actual.Count -ne $expected.Count) {
  Write-Host "Determinism manifest mismatch: line count differs."
  Write-Host "Expected: $($expected.Count) entries"
  Write-Host "Actual:   $($actual.Count) entries"
  $delta = Compare-Object -ReferenceObject $expected -DifferenceObject $actual -IncludeEqual:$false
  $delta | Select-Object -First 20 | ForEach-Object {
    $side = if ($_.SideIndicator -eq "<=") { "missing" } else { "unexpected" }
    Write-Host " - ${side}: $($_.InputObject)"
  }
  exit 1
}

$diff = Compare-Object -ReferenceObject $expected -DifferenceObject $actual -IncludeEqual:$false
if ($diff) {
  Write-Host "Determinism manifest mismatch detected."
  $diff | Select-Object -First 20 | ForEach-Object {
    $side = if ($_.SideIndicator -eq "<=") { "missing" } else { "unexpected" }
    Write-Host " - ${side}: $($_.InputObject)"
  }
  exit 1
}

Write-Host "Determinism gate passed with $($actual.Count) stable entries."
exit 0
