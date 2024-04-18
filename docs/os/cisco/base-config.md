---
sidebar_position: 100
---

# Base configuration

A base configuration setting up a Cisco device with some standard security practices.

:::warning
Make sure to change all specified passwords.
:::

```cisco-ios
enable
conf t

! Typos
no ip domain-lookup

! Authorization
service password-encryption
enable secret class
banner motd "Authorized access only!"

! Get amount of vty lines (usually 5 on switches, 16 on routers)
line vty 0 4 ! or 15
  ! todo
  exec-timeout 15 0
  password cisco
  login
  transport input telnet

line console 0
  exec-timeout 15 0
  password cisco
  login

line aux 0
  exec-timeout 15 0
  password cisco
  login

! Hostname
hostname Device1
```
