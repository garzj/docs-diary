# Gateways and routing

Configuring gateways, basic routing and OSPF on a Cisco device.

## Default gateway and DNS

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

### OSPF

todo
