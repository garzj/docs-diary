# Screen

## Start a screen

```bash
screen -S <name> <command>
```

Pass `-dm` to start in detached mode.

## Stuff text into a session

The `^M` will be replaced with a newline.

```bash
screen -S <name> -p 0 -X stuff "some command^M"
```

## Attach and detach

### Attach to a session

```bash
screen -r <name>
```

### Detach with a shortcut

Press `Ctrl + A`, then `D`

### Detach from outside

```bash
screen -dmS <name>
```
