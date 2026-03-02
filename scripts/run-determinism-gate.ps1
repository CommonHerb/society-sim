param(
  [Parameter(Mandatory = $false)]
  [string]$Root = "C:\Users\Ben\Desktop\society-sim"
)

$ErrorActionPreference = "Stop"

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
  Write-Host "Running HERB determinism gate tests..."
  $pythonExe = Resolve-PythonExe
  & $pythonExe -m pytest -q test_society_determinism.py
  if ($LASTEXITCODE -ne 0) {
    throw "Determinism gate failed."
  }
  Write-Host "Determinism gate passed."
}
finally {
  Pop-Location
}
