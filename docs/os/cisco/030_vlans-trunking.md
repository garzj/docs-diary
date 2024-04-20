# VLANs and trunking

Configuring VLANs and trunking on a Cisco device.

todo: complete

## Terminology

- **Native VLAN**: It's the default VLAN with an id of 1. (for untagged packets)
- **Tagged / Untagged**: VLAN tags specify which VLAN a packet belongs to.
- **Access ports**: Ports tagging incoming packets to belong to a VLAN. (allow a single VLAN)
- **Trunking ports**: Ports that receive tagged packets. (allow multiple VLANs)

## Configuration

### Switches

#### VLAN interfaces

```cisco-ios
interface vlan 42
  ! ... ip config
```

#### Access ports

```cisco-ios
interface fa0/1
  switchport mode access
  switchmod access vlan 42
```

#### Trunking ports

```cisco-ios
interface fa0/1
  switchport mode trunk
  todo
```

### Routers

#### No trunking

```cisco-ios
interface gi0/0/0.10
  encapsulation dot1Q todo
  ...todo
```

#### Trunking

todo

## Voice VLANs

todo
