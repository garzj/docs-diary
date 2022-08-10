# Digi4school

## Download books

I wrote a small tool, [d4sd](https://github.com/garzj/d4sd) that can download books from [digi4school.at](https://digi4school.at) as pdf.

It's also capable of downloading archives with all additional learning material.

### Installation

```bash
npm i -g d4sd
```

### Usage

```bash
# Download a specific book using a glob pattern
d4sd "Grundlagen d?? Elektrotechnik (2|3)*" -u john.doe@example.com -o ./download/

# Download your whole shelf
d4sd "*" -u john.doe@example.com -p <password> -o ./download/

# More options
d4sd -h
```
