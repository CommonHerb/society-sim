param(
  [Parameter(Mandatory = $false)]
  [string]$Root = "C:\Users\Ben\Desktop\society-sim"
)

$ErrorActionPreference = "Stop"

$paths = @(
  (Join-Path $Root "HERB\src\society"),
  (Join-Path $Root "HERB\boot\society"),
  (Join-Path $Root "HERB\programs\society")
)

$allowedExt = @(".herb", ".asm", ".inc", ".ld")
$allowedNames = @(".gitkeep", "README.md")
$forbiddenCodeExt = @(
  ".py", ".pyi", ".c", ".h", ".cpp", ".hpp", ".cc", ".cxx",
  ".rs", ".go", ".js", ".mjs", ".cjs", ".ts", ".tsx", ".java",
  ".cs", ".swift", ".kt", ".kts", ".rb", ".php", ".lua", ".sh",
  ".ps1", ".bat", ".cmd"
)

$violations = @()

foreach ($p in $paths) {
  if (-not (Test-Path $p)) {
    continue
  }

  $files = Get-ChildItem -Path $p -Recurse -File
  foreach ($f in $files) {
    $name = $f.Name
    $ext = $f.Extension.ToLowerInvariant()

    if ($allowedNames -contains $name) {
      continue
    }

    if ($forbiddenCodeExt -contains $ext) {
      $violations += "Forbidden runtime code file: $($f.FullName)"
      continue
    }

    if (-not ($allowedExt -contains $ext)) {
      $violations += "Non-allowed file type in HERB-only namespace: $($f.FullName)"
    }
  }
}

if ($violations.Count -gt 0) {
  Write-Host "HERB-only enforcement failed:"
  $violations | ForEach-Object { Write-Host " - $_" }
  exit 1
}

Write-Host "HERB-only enforcement passed."
exit 0

