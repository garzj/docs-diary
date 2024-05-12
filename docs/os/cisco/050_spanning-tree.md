# Spanning tree

Configuring the spanning tree protocol (STP) on Cisco devices.

## Config options

```cisco-ios
! Set spanning tree mode
spanning-tree mode pvst

! Use portfast on an interface
interface fa0/0
  spanning-tree portfast

! Use portfast by default
spanning-tree portfast default
```

### Evaluation

```cisco-ios title="#"
show spanning-tree summary
```

### Security

Instructions on how to make STP more secure using BPDU Guard is covered in the [port security chapter](./port_security#bpdu-guard-stp).

## Routebridge

Every layer 2 broadcast domain needs at least one root bridge calculating the path with the lowest cost.

A lower configured priority means a greater chance of becoming the root bridge.

```cisco-ios
! Change root bridge priority
spanning-tree vlan 10,20,30,40,50,99 priority 4096

! Use multiples of 4096 on other switches
! spanning-tree vlan 10,20,30,40,50,99 priority 8192
```
