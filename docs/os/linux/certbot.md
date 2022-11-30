# Certbot

## Installation

[See here](https://certbot.eff.org/instructions?ws=nginx&os=debianbuster).

## Add certificate

This will request a certificate and install it onto all nginx sites that use these domains.

```bash
certbot --nginx -d example.com,www.example.com
```

## List certificates

```
certbot certificates
```

## Modify certificate domains

Run the same command with `--cert-name` to make sure cerbot won't request a new certificate.

```bash
certbot --nginx --cert-name $name -d example.com,www.example.com,newsubdomain.example.com
```

If certbot asks you, press `e` to expand or `u` to update the certificate.
