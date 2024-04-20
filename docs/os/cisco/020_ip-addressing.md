---
sidebar_position: 020
---

# IP addressing and VLAN config

Configuring IP addressing, VLANs and basic trunking on a Cisco device.

## Enabling IPv6

```cisco-ios
ipv6 enable
```

## Router (or multilayer switch)

```cisco-ios
interface gi0/0/0
  ip address 192.168.0.254 255.255.255.0
  ipv6 address 2001:db8:1234:aabb::1/64
  no shutdown

! Using a range
interface range gi0/0/0 - 1 , gi0/1/0
  ...

! Custom VLAN
interface gi0/0/0.10
  encapsulation dot1Q todo
  ...
```

## Switch

```cisco-ios
interface vlan 1
  ip address 192.168.0.253 255.255.255.0
  ipv6 address 2001:db8:1234:aabb::2/64
  no shutdown

! Custom VLAN
interface vlan 10
  ...
```

## Trunking

todo
