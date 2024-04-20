---
sidebar_position: 30
---

# VLANs and trunking

Configuring VLANs and trunking on a Cisco device.

todo: complete

## Terminology

- **Native VLAN**: It's the default VLAN with an id of 1. (for untagged packets)
- **Tagged / Untagged**: VLAN tags specify which VLAN a packet belongs to.
- **Access ports**: Ports tagging incoming packets to belong to a VLAN. (allow a single VLAN)
- **Trunking ports**: Ports that receive tagged packets. (allow multiple VLANs)

## Switch

```cisco-ios
interface vlan 10
  ...your interface config
```

### Trunking

todo

```cisco-ios title="config-if#"
switchport mode access
switchmod access vlan 50
```

## Router (or multilayer switch)

```cisco-ios
interface gi0/0/0.10
  encapsulation dot1Q todo
  ...todo
```

## Voice VLANs

todo
