# Cisco IOS

Cheat sheets and standard configuration for Cisco IOS devices.

:::warning
Make sure to change all specified passwords.
:::

## Initial configuration

This will setup a Cisco device with some standard security settings.

```cisco-ios
enable
conf t

! Typos
no ip domain-lookup

! Authorization
service password-encryption
enable secret class
banner motd "Authorized access only!"
line vty 0 15
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

## IP configuration

### Switch

```cisco-ios
interface vlan 1
  ip address 192.168.0.253 255.255.255.0
  ipv6 address 2001:db8:1234:aabb::2/64
  no shutdown

! Custom VLAN
interface vlan 10
  ...
```

### Router

```cisco-ios
interface gi0/0/0
  ip address 192.168.0.254 255.255.255.0
  ipv6 address 2001:db8:1234:aabb::1/64
  no shutdown

! With range
interface range gi0/0/0 - 1 , gi0/1/0
  ...

! Custom VLAN
interface gi0/0/0.10
  ...
```

### Default gateway and DNS

```cisco-ios
ip default-gateway 192.168.0.254 255.255.255.0
ip name-server 1.1.1.1
```

## Routing

### Enable routing

```cisco-ios
ip routing
ipv6 unicast-routing
```

The `ip default-gateway` config will no longer work a default route is used instead.

### Use a wildcard route as gateway

```cisco-ios
ip route 0.0.0.0 0.0.0.0 192.168.0.254
ipv6 route ::/64 fe80::1

! Specify outgoing interface
ip route 0.0.0.0 0.0.0.0 gi0/0/0
```

## Spanning tree

```cisco-ios
! Set spanning tree mode
spanning-tree mode pvst

! Use portfast on an interface
interface fa0/0
  spanning-tree portfast
```
