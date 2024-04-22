# Spanning tree

Configuring the spanning tree protocol (STP) on Cisco devices.

## Config options

```cisco-ios
! Set spanning tree mode
spanning-tree mode pvst ! (default)

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

## Routebridge, etc.

TODO
