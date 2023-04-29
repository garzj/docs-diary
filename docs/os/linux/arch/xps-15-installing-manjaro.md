---
title: Installing Manjaro on my Dell XPS 15
---

# Manjaro on a Dell XPS 15

Here are my steps switching from Windows to Manjaro Linux on a Dell XPS 15 9500.

## Basic installation

- Backed up my Windows system
- Installed Manjaro Gnome using Ventoy
- Once booted, update pacman mirrors  
  `sudo pacman-mirrors -c de,at`
- Enable the AUR + Flatpak with updates in the Pamac GUI and upgrade all packages

## Rendering setup

### Resolve hibernation and sleep issues

The default installation had issues waking up after being in suspend or hibernation state. The following actions solved the problem for me:

- Changing some boot options
  - Add `fsck` in `/etc/default/grub` to `GRUB_CMDLINE_LINUX_DEFAULT` before `resume=`
  - I also added `sysrq_always_enabled=1` here, to enable the [REISUB](https://forum.manjaro.org/t/howto-reboot-turn-off-your-frozen-computer-reisub-reisuo/3855) method, just in case
  - `sudo update-grub`
- Enabling [early KMS start](https://wiki.archlinux.org/title/kernel_mode_setting#Early_KMS_start) of the Intel and Nvidia modules
  - Add `i915` and `nvidia nvidia_modeset nvidia_uvm nvidia_drm` to the `MODULES=(...)` array in `/etc/mkinitcpio.conf`
  - `sudo mkinitcpio -P`

### Use X and disable Wayland

Edit `/etc/gdm/custom.conf`, and uncomment `#WaylandEnable=false`, because Wayland

- has no message API between windows, so CopyQ doesn't work
- is still not supported by a lot of apps and XWayland is blurry on HiDPI ([Sommilier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/) could be ported here)
- disables hardware acceleration in some apps
- forces VSync
- doesn't work with optimus manager

### Enable fractional scaling

```bash
sudo pacman -S mutter-x11-scaling
settings set org.gnome.mutter experimental-features "['x11-randr-fractional-scaling']"
sudo systemctl restart gdm # note, that this will close all apps
```

### Setup optimus manager

```
pamac install optimus-manager gdm-prime libgdm-prime
sudo cp /usr/share/optimus-manager.conf /etc
```

Editing these configs will create a tear free experience:

```conf title='/etc/optimus-manager.conf'
driver=intel
tearfree=yes
options=overclocking, triple_buffer
```

Also, applying the following settings will enable dynamic power management and hybrid graphics, but one should read [this guide](https://github.com/Askannz/optimus-manager/wiki/A-guide--to-power-management-options#configuration-1--dynamic-power-management-inside-the-nvidia-driver-runtime-d3-power-management) first:

```conf title='/etc/optimus-manager.conf'
startup_mode=hybrid
dynamic_power_management=fine
```

Now, after runnning `systemctl restart gdm optimus-manager`, the desktop will begin to use `gdm-prime` and start optimus-manager using hybrid graphics right away.

### Pretty GDM and plymouth

The following procedures will remove all Manjaro ads from the boot process and the login screen.

#### Apply some nice settings to GDM

- `pamac install gdm-settings`
- Click three dots -> Load session settings
- Login Screen -> Disable "Enable Logo"
- Apply

#### Change the plymouth theme

- `plymouth-set-default-theme --list` and pick a theme
- Set `DeviceScale=2` in `/etc/plymouth/plymouthd.conf` for HiDPI
- `sudo plymouth-set-default-theme -R spinner`

## Setting up the fingerprint sensor

The device is on the [list of unsupported devices](https://gitlab.freedesktop.org/libfprint/wiki/-/wikis/Unsupported-Devices), but it works tho with the `libfprint-2-tod1-xps9300` driver from the AUR.

This will install the driver:

```bash
pamac remove fprintd
pamac install libfprint-tod-git libfprint-2-tod1-xps9300-bin
pamac install fprintd
```

Then setup your fingerprint in Settings -> Users

## Fixing scroll issues with libinput and HiDPI mice

Some X apps might ignore scroll events when the scroll direction changes and HiDPI scrolling is enabled. [xev](https://archlinux.org/packages/extra/x86_64/xorg-xev/) can be used to track this behaviour, even when [evtest](https://archlinux.org/packages/community/x86_64/evtest/) shows different events.

[This solution](https://forum.manjaro.org/t/logitech-mx-master-vertical-scroll-issue/100859/4) worked by creating the following file:

```toml title='/etc/libinput/local-overrides.quirks'
[Logitech MX Master 3 USB]
MatchVendor=0x046D
MatchProduct=0x4082
ModelInvertHorizontalScrolling=1
AttrEventCode=-REL_WHEEL_HI_RES;-REL_HWHEEL_HI_RES;

[Logitech MX Master 3]
MatchVendor=0x46D
MatchProduct=0xB023
ModelInvertHorizontalScrolling=1
AttrEventCode=-REL_WHEEL_HI_RES;-REL_HWHEEL_HI_RES;
```

Now after running `systemctl restart gdm`, the issues were fixed.

## Configuring Gnome settings

- Set a nice wallpaper
- Shortcuts
  - `Super + Arrow Up`: Maximize window
  - `Super + Arrow Down`: Restore window
  - `Super + E`: `nautilus --new-window`
  - `Super + T`: `gnome-terminal`
  - `Super + V`: `copyq "menu('clipboard', 20)"`
  - `Super + .`: `emoji-picker`
- Configure cursor speed
- Gnome Extensions
  - [Just Perfection](https://extensions.gnome.org/extension/3843/just-perfection/)
    - Preset: Super Minimal
    - Panel in Overview: On
    - OSD: On
    - Workspace Popup: On
    - Workspace Switcher: On
    - Animation: Fastest
- Configure user dirs in `~/.config/user-dirs.dirs`

## Configuring additional apps

- `pamac install brave-browser copyq neovim nvim-packer-git visual-studio-code-bin ttf-ms-win11-auto steam-native-runtime bitwarden speedtest-cli minecraft-launcher whatsapp-for-linux tree platformio neofetch mutter-x11-scaling cowsay x11-emoji-picker cuda-tools spotify teams-for-linux youtube-dl nm-connection-editor vmware-workstation wireshark-qt dotnet-sdk python-pip rustup lldb go libreoffice-fresh android-sdk android-studio autojump bluez-utils-compat cabextract gdlauncher-bin linux-wifi-hotspot nvidia-container-runtime-bin python2-bin sqlite teamviewer usb_modeswitch xxd-standalone`

- Set VS Code `terminal.integrated.fontFamily` to `NotoSansMono Nerd Font`
- Add myself to the wireshark group  
  `sudo usermod -a -G wireshark $USER`
- Install a [resolve crack](https://www.reddit.com/user/GermanAcId/comments/yxssux/this_is_probably_what_youre_looking_for/) for mp4 codecs
  - Override desktop file to execute app with `prime-run`
- VMWare setup
  - Enter a [license key](https://web.archive.org/web/20221202083641/https://gist.github.com/williamgh2019/cc2ad94cc18cb930a0aab42ed8d39e6f)
  - Add [systemd services](https://communities.vmware.com/t5/VMware-Workstation-Pro-Documents/Workstation-support-on-Linux-using-systemd/ta-p/2792857)
- Rust setup
  - `rustup default stable`
  - `rustup target add i686-unknown-linux-gnu`
  - `cargo install cargo-watch`
- VirtManager setup
  - To use VirtManager without root, set `unix_sock_group = "libvirt"` in `/etc/libvirt/libvirtd.conf` and run:
    ```bash
    newgrp libvirt
    sudo usermod -a -G libvirt $USER
    ```
  - Enable and start the daemon and the default network:
    ```bash
    sudo systemctl enable libvirtd
    sudo systemctl start libvirtd
    sudo virsh net-autostart default
    sudo virsh net-start default
    ```
- League of Legends
  - Install lutris with `pamac install lutris`
  - Configure Lutris -> Wine Settings -> System Options
    - Set the Default installation folder to `~/.local/share/games`
    - Enable NVIDIA Prime Render Offload
  - Install from `https://lutris.net/games/league-of-legends/`
- ...
