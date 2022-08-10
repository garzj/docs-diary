# Nginx

## Reverse proxy

This will pass all traffic on a nginx server to port 8080.

This configuration also works for websockets.

```conf
location / {
  proxy_pass http://localhost:8080;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}
```

## Apply config

### Check configuration

```bash
nginx -t
```

### Apply it

```bash
systemctl reload nginx
```
