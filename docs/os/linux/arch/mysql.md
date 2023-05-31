# MySQL

## Install `mysql`, not `mariadb`

### Compile the AUR package

```bash
git clone https://aur.archlinux.org/mysql.git/
cd mysql
makepkg -si
```

The reason I've done that is because tools like `pacman` install `mariadb` instead, which should work just the same, but our teacher is an Oracle fan wants us to use pure `mysql` instead.

### Install my pre-compiled binaries

This should be a lot faster than compiling from scratch...

```
wget https://garz.dev/bin/gpl/mysql-clients-8.0.31-1-x86_64.pkg.tar.zst https://garz.dev/bin/gpl/mysql-8.0.31-1-x86_64.pkg.tar.zst https://garz.dev/bin/gpl/libmysqlclient-8.0.31-1-x86_64.pkg.tar.zst
sudo pacman -U libmysqlclient-8.0.31-1-x86_64.pkg.tar.zst mysql-clients-8.0.31-1-x86_64.pkg.tar.zst mysql-8.0.31-1-x86_64.pkg.tar.zst
```

Now add those to `IgnorePkg` in `/etc/pacman.conf`: `mysql libmysqlclient mysql-clients`

### Additional tooling

```bash
sudo pacman -S mysql-workbench
```

## Initialization issues

I had permission issues, when runnning `systemctl start mysqld` and figured, I could fix them by reinitializing `mysqld` as the `mysql` user:

```bash
cd /var/lib
sudo rm -rf mysql
sudo mkdir mysql
sudo chown mysql:mysql mysql
sudo -u mysql bash
  cd mysql
  mysqld --initialize # Copied the temporary password
  exit
systemctl start mysqld
systemctl enable mysqld
```

## Secure the installation

I ran `mysql_secure_installation` with the following config:

- Entered temporary password, set a new one
- Remove anonymouse users: `y`
- Disallow root login remotely: `n`
- Remove test database and access to it: `y`
- Reload privilege tables now: `y`
