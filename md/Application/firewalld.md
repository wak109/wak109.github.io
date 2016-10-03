# Firewalld

iptablesに慣れてるけど、時代の流れ。


## 手っ取り早くport をあける

```
# firewall-cmd --permanent --add-port=3870/tcp
success
# firewall-cmd --reload
success
# firewall-cmd --list-all
public (default, active)
  interfaces: eno33554984
  sources:
  services: dhcpv6-client ssh
  ports: 3870/tcp
  masquerade: no
  forward-ports:
  icmp-blocks:
  rich rules:
```

[CentOS firewalldによるアクセス制御](http://www.kakiro-web.com/linux/firewalld.html)

