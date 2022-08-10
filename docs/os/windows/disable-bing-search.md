# Disable bing search

These registry values can disable the annoying "Search with bing" "feature":

```reg title='disable-bing-search.reg'
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Search]
"BingSearchEnabled"=dword:00000000
"CortanaConsent"=dword:00000000
```
