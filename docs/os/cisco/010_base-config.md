# Basic configuration

How setting up a Cisco device with some standard security practices may look like.

## Editing config

### Global config mode

:::note
In this documentation all config without a title will assume global configuration mode. Other options are:

- `>`: unprivileged exec mode
- `#`: privileged exec mode (enable)
  :::

```cisco-ios title=">"
enable
configure terminal

! List configuration options
?

! List subcommands of an option
interface ?
```

### Base/standard config

:::warning
Make sure to change all specified passwords.
:::

todo: complete (descriptions?)

This is how a standard base configuration for a Cisco device can look like:

```cisco-ios
! Typos
no ip domain-lookup

! Authorization
service password-encryption
enable secret class
username admin password cisco
banner motd "Authorized access only!"

! Hostname
hostname Device1

! SSH key generation
ip domain name exmaple.com
crypto key generate rsa general-keys modulus 2048

! Block login 120s when 3 attempts fail in 60s
login block-for 120 attempts 3 within 60

! Get amount of vty lines (usually 5 on switches, 16 on routers)
line vty 0 4 ! or 15
  exec-timeout 15 0
  login local
  transport input ssh ! or telnet

line console 0
  exec-timeout 15 0
  password cisco
  login local

line aux 0
  exec-timeout 15 0
  password cisco
  login local
```

## Viewing config

```cisco-ios title="#"
! Complete config
show running-config

! List options
show ?

! Filtering using begin / include / exclude / section
show ... | include regular-expression
```

## Saving config

```cisco-ios title="#"
! Different commands saving the config to disk
copy running-config startup-config
write memory
write

! Backup the config onto a tftp server
copy running-config tftp
```
