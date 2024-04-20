---
sidebar_position: 020
---

# IP addressing

Configuring IP addressing on a Cisco device.

todo: complete

## Enabling IPv6

```cisco-ios
ipv6 enable
```

## Router config (or multilayer switch)

```cisco-ios
interface gi0/0/0
  ip address 192.168.0.254 255.255.255.0
  ipv6 address 2001:db8:1234:aabb::1/64
  no shutdown

! Using a range
interface range gi0/0/0 - 1 , gi0/1/0
  ...
```

## Switch config

```cisco-ios
interface vlan 1
  ip address 192.168.0.253 255.255.255.0
  ipv6 address 2001:db8:1234:aabb::2/64
  no shutdown
```