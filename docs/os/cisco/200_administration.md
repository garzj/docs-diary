# Remote administration

Administrating Cisco devices remotely using SSH, telnet and CDP and monitoring them using SYSLOG or SNMP.

## Remote administration

### Loopback interfaces

Using a loopback interface to reach a router is mainly useful for redundancy.

If a physical link goes down, a normal interface dies along with it. The loopback will never go down until administratively or the device is turned off, so it's available as long as there's a route to it.

```cisco-ios
interface loopback 0
  ip address 2.2.2.2 255.255.255.255
  no shutdown
```

### Telnet

### SSH

```
! Required
hostname nice-device
ip domain-name example.com
ip ssh version 2
crypto key generate rsa general-keys modulus 2048

username admin password cisco

! Optional settings
ip ssh time-out 60
ip ssh authentication-retries 2

line vty 0 4 ! or 15
  exec-timeout 15 0 ! mins, secs
  login local ! use the globally defined username/password
  transport input ssh
```

### find neighbors with CDP, etc.

todo

## Logging and monitoring

### SYSLOG

todo

### SNMP

todo
