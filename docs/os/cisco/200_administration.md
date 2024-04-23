# Remote administration

Administrating Cisco devices remotely using SSH, telnet and CDP and monitoring them using SYSLOG or SNMP.

## Remote administration

### loopback interfaces

todo

### Telnet
todo 
### SSH
```
ip domain-name rtp.cisco.com ! a domain is required for keygen
!--- Generate an SSH key to be used with SSH.

crypto key generate rsa ! A prompt will show up. if copy pasted, this command needs to copy pasted seperately 
ip ssh time-out 60
ip ssh authentication-retries 2

line vty 0 4 ! or 15
  exec-timeout 15 0
  login local           ! using globally defined username/password
  transport input ssh
```

### find neighbors with CDP, etc.

todo

## Logging and monitoring

### SYSLOG

todo

### SNMP

todo
