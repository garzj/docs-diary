---
sidebar_position: 40
---

# Gateways and routing

Configuring gateways, static and dynamic routing and OSPF areas on a Cisco device.

## Default gateway

```cisco-ios
ip default-gateway 192.168.0.254 255.255.255.0
ipv6 todo
```

Default gateways don't work on routers when IP routing is active. One would have to use a [wildcard route](#wildcard-routes) instead.

## Static Routing

### Enable routing

```cisco-ios
ip routing
ipv6 unicast-routing
```

### Wildcard routes

```cisco-ios
ip route 0.0.0.0 0.0.0.0 192.168.0.254
ipv6 route ::/64 fe80::1

! Specify outgoing interface
ip route 0.0.0.0 0.0.0.0 gi0/0/0
```

## Dynamic routing

### OSPF

todo
