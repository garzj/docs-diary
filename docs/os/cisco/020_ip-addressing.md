# IP addressing

Configuring basic IP addressing on a Cisco device.

todo: complete

## Switches

```cisco-ios
interface vlan 1
  description I'm a happy interface
  ip address 192.168.0.253 255.255.255.0
  ipv6 address 2001:db8:1234:aabb::2/64
  ipv6 address fe80::1 link-local
  no shutdown
```

## Routers

```cisco-ios
interface gi0/0/0
  description No description here
  ip address 192.168.0.254 255.255.255.0
  ipv6 address 2001:db8:1234:aabb::1/64
  ipv6 address fe80::1 link-local
  no shutdown

! Using a range
interface range gi0/0/0 - 1 , gi0/1/0
  ! ...
```

## Evaluation

```cisco-ios title="#"
! Finding ips of all GigabitEthernet interfaces
show ip interface brief | include Gig

! Details on all Gig interfaces
show run | section interface Gig

! Or details on a single one
show ip inteface gi0/0/0

! View inteface state for ipv6
show ipv6 inteface brief
```

```cisco-ios title=">"
! Doing a ping check
ping 192.168.0.1
```

## Dynamic addressing

Instructions for dynamic addressing with DHCP and SLAAC are covered in the [dynamic configuration chapter](./dynamic-config).
