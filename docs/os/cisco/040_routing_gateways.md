# Gateways and routing

Configuring gateways, static and dynamic routing and OSPF areas on a Cisco device.

A route of a packet is normally chosen depending on the [default distance value table](https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/15986-admin-distance.html#toc-hId-805485471).

## Default gateway

```cisco-ios
ip default-gateway 192.168.0.254
ipv6 default-gateway fe80::1
```

Default gateways don't work on routers when IP routing is active. One would have to use a [wildcard route](#wildcard-routes) instead.

## Static Routing

```cisco-ios
! Enable routing
ip routing
ipv6 unicast-routing

! Example routes
ip route 192.168.5.0 255.255.255.0 192.168.0.1
ipv6 route 2001:db8:acad:5::/64 fe80::7
```

### Wildcard routes

```cisco-ios
ip route 0.0.0.0 0.0.0.0 192.168.0.254
ipv6 route ::/64 fe80::1

! Specify outgoing interface
ip route 0.0.0.0 0.0.0.0 gi0/0/0

! Floating static route (higher administrative distance of 5)
ip route 0.0.0.0 0.0.0.0 gi0/0/1 5
```

## Dynamic routing

### OSPF

TODO

### EIGRP

TODO

## Evaluation

```cisco-ios title="#"
! Viewing routing tables
show ip route
show ip route static
show ipv6 route
show ipv6 route static

! Tracing the route to a device
traceroute 192.168.5.3
```
