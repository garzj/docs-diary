---
sidebar_label: Digi4School
---

# Downloading books from Digi4School

I wrote a small tool, [d4sd](https://github.com/garzj/d4sd) that can download books from [digi4school.at](https://digi4school.at) as pdf files.

It's also capable of downloading archives with all additional learning material.

### Installation

Make sure to install [Node.js](https://nodejs.org/en) first.

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

More information can be found [here](https://github.com/garzj/d4sd?tab=readme-ov-file#digi4school-downloader).
