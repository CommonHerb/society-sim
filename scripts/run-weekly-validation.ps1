param(
  [Parameter(Mandatory = $false)]
  [string]$Root = ""
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($Root)) {
  $Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
}

$herbSrc = Join-Path $Root "HERB\src"
if (-not (Test-Path $herbSrc)) {
  throw "HERB source path not found: $herbSrc"
}

function Resolve-PythonExe {
  if ($env:PYTHON_EXE -and (Test-Path $env:PYTHON_EXE)) {
    return $env:PYTHON_EXE
  }

  $local = "C:\Users\Ben\AppData\Local\Python\bin\python.exe"
  if (Test-Path $local) {
    return $local
  }

  $cmd = Get-Command python -ErrorAction SilentlyContinue
  if ($cmd) {
    return $cmd.Source
  }

  throw "No usable Python interpreter found. Set PYTHON_EXE or install python."
}

Push-Location $herbSrc
try {
  Write-Host "Running weekly validation battery..."
  $pythonExe = Resolve-PythonExe

  # A) Determinism
  & $pythonExe -m pytest -q test_society_determinism.py
  if ($LASTEXITCODE -ne 0) { throw "Determinism battery failed." }

  # B) Stability/semantics baseline (existing HERB suite subset)
  & $pythonExe -m pytest -q test_tensions.py test_goal_pursuit.py
  if ($LASTEXITCODE -ne 0) { throw "Stability battery failed." }

  # C) Information semantics baseline
  & $pythonExe -m pytest -q test_negation.py test_aggregation.py
  if ($LASTEXITCODE -ne 0) { throw "Information/aggregation battery failed." }

  Write-Host "Weekly validation battery passed."
}
finally {
  Pop-Location
}
