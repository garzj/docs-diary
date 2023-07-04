# Accept self signed certs

When using a self-signed certificate, one may receive the error `NET::ERR_CERT_AUTHORITY_INVALID`. Here are some ways to bypass this issue.

## Chromium based browsers

[Typing "thisisunsafe"](https://cybercafe.dev/thisisunsafe-bypassing-chrome-security-warnings/) in any Chromium based browser will temporarily accept any invalid certificates from a website and let you continue.

The warnings can be turned back on, when clicking on the "Not secure" in the URI bar followed by "Turn on warnings".

## curl

Add the `-k` option to accept self-signed certificates when using `curl`.

```bash
curl -k https://localhost:8080
```
