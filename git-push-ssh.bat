@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

set "REPO_URL=git@gitlab.com:oguzdurak16/odyomuh.git"
set "BRANCH=main"
set "GIT=git"

echo.
echo ODYOMUH Vercel projesi GitLab'a SSH ile gonderiliyor...
echo.

rem Git'i PATH, PortableGit veya standart kurulum yollarinda ara.
"%GIT%" --version >nul 2>&1
if errorlevel 1 (
  if exist "%~dp0PortableGit\bin\git.exe" set "GIT=%~dp0PortableGit\bin\git.exe"
)
"%GIT%" --version >nul 2>&1
if errorlevel 1 (
  if exist "C:\PortableGit\bin\git.exe" set "GIT=C:\PortableGit\bin\git.exe"
)
"%GIT%" --version >nul 2>&1
if errorlevel 1 (
  if exist "C:\Program Files\Git\cmd\git.exe" set "GIT=C:\Program Files\Git\cmd\git.exe"
)
"%GIT%" --version >nul 2>&1
if errorlevel 1 (
  echo HATA: Git bulunamadi.
  echo PortableGit klasorunu proje klasorune koyabilir veya C:\PortableGit konumuna cikartabilirsin.
  pause
  exit /b 1
)

if not exist ".git" (
  "%GIT%" init
  if errorlevel 1 goto :error
)

"%GIT%" branch -M %BRANCH%
"%GIT%" config user.name "Oguzhan Ahmet Durak"
"%GIT%" config user.email "ottomantv16@gmail.com"

"%GIT%" remote get-url origin >nul 2>&1
if errorlevel 1 (
  "%GIT%" remote add origin "%REPO_URL%"
) else (
  "%GIT%" remote set-url origin "%REPO_URL%"
)
if errorlevel 1 goto :error

"%GIT%" add .
if errorlevel 1 goto :error

"%GIT%" diff --cached --quiet
if errorlevel 1 (
  "%GIT%" commit -m "Deploy ODYOMUH Vercel site"
  if errorlevel 1 goto :error
) else (
  echo Yeni dosya degisikligi yok; mevcut commit kullaniliyor.
)

rem GitLab reposunda daha once olusturulmus README/commit varsa gecmisini
rem force push kullanmadan yerel projeye bagla. Yerel proje dosyalari korunur.
"%GIT%" ls-remote --exit-code --heads origin %BRANCH% >nul 2>&1
if not errorlevel 1 (
  echo GitLab'daki mevcut main gecmisi aliniyor...
  "%GIT%" fetch origin %BRANCH%
  if errorlevel 1 goto :error

  "%GIT%" merge-base HEAD origin/%BRANCH% >nul 2>&1
  if errorlevel 1 (
    echo Ilgisiz Git gecmisleri force kullanmadan birlestiriliyor...
    "%GIT%" merge --allow-unrelated-histories -s ours origin/%BRANCH% -m "GitLab gecmisini ODYOMUH projesiyle birlestir"
    if errorlevel 1 goto :error
  ) else (
    "%GIT%" merge -s ours origin/%BRANCH% -m "GitLab main gecmisini birlestir"
    if errorlevel 1 goto :error
  )
)

echo.
echo Dosyalar GitLab'a SSH ile gonderiliyor...
"%GIT%" push -u origin %BRANCH%
if errorlevel 1 goto :error

echo.
echo BASARILI: Proje GitLab'a gonderildi.
echo Repo: %REPO_URL%
pause
exit /b 0

:error
echo.
echo HATA: Islem tamamlanamadi. Yukaridaki son hata satirini kontrol et.
pause
exit /b 1
