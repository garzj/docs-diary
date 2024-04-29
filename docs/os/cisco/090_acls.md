import NetworkImage from './img/network-r1-r2-r3-nobg.png';

# Access lists

Configuring normal, numbered and extended access lists on a Cisco device.

## ACL types

### Standard and extended

- **standard**: filter based on source IP
- **extended**: filter based on source IP, destination IP, protocol, ports, etc.

### Numbered and named

- **numbered**: ACLs identified by number (different type depending on number, `access-list ?` to find out)
- **named**: ACLs identified by name

## Creation

Note, that rules entered first take presedence over others.

```cisco-ios
! numbered acl (always matches source IPs)
access-list 10 permit 192.168.10.0 0.0.0.255
access-list 10 permit 192.168.20.0 0.0.0.255
! (deny any is always implied at the end)
access-list 10 deny any

! delete whole acl
no access-list 10

! named standard acl
ip access-list standard SOME_NAME
  ! ...

! named extended acl (matches <soure> <destination> <protocol>)
ip access-list extended MY_ACCESS_LIST
  permit ip 192.168.10.0 0.0.0.255 192.168.20.0 0.0.0.255
  permit ip 192.168.20.0 0.0.0.255 192.168.10.0 0.0.0.255
  ! Comment
  remark allow ssh from admin network
  permit tcp 192.168.99.0 0.0.0.255 192.168.50.0 0.0.0.255 eq ssh
  deny any any
```

## Applying

### Interfaces

```cisco-ios
interface gi0/0/0
  ip access-group MY_ACCESS_LIST in
```

### VTYs

```cisco-ios
ip access-list standard vty-in
 permit 223.14.23.24 0.0.0.7
 deny any

line vty 0 4
  ! On VTYs inbound rules match incoming traffic to the
  ! VTY line, not the router (as opposed to interfaces)
  access-class vty-in in
```

## Understanding inbound / outbound

For interfaces, an inbound access list only applies for packets that enter a router on the interface it was configured on.

Suppose we have the following network (with routing already configured):

<img src={NetworkImage} width="400" />

And we apply this inbound ACL to R2:

```cisco-ios title="R2 conf#"
ip access-list extended test-acl
  permit ip any host 172.16.0.6
  deny ip any any

interface gi0/0/1
  ip access-group test-acl in
```

R1 will be able to ping R3, because of the `permit` rule.

The response packet from R3 is allowed either way, because it enters R2 on gi0/0/0, not gi0/0/1.

Now we use an outbound ACL instead:

```cisco-ios title="R2 conf#"
interface gi0/0/1
  no ip access-group test-acl in
  ip access-group test-acl out
```

The ping fails, because the ACL now applies to the response packets from R3 exiting on gi0/0/1, but the allowed destination does not match R1.

## Editing

```cisco-ios title="#"
! Show ACLs with numbering
show access-lists

ip access-list extended MY_ACCESS_LIST
  ! Delete a rule
  no 10

  ! Insert a rule
  25 permit ip 192.168.30.0 0.0.0.255 any

! Clear matches counter
clear access-list counters MY_ACCESS_LIST
```
