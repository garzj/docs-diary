# Dynamic host configuration

Configuring dynamic host configuration (DHCP and SLAAC) on a Cisco device.

## DHCP

DHCP stands for Dynamic Host Configuration Protocol.

### DHCP messages

- **DHCPDISCOVER**: trigger available servers to send an offer (broadcast)
- **DHCPOFFER**: respond with an offer holding the config (uni-/broadcast)
- **DHCPREQUEST**: request to use the offer / renew the lease / inform other servers (broadcast)
- **DHCPACK**: acknowledge the lease (uni-/broadcast)

### Configuration

```cisco-ios
! Exclude ranges from all pools (low- and high address)
ip dhcp excluded-address 192.168.0.1
ip dhcp excluded-address 192.168.0.200 192.168.0.255

! Create a pool
ip dhcp pool PRODUCTION
  network 192.168.0.0 255.255.255.0
  default-router 192.168.0.1
  dns-server 192.168.11.5
  domain-name example.com
  lease 7 ! days
```

### Evaluation

```cisco-ios title="#"
show running-config | section dhcp
show ip dhcp binding
show ip dhcp server statistics
```

## ICMPv6 (SLAAC / DHCPv6)

SLAAC stands for StateLess Address Auto Configuration.

It can optionally work together with a DHCPv6 server.

If both SLAAC and DHCPv6 address config are enabled, **a host can have multiple IPv6 addresses**.

### Terminology

- **link-local address**: an IPv6 address used for local communication
- **network prefix**: usually the first 64 bits of a 128 bit IPv6 address
- **GUA**: a globally unique address
- **DAD**: duplicate address detection (is performed after GUA configuration)

### Common ICMPv6 messages

ICMPv6 stands for Internet Control Message Protocol and is also used for IPv6 address configuration.

- **Router Solicitation (RS)**: ask routers to send RA (multicast to all routers using `ff02::2`)
- **Router Advertisement (RA)**: carries the following data (multicast to all nodes using `ff02::1`)
  - router's link local
  - network prefix information
  - config flags
    - **A (autonomous)**: hosts should use the network prefix to create their own GUA (stateless)
    - **O (other)**: hosts should use DHCPv6 for non-address configuration (DNS, NTP, etc.)
    - **M (managed)**: hosts should use DHCPv6 for address configuration (stateful) AND config from the O flag
- **Neighbor Solicitation (NS)**: find MAC addresses of other hosts (like ARP)
- **Neighbor Solicitation (NA)**: respond to NS messages or notify about address changes

### DHCPv6 messages

- **SOLICIT**: trigger DHCPv6 servers to send an advertisement (multicast to all routers)
- **ADVERTISE**: inform the host about the server
- **REQUEST**: request a lease from the server (**INFORMATION-REQUEST** when stateless)
- **REPLY**: server replying with the data

### Configuration

#### Minimal router config

```cisco-ios
! Make sure routing is enabled to emit RA messages
ipv6 unicast-routing

interface gi0/0
  no shutdown
  ipv6 address 2001:db8:acad:1::1/64 ! enables SLAAC by default

  ! this should work too to enable SLAAC, but sometimes just doesn't on Cisco Packet Tracer
  ipv6 address autoconfig

  ! Typically not needed on newer devices
  ipv6 enable
```

#### More router config

```cisco-ios
! Create a DHCPv6 pool
ip dhcp pool LA_PISCINA
  ! O and M flags
  dns-server 2001:db8:acad:ffff::254
  domain-name example.com

  ! only M flag
  address prefix 2001:db8:acad:2::/64

interface gi0/0
  ! change the link-local address
  ipv6 fe80::1 link-local

  ! Configure dhcp pool to retrieve the info specified by flags
  ipv6 dhcp server LA_PISCINA

  ipv6 nd other-config-flag ! set the O flag (stateless)
  ipv6 nd managed-config-flag ! set the M flag (stateful)
```

#### Host configuration

```cisco-ios
interface gi0/0
  description LAN interface
  no shutdown

  ! Stateless
  ipv6 address autoconfig

  ! Stateful
  ipv6 address dhcp
  ipv6 nd prefix default no-autoconfig ! Disable SLAAC or both are used
```

### Evaluation

```cisco-ios title="#"
show ipv6 interface brief
show ipv6 neighbors

! DHCPv6
show ipv6 dhcp pool
show ipv6 dhcp binding
```

### DHCPv6 relay agents

```cisco-ios title="config-if#"
! Relays DHCPv6 traffic for this server to another
! Does not work in Cisco Packet Tracer yet
ipv6 dhcp relay destination 2001:db8:acad:adb::1
```
