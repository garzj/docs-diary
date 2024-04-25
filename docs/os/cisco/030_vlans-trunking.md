# VLANs and trunking

Configuring VLANs and trunking on a Cisco device.

## Terminology

- **Standard VLAN**: The default VLAN with an id of 1
- **Native VLAN**: The VLAN used for untagged traffic (default is standard)
- **Data VLAN**: Seperated VLAN to ensure secure data transfer
- **Management VLAN**: A VLAN exclusively for network administration (SSH, telnet, SNMP)
- **Voice VLAN**: A seperate VLAN for voice traffic
- **Tagged / Untagged**: VLAN tags specify which VLAN a packet belongs to
- **Access ports**: Ports tagging incoming packets to belong to a VLAN (allow a single VLAN)
- **Trunking ports**: Ports that receive tagged packets (allow multiple VLANs)

## Configuration

```cisco-ios
! Create a vlan (can also be implicitly created on usage)
vlan 42
  name Production
```

### Switches

#### VLAN interface config

```cisco-ios
interface vlan 42
  ip address 192.168.0.254 255.255.255.0
  no shutdown
```

#### Access ports

```cisco-ios
interface fa0/1
  switchport mode access
  switchport access vlan 42
```

#### Trunking ports

```cisco-ios
interface fa0/1
  switchport mode trunk
  switchport trunk native vlan 99
  switchport trunk allowed vlan 10,20,30
```

### Other switchport modes

```cisco-ios title="config-if#"
! Enable dynamic trunking
switchport mode dynamic auto

! Desire turning into a trunk
switchport mode dynamic desirable

! Disable dynamic trunking (no DTP frames)
switchport nonegotiate
```

### Routers

On a router trunking is done via subinterfaces.

```cisco-ios
! The base interface has to be enabled
interface gi0/0/0
  no shutdown

interface gi0/0/0.42
  description The subinterface for VLAN 42
  encapsulation dot1Q 42
  no shutdown
```

Typically one would only configure these on interfaces connected to a switch. Preserving VLAN tags between routers is unnecessary in most cases.

## Voice VLANs

```cisco-ios
vlan 10
  name Financing

vlan 100
  name Voice

interface fa0/18
  switchport mode access
  switchport access vlan 10

  ! Enables qos classification for IP phones
  mls qos trust cos
  switchport voice vlan 100
```

## Evaluation

```cisco-ios title="#"
show vlan brief

show vlan summary
```
