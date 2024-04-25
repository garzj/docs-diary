# Redundancy

Configuring Etherchannels, HSRP and VRRP on a Cisco device.

## Etherchannel

### Channel group modes

- **on**: activate Etherchannel if other is on (without protocol)

#### PAgP

- **desirable**: activate Etherchannel if other is desirable/auto
- **auto**: activate Etherchannel if other is desirable

#### LACP

- **active**: activate Etherchannel if other is active/passive
- **passive**: activate Etherchannel if other is active

### Configuration

```cisco-ios
interface range fa0/1 - 2
  channel-group 1 mode active
  no shutdown

interface port-channel 1
  no shutdown
  switchport mode trunk

  ! may not work on Cisco Packet Tracer together with port-channel
  switchport trunk allowed vlan 10,20
```

### Evaluation

```cisco-ios title="#"
show interfaces port-channel 1
show interfaces f0/1 etherchannel
show etherchannel summary
show etherchannel port-channel
```

## HSRP

```cisco-ios title="sw-1-conf#"
int vlan1
  ip address 10.0.0.2 255.255.0.0
  standby 1 preempt
  standby 1 priority 105
  standby 1 ip 10.0.0.1
  ! lowers the priority by 10, so 95 (default is 100) if gi1/1/1 goes down
  standby 1 track gi1/1/1
```

```cisco-ios title="sw-2-conf#"
int vlan1
  ip address 10.0.0.3 255.255.0.0
  standby 1 preempt
  standby 1 ip 10.0.0.1
```
