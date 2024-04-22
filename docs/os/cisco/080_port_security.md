# Port & Network security

Securing switchports and avoiding spoofing attacks (ARP / DHCP) on a Cisco device.

## Port security

### Restricting VLAN access

Restricting access to VLANs is covered in the [VLANs and trunking chapter](./vlans-trunking).

### Restrict MACs

```cisco-ios title="config-if#"
! Enable port-security
switchport port-security

! Maximum MAC addresses
switchport port-security maximum 5

! Manual MAC address config
switchport port-security mac-address 0123.4567.89ab

! Dynamically learn new addresses until max
switchport port-security mac-address sticky

! Delete inactive addresses
switchport port-security aging time 10
switchport port-security aging type inactivity ! or absolute
```

### Security violations

```cisco-ios title="config-if#"
switchport port-security violation shutdown
```

### Evaluation

```cisco-ios title="#"
show port-security
show port-security address
show port-security interface fa0/1
```

## DHCP snooping

Stops bad actors from running their own DHCP server in a network.

```cisco-ios
ip dhcp snooping

! On all interfaces valid DHCP packets may be received from
interface gi0/1
  ip dhcp snooping trust

! Limits DHCPDISCOVER packets on an interface
interface fa0/1
  dhcp snooping limit rate 5 ! per second

! Limit to vlans
dhcp snooping vlan 5,10,40-42
```

## ARP inspection

Requires dhcp snooping to be active!

```cisco-ios
! On all interfaces ARP packets can be trusted from
interface gi0/1
  ip arp inspection trust

! Limit to vlans
ip arp inspection vlan 5,10,40-42
```

## BPDU Guard (STP)

```cisco-ios
spanning-tree bpduguard enable

! On all interfaces attached to end devices
interface fa0/1
  spanning-tree portfast bpduguard enable

! Enable on all portfast ports by default
spanning-tree portfast bpduguard default
```
