"use strict";(self.webpackChunkdocs_garz_dev=self.webpackChunkdocs_garz_dev||[]).push([[5833],{167:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>d,default:()=>u,frontMatter:()=>a,metadata:()=>r,toc:()=>l});var i=s(4848),t=s(8453);const c=s.p+"assets/images/network-r1-r2-r3-nobg-4d1dddacf4e424968d0e611b5877c08d.png",a={},d="Access lists",r={id:"os/cisco/acls",title:"Access lists",description:"Configuring normal, numbered and extended access lists on a Cisco device.",source:"@site/docs/os/cisco/090_acls.md",sourceDirName:"os/cisco",slug:"/os/cisco/acls",permalink:"/os/cisco/acls",draft:!1,unlisted:!1,editUrl:"https://github.com/garzj/docs-diary/edit/master/docs/os/cisco/090_acls.md",tags:[],version:"current",lastUpdatedBy:"garzj",sidebarPosition:90,frontMatter:{},sidebar:"autoSidebar",previous:{title:"Port & Network security",permalink:"/os/cisco/port_security"},next:{title:"NAT",permalink:"/os/cisco/nat"}},o={},l=[{value:"ACL types",id:"acl-types",level:2},{value:"Standard and extended",id:"standard-and-extended",level:3},{value:"Numbered and named",id:"numbered-and-named",level:3},{value:"Creation",id:"creation",level:2},{value:"Applying",id:"applying",level:2},{value:"Interfaces",id:"interfaces",level:3},{value:"VTYs",id:"vtys",level:3},{value:"Understanding inbound / outbound",id:"understanding-inbound--outbound",level:2},{value:"Editing",id:"editing",level:2}];function p(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"access-lists",children:"Access lists"}),"\n",(0,i.jsx)(n.p,{children:"Configuring normal, numbered and extended access lists on a Cisco device."}),"\n",(0,i.jsx)(n.h2,{id:"acl-types",children:"ACL types"}),"\n",(0,i.jsx)(n.h3,{id:"standard-and-extended",children:"Standard and extended"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"standard"}),": filter based on source IP"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"extended"}),": filter based on source IP, destination IP, protocol, ports, etc."]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"numbered-and-named",children:"Numbered and named"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"numbered"}),": ACLs identified by number (different type depending on number, ",(0,i.jsx)(n.code,{children:"access-list ?"})," to find out)"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"named"}),": ACLs identified by name"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"creation",children:"Creation"}),"\n",(0,i.jsx)(n.p,{children:"Note, that rules entered first take presedence over others."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-cisco-ios",children:"! numbered acl (always matches source IPs)\naccess-list 10 permit 192.168.10.0 0.0.0.255\naccess-list 10 permit 192.168.20.0 0.0.0.255\n! (deny any is always implied at the end)\naccess-list 10 deny any\n\n! delete whole acl\nno access-list 10\n\n! named standard acl\nip access-list standard SOME_NAME\n  ! ...\n\n! named extended acl (matches <soure> <destination> <protocol>)\nip access-list extended MY_ACCESS_LIST\n  permit ip 192.168.10.0 0.0.0.255 192.168.20.0 0.0.0.255\n  permit ip 192.168.20.0 0.0.0.255 192.168.10.0 0.0.0.255\n  ! Comment\n  remark allow ssh from admin network\n  permit tcp 192.168.99.0 0.0.0.255 192.168.50.0 0.0.0.255 eq ssh\n  deny any any\n"})}),"\n",(0,i.jsx)(n.h2,{id:"applying",children:"Applying"}),"\n",(0,i.jsx)(n.p,{children:"The best practice is to apply an access list as close to its destinations as possible."}),"\n",(0,i.jsx)(n.h3,{id:"interfaces",children:"Interfaces"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-cisco-ios",children:"interface gi0/0/0\n  ip access-group MY_ACCESS_LIST in\n"})}),"\n",(0,i.jsx)(n.h3,{id:"vtys",children:"VTYs"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-cisco-ios",children:"ip access-list standard vty-in\n permit 223.14.23.24 0.0.0.7\n deny any\n\nline vty 0 4\n  ! On VTYs inbound rules match incoming traffic to the\n  ! VTY line, not the router (as opposed to interfaces)\n  access-class vty-in in\n"})}),"\n",(0,i.jsx)(n.h2,{id:"understanding-inbound--outbound",children:"Understanding inbound / outbound"}),"\n",(0,i.jsx)(n.p,{children:"For interfaces, an inbound access list only applies for packets that enter a router on the interface it was configured on."}),"\n",(0,i.jsx)(n.p,{children:"Suppose we have the following network (with routing already configured):"}),"\n",(0,i.jsx)("img",{src:c,width:"400"}),"\n",(0,i.jsx)(n.p,{children:"And we apply this inbound ACL to R2:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-cisco-ios",metastring:'title="R2 conf#"',children:"ip access-list extended test-acl\n  permit ip any host 172.16.0.6\n  deny ip any any\n\ninterface gi0/0/1\n  ip access-group test-acl in\n"})}),"\n",(0,i.jsxs)(n.p,{children:["R1 will be able to ping R3, because of the ",(0,i.jsx)(n.code,{children:"permit"})," rule."]}),"\n",(0,i.jsx)(n.p,{children:"The response packet from R3 is allowed either way, because it enters R2 on gi0/0/0, not gi0/0/1."}),"\n",(0,i.jsx)(n.p,{children:"Now we use an outbound ACL instead:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-cisco-ios",metastring:'title="R2 conf#"',children:"interface gi0/0/1\n  no ip access-group test-acl in\n  ip access-group test-acl out\n"})}),"\n",(0,i.jsx)(n.p,{children:"The ping fails, because the ACL now applies to the response packets from R3 exiting on gi0/0/1, but the allowed destination does not match R1."}),"\n",(0,i.jsx)(n.h2,{id:"editing",children:"Editing"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-cisco-ios",metastring:'title="#"',children:"! Show ACLs with numbering\nshow access-lists\n\nip access-list extended MY_ACCESS_LIST\n  ! Delete a rule\n  no 10\n\n  ! Insert a rule\n  25 permit ip 192.168.30.0 0.0.0.255 any\n\n! Clear matches counter\nclear access-list counters MY_ACCESS_LIST\n"})})]})}function u(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>d});var i=s(6540);const t={},c=i.createContext(t);function a(e){const n=i.useContext(c);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(c.Provider,{value:n},e.children)}}}]);