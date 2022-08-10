# Certbot

## Installation

[See here](https://certbot.eff.org/instructions?ws=nginx&os=debianbuster).

## Add certificate

This will request a certificate and install it onto all nginx sites that use these domains.

```bash
certbot --nginx -d example.com,www.example.com
```

## Expand certificate

```bash
certbot --nginx -d example.com,www.example.com,newsubdomain.example.com
```

If certbot asks you, press `e` to expand the certificate.
