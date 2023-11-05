---
title: Setting up Fedora Gnome on a Dell XPS 17
---

# Setting up Fedora on a Dell XPS 17

Here are some of my steps setting up Fedora with Gnome on a Dell XPS 17 9730.

I got one because the motherboard of my [XPS 15](../arch/xps-15-installing-manjaro.md) died and they didn't have them in stock, so they sent me a new laptop. I'm now making the switch to Fedora (from Manjaro), because it's much more stable and dnf is just great (also, my fingerprint works out of the box now).

## Basic installation

I installed Fedora with Gnome using [Ventoy](https://www.ventoy.net/en/index.html) and the latest ISO from the [official site](https://fedoraproject.org/de/workstation/download/) or use the Fedora Media Writer.

When installed, do `sudo dnf update`, setup the fingerprint, connectivity, a wallpaper, dark theme and mouse settings.

## RPM Fusion setup

RPM Fusion provides software that the Fedora Project or Red Hat doesn't want to ship.

```bash
# Install RPM Fusion
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm

# Install appstream data for rpm fusion (so that packages show up in Gnome Software)
sudo dnf install rpmfusion-nonfree-appstream-data rpmfusion-free-appstream-data
```

## Setup fingerprint

My fingerprint worked out of the box, but while trying to setup the reader for two accounts at the same time, I broke it and had to reset the storage of the Goodix device. [This thread](https://bbs.archlinux.org/viewtopic.php?id=285848) (or rather [the program from this answer](https://community.frame.work/t/tracking-fingerprint-scanner-compatibility-with-linux-ubuntu-fedora-etc/1501/214)) solved the issue for me.

## Enable wayland and fractional scaling

If `echo $XDG_SESSION_TYPE` does not show `wayland`, make sure to set `WaylandEnable=true` in `/etc/gdm/custom.conf`.

Enable fractional scaling with `gsettings set org.gnome.mutter experimental-features "['scale-monitor-framebuffer']"`.

Log out and in again.

## Nvidia setup

Find the compatible driver for the GPU model [here](https://rpmfusion.org/Howto/NVIDIA) and install them.

Some information about Nvidia Optimus can be found [here](https://rpmfusion.org/Howto/Optimus).

## Setup electron apps to use wayland

The following flags will start an electron app on native Wayland (place them inside `~/.config/electron-flags.conf`):

```
--enable-features=UseOzonePlatform
--ozone-platform=wayland
--force-dark-mode
--enable-features=WebUIDarkMode
--enable-features=VaapiVideoEncoder,VaapiVideoDecoder,CanvasOopRasterization
--enable-zero-copy
--enable-raw-draw
--use-vulkan
--enable-features=WaylandWindowDecorations
```

This script will append these flags to any program launched with it (save this as a file `~/.local/share/applications/launch-electron.sh`):

```bash
#!/bin/bash
app="$1"
shift
config="$HOME/.config"
appcfg="$config/$(basename "$app")-flags.conf"
electroncfg="$config/electron-flags.conf"
if [[ -f "$appcfg" ]]; then
	flags="$(cat $appcfg)"
elif [[ -f "$electroncfg" ]]; then
	flags="$(cat $electroncfg)"
fi
"$app" $@ $flags
```

Install a few electron apps:

```bash
sudo dnf install unityhub code discord

# VSCode (https://code.visualstudio.com/docs/setup/linux)
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
dnf check-update
sudo dnf install code
```

Now to launch any of these apps natively on Wayland, copy its desktop file (probably `/usr/share/applications/$app.desktop`) into `~/.local/share/applications` append `/home/username/.local/share/applications/launch-electron.sh ` after every `Exec=` in the file.

Now starting an application from Gnome or with `gtk-launch $app` will pass all flags from `electron-flags.conf`.

## Gnome Extensions

Install [Extension Manager](https://flathub.org/apps/com.mattjakeman.ExtensionManager) to install:

- [Clipboard Indicator](https://extensions.gnome.org/extension/779/clipboard-indicator/)
  - I couldn't get CopyQ to work on wayland (not as nice but it's fine for now)
- [Just Perfection](https://extensions.gnome.org/extension/3843/just-perfection/)
  - Preset: Super Minimal
  - Panel in Overview: On
  - OSD: On
  - Workspace Popup: On
  - Workspace Switcher: On
  - Animation: Fastest
- [run or raise](https://extensions.gnome.org/extension/1336/run-or-raise/)
  - Example config (the `brave-...` are installed PWAs):
    ```
    # Terminal
    <Super>t,gnome-terminal,gnome-terminal-server
    <Super><Shift>t,gnome-terminal
    # Files
    <Super>e,nautilus --new-window,org.gnome.Nautilus
    <Super><Shift>e,nautilus --new-window
    # Bitwarden
    <Super>x,gtk-launch com.bitwarden.desktop.desktop,Bitwarden
    # Code
    <Super>c,gtk-launch code,/Code|code-url-handler/
    <Super><Shift>c,gtk-launch code
    # Spotify
    <Super>m,gtk-launch brave-pjibgclleladliembfgfagdaldikeohf-Default,brave-pjibgclleladliembfgfagdaldikeohf-Default
    # Brave
    <Super>b,gtk-launch brave-browser,brave-browser
    <Super><Shift>b,gtk-launch brave-browser
    # WhatsApp
    <Super>w,gtk-launch brave-hnpfjngllnobngcgfapefoaidbinmjnm-Default,brave-hnpfjngllnobngcgfapefoaidbinmjnm-Default
    # Discord
    <Super>d,gtk-launch Discord,Discord
    # Unity
    <Super>u,gtk-launch unityhub,Unity
    # And more...
    ```

## ZSH setup

### Oh my zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Some nice plugins are `git zsh-syntax-highlighting zsh-history-substring-search zsh-autosuggestions` and a nice theme is [powerlevel10k](https://github.com/romkatv/powerlevel10k).

### Increase zsh history size

Append the following to the end of `~/.zshrc`:

```bash
HISTSIZE=999999999
SAVEHIST=$HISTSIZE
```

More configuration...

## Neovim setup

Setup [packer](https://github.com/wbthomason/packer.nvim):

```bash
git clone --depth 1 https://github.com/wbthomason/packer.nvim ~/.local/share/nvim/site/pack/packer/start/packer.nvim
```

Some nice plugins are `wbthomason/packer.nvim`, `kylechui/nvim-surround`, `numToStr/Comment.nvim`.

More setup...

## Theme old GTK applications

To make most applications look more modern follow [steps from here](https://github.com/lassekongo83/adw-gtk3) for normal and flatpak apps.

## Apply better settings to GDM login screen

- Install [GDM Settings](https://github.com/gdm-settings/gdm-settings)
- Click three dots -> Load session settings
- Login Screen -> Disable "Enable Logo"
- Apply

## Change the bootsplash

```bash
# List themes
plymouth-set-default-theme --list

# Set theme (i. e. spinner), the -R rebuilds the initrd
sudo plymouth-set-default-theme -R spinner

# Remove the watermark from the splash
cd /usr/share/plymouth/themes
sudo cp -r spinner spinner_adfree
cd spinner_adfree
sudo rm watermark.png
sudo mv spinner.plymouth spinner_adfree.plymouth
sudo nvim spinner.plymouth # Change occurences of spinner to spinner_adfree
sudo plymouth-set-default-theme -R spinner
```

## Setup hibernation

If `systemctl hibernate` does not work because of insufficient swap space, try the following.

Determine the amount of swap space you need, which would be the amount of RAM the PC has (`free -h`) plus the amount of reserved ZRAM (`swapon --show`) plus 2GiB extra. In my case this would be 42GiB, so `43008` bytes in total.

Use a tool like [gparted](https://gparted.org/) while live booting to shrink the root partition and create a partition using `linux-swap` as filesystem.

Boot back into Fedora. Now the system could automatically pick the partition up (verify with `swapon --show`). If it doesn't, use:

```bash
sudo mkswap /dev/nvme0n1p4 # Use the correct device here
sudo swapon /dev/nvme0n1p4 # Use the correct device here
```

Now, to make sure, the swap is mounted on startup, add an entry to `/etc/fstab` (find the UUID with `lsblk -f`):

```bash
UUID=<swap-partition-uuid> none swap defaults 0 0
```

Now, add the `resume` module to the initramfs by creating a file `/etc/dracut.conf.d/resume.conf`:

```
add_dracutmodules+=" resume "
```

Run `sudo dracut --regenerate-all --force` to rebuild the initramfs.

Verify that the `resume` module shows up when running `sudo lsinitrd -m`.

Now, add `resume=UUID=<swap-partition-uuid>` to the `GRUB_CMDLINE_LINUX` in `/etc/default/grub` and run `sudo grub2-mkconfig` to confirm the changes.

Hibernation with `systemctl hibernate` should now work.

## Fix sound issues

I only had `Dummy Output` as my speaker, but [this answer](https://askubuntu.com/a/1387002/1037993) finally solved the issue for me.

## Useful links

- https://github.com/thiagoojack/packettracer-fedora

## More setup

```bash
sudo dnf groupinstall "Development Tools" "Development Libraries" # C / C++
sudo dnf install rust cargo # Rust

# Node / npm
curl -fsSL https://fnm.vercel.app/install | bash
# https://github.com/Schniz/fnm#shell-setup
fnm install --lts
npm i -g yarn

# Platform IO (https://docs.platformio.org/en/latest/core/installation/methods/installer-script.html#super-quick-macos-linux)
curl -fsSL -o get-platformio.py https://raw.githubusercontent.com/platformio/platformio-core-installer/master/get-platformio.py
python3 get-platformio.py
# Udev rules (https://docs.platformio.org/en/latest/core/installation/udev-rules.html)
curl -fsSL https://raw.githubusercontent.com/platformio/platformio-core/develop/platformio/assets/system/99-platformio-udev.rules | sudo tee /etc/udev/rules.d/99-platformio-udev.rules

# Package manager GUI
sudo dnf install dnfdragora
# I had to fix https://github.com/manatools/dnfdragora/issues/152

# Docker
curl -fsSL https://get.docker.com -o install-docker.sh
cat install-docker.sh # verify script
sh install-docker.sh --dry-run # verify install commands
sh install-docker.sh # installation
sudo systemctl enable --now docker # start service
sudo usermod -aG docker $USER # add user to docker group

sudo dnf install steam
```

...
