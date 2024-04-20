---
sidebar_position: 10
---

# Base configuration

A base configuration setting up a Cisco device with some standard security practices.

## Global config mode

:::note
In this documentation all config without a title will assume global configuration mode.
:::

```cisco-ios title="unprivileged exec>"
enable
configure terminal
```

## Base config

:::warning
Make sure to change all specified passwords.
:::

todo: complete (descriptions?)

```cisco-ios
! Typos
no ip domain-lookup

! Authorization
service password-encryption
enable secret class
banner motd "Authorized access only!"

! Get amount of vty lines (usually 5 on switches, 16 on routers)
line vty 0 4 ! or 15
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
