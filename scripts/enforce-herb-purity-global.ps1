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
  throw "HERB path not found: $herbRoot"
}

$activePaths = @(
  "src",
  "boot",
  "programs"
)

# Absolute purity contract for implementation code
$allowedExt = @(".herb", ".asm", ".inc", ".ld")
$forbiddenExt = @(
  ".py", ".pyc", ".pyo",
  ".c", ".h", ".cpp", ".cc", ".cxx",
  ".json", ".sh", ".bash", ".zsh",
  ".js", ".mjs", ".cjs", ".ts", ".tsx",
  ".rs", ".go", ".java", ".cs", ".rb", ".php", ".lua", ".swift", ".kt", ".kts"
)

$violations = @()
$trackedCodeCount = 0
$pureCount = 0

foreach ($p in $activePaths) {
  $tracked = & git -C $herbRoot ls-files "$p/*"
  foreach ($rel in $tracked) {
    if ([string]::IsNullOrWhiteSpace($rel)) { continue }

    $ext = [System.IO.Path]::GetExtension($rel).ToLowerInvariant()
    if ([string]::IsNullOrWhiteSpace($ext)) {
      $violations += "No extension is not allowed in active path: $rel"
      continue
    }

    $trackedCodeCount += 1

    if ($forbiddenExt -contains $ext) {
      $violations += "Forbidden extension in active path: $rel"
      continue
    }

    if (-not ($allowedExt -contains $ext)) {
      $violations += "Non-pure extension in active path: $rel"
      continue
    }

    $pureCount += 1
  }
}

if ($trackedCodeCount -gt 0) {
  $pct = [math]::Round(($pureCount / [double]$trackedCodeCount) * 100, 2)
  Write-Host "Tracked active code files: $trackedCodeCount"
  Write-Host "Pure files (.herb/.asm/.inc/.ld): $pureCount"
  Write-Host "Purity percentage: $pct%"
}

if ($violations.Count -gt 0) {
  Write-Host "HERB Purity Global enforcement failed."
  $violations | ForEach-Object { Write-Host " - $_" }
  exit 1
}

Write-Host "HERB Purity Global enforcement passed."
exit 0

