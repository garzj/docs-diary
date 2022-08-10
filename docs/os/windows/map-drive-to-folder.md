# Map drive letter to folder

This registry script will map the drive letter `D:` to the folder `C:\Users\test\home`.

Make sure to generate a random GUID with `guidgen.exe` and replace `{41910949-8703-4264-915E-DF750B39C33C}`

```reg title='map-drive-to-folder.reg'
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\DOS Devices]
"D:"="\\??\\C:\\Users\\test\\home"

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\FolderDescriptions\{41910949-8703-4264-915E-DF750B39C33C}]
"RelativePath"="D:\\"
"Category"=dword:00000004
"Name"="Home"

[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\BitBucket\KnownFolder\{41910949-8703-4264-915E-DF750B39C33C}]
"MaxCapacity"=dword:0000c7eb
"NukeOnDelete"=dword:00000000
```

You'll have to restart your computer to apply these changes.
