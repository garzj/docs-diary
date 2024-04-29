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

### SSH

```cisco-ios
! Required
hostname nice-device
ip domain-name example.com
ip ssh version 2
crypto key generate rsa general-keys modulus 2048

username admin password cisco

! Optional settings
ip ssh time-out 60
ip ssh authentication-retries 2

! or line vty 0 15
line vty 0 4
  ! exec-timeout <minutes> <seconds>
  exec-timeout 15 0

  ! uses the globally defined username/password
  login local

  transport input ssh
```

The vty lines should probably be secured with an access list too that permits only administrator networks as explained in [the ACL chapter](./acls).

### find neighbors with CDP, etc.

todo

## Logging and monitoring

### SYSLOG

todo

### SNMP

todo
