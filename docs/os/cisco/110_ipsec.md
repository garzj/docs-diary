# IPSec

Configuring an IPSec VPN between Cisco routers.

## IPSec

IPSec can act as the hop between two networks, while bridging the traffic to another peer using various encryptions.

## Configuration

### Peer 1

- Address: `223.130.23.2`
- Local network: `10.0.0.0/16`

```cisco-ios
! Encryption policy
crypto isakmp policy 10
  encryption aes 256
  authentication pre-share
  group 2

! Pre-shared key (has to match on both sides) with peer addr
crypto isakmp key 1mysecurepassword! address 223.130.23.6

! Specifies algorithms used for IPSec
crypto ipsec transform-set my-vpn-set esp-aes 256 esp-sha-hmac

! VPN allowed traffic
ip access-list extended my-vpn-acl
  permit ip 10.0.0.0 255.255.0.0 10.1.0.0 255.255.255.0

! Put it together
crypto map my-vpn-map 10 ipsec-isakmp
  set peer 223.130.23.6
  set transform-set my-vpn-set
  match address my-vpn-acl

! Bind map to outside interface
int gi0/0/0
  crypto map my-vpn-map

! Actually route the traffic to the other peer (or use a default route to the next hop)
ip route 10.1.0.0 255.255.0.0 223.130.23.6
```

:::important

- Allow the VPN traffic on the other peer's inbound interface
- Exclude the remote VPN network from a potential NAT/PAT using its ACL

:::

### Peer 2

- Address: `223.130.23.6`
- Local network: `10.1.0.0/16`

```cisco-ios
crypto isakmp policy 10
  encryption aes 256
  authentication pre-share
  group 2

crypto isakmp key 1mysecurepassword! address 223.130.23.2

crypto ipsec transform-set my-vpn-set esp-aes 256 esp-sha-hmac

ip access-list extended my-vpn-acl
  permit ip 10.1.0.0 255.255.0.0 10.0.0.0 255.255.255.0

crypto map my-vpn-map 10 ipsec-isakmp
  set peer 223.130.23.2
  set transform-set my-vpn-set
  match address my-vpn-acl

int gi0/0/0
  crypto map my-vpn-map

ip route 10.0.0.0 255.255.0.0 223.130.23.2
```
