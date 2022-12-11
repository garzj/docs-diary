# Dell XPS 15

## Installing Manjaro

Here are my steps switching from Windows to Manjaro Linux on a Dell XPS 15 9500.

- Backed up my Windows data with Acronis
- Installed Manjaro Gnome using Ventoy
- Update mirrors  
  `sudo pacman-mirrors -c de,at`
- Enable the AUR, update packages
- Fingerprint
  - Is on the [list of unsupported devices](https://gitlab.freedesktop.org/libfprint/wiki/-/wikis/Unsupported-Devices)
  - Works tho with `libfprint-2-tod1-xps9300`
- Disable wayland in `/etc/gdm/custom.conf`, because it
  - has no message API between windows, so CopyQ doesn't work
  - is still not supported by a lot of apps and XWayland is blurry on HiDPI
  - disables hardware acceleration in some apps  
  - forces VSync
- Configure additional apps  
  `brave-browser copyq neovim nvim-packer-git xsel wl-clipboard visual-studio-code-bin ttf-ms-win11-auto steam-native-runtime bitwarden speedtest-cli minecraft-launcher whatsapp-for-linux acronis-cyber-protect-bin tree platformio bind neofetch mutter-x11-scaling cowsay x11-emoji-picker cuda-tools spotify teams-for-linux youtube-dl nm-connection-editor vmware-workstation wireshark-qt dotnet-sdk python-pip rustup lldb packettracer go libreoffice-fresh`
- Shortcuts
  - `Super + Arrow Up`: Maximize window
  - `Super + Arrow Down`: Restore window
  - `Super + E`: Home folder
  - `Super + T`: `gnome-terminal`
  - `Super + V`: `copyq "menu('clipboard', 20)"`
  - `Super + .`: `emoji-picker`
- [Configure cursor speed](https://askubuntu.com/a/569345)
- Gnome Extensions
  - [Just Perfection](https://extensions.gnome.org/extension/3843/just-perfection/)
    - Preset: Super Minimal
    - Panel in Overview: On
    - OSD: On
    - Workspace Popup: On
    - Workspace Switcher: On
    - Animation: Fastest
- Enable fractional scaling  
  `settings set org.gnome.mutter experimental-features "['x11-randr-fractional-scaling']"`
- Desktop experience without tearing on intel  
  - Install `xf86-video-intel`
  - Create `/etc/X11/xorg.conf.d/20-intel.conf`  
    ```
    Section "Device"
      Identifier "Intel Graphics"
      Driver "intel"
      Option "DRI" "3"
      Option "TripleBuffer" "true"
      Option "TearFree" "true"
    EndSection
    ```
- Configure user dirs in `~/.config/user-dirs.dirs`
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
- Could not get `linux-wifi-hotspot` to work for my wifi adapter  
  - `sudo aa-complain -d /etc/apparmor.d dnsmasq`
  - ...
- More apps and config...
