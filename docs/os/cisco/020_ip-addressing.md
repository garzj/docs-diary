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

## Switches

```cisco-ios
interface vlan 1
  ip address 192.168.0.253 255.255.255.0
  ipv6 address 2001:db8:1234:aabb::2/64
  ipv6 link-local todo
  no shutdown
```

## Routers

```cisco-ios
interface gi0/0/0
  ip address 192.168.0.254 255.255.255.0
  ipv6 address 2001:db8:1234:aabb::1/64
  ipv6 link-local todo
  no shutdown

! Using a range
interface range gi0/0/0 - 1 , gi0/1/0
  ...
```
