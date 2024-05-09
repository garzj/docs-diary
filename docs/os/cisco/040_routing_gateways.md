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
! By default, a router would only forward packets that are directly targeted at one of its interfaces
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

### Terminology

- **OSPF area**: a routing domain under which routes are propagated
- **SPF algorithm**: shortest path first algorithm (using Dijkstra's)
- **adjacency database**: list of neighbor routers
- **link-state database (LSDB)**: database describing the whole topology (the same for routers in the same area)
- **forwarding database (aka routing table)**: generated list of next-hop routes (from the link-state db with the SPF algorithm)
- **loopback interfaces**: can be configured with an IP address for higher availability, explained in the [administration chapter](./administration#loopback-interfaces)
- **router id**: id for picking DR and BDR, can be the following (ordered by priority)
  - configured router id (highest priority)
  - loopback ip address
  - highest ip address of all interfaces
- **DR**: designated router, elected for each segment (Layer 2 broadcast domain) to reduce OSPF packets
- **BDR**: backup designated router
- **cost**: the cost on an interface is used by the SPF algorithm to pick the best path
- **reference-bandwidth**: default cost = interface-bandwidth / reference-bandwidth (rounded up to an integer)

#### Packet types

- **hello**: to create the adjacency db
- **database desc (DBD)**: describes a link-state db, so other routers know what they are missing
- **link state**
  - **request (LSR)**: request a specific missing link state advertisement (LSA)
  - **update (LSU)**: contains the LSAs with data
  - **ack (LSAck)**: acknowledge the receipt

#### Configuration

```cisco-ios
interface loopback 0
  ip address 2.2.2.2 255.255.255.255
  no shutdown

! In OSPF, the process-id is local to the device for identification
! router ospf <process-id>
router ospf 10
  router-id 1.1.1.1

  ! Disable OSPF packet propagation on an interface (i.e. on loopbacks)
  passive-interface lo0

  ! If configured, should be on all devices in the network
  auto-cost reference-bandwidth 1000

  ! Propagates default static routes to OSPF
  default-information originate

  ! * Either add a network to OSPF here
  network 192.168.42.0 0.0.0.255 area 0

interface gi0/0/0
  ! * Or add the network from the interface directly
  ip ospf 10 area 0

  ! Optional settings
  ip ospf cost 10
  ip ospf hello-interval 5
  ip ospf dead-interval 20

  no shutdown
  ip address 192.168.42.254 255.255.255.0
```

### EIGRP

#### Terminology

- **Autonomous system (AS)**: a routing domain under which routes are propagated (like the OSPF area)
- **metric weights**: numbers that change how the shortest route is calculated
- **router id**: the router id is picked the same way as in OSPF

#### Configuration

```cisco-ios
interface loopback 0
  ip address 2.2.2.2 255.255.255.255
  no shutdown

! Whe autonomous-system-no identifies the AS domain
! router eigrp <autonomous-system-no>
router eigrp 100
  eigrp router-id 1.1.1.1

  ! Disable OSPF packet propagation on an interface (i.e. to an ISP)
  passive-interface gi1/0/1

  ! Weights have to be the same on all devices in the AS domain
  ! metric weights <type> <bandwidth> <load> <delay> <reliability> <MTU>
  metric weights 0 2 0 1 0 0

  network 192.168.42.0 0.0.0.255

interface gi0/0/0
  no shutdown
  ip address 192.168.42.254 255.255.255.0
```

## Redistributing routes

The redistribute command is useful to share routes from one routing protocol to another.

### Example: bridging OSPF and EIGRP

```cisco-ios
router eigrp 100
  redistribute ospf 1

router ospf 1
  redistribute eigrp 100 subnets
```

## Evaluation

```cisco-ios title="#"
! Viewing routing tables
show ip route
show ip route static
show ipv6 route
show ipv6 route static

! Tracing the route to a device
traceroute 192.168.5.3

! OSPF
show ip protocols | include Router ID
show ip ospf neighbor
show ip ospf database
show ip ospf interface gi0/0/0
```
