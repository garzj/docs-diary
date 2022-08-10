# Swapfiles

A swap space extends the available RAM on your machine with some virtual memory on your hard drive.

Normally you would use a dedicated partition for this purpose, but this is not always possible on cloud-based virtual machines. The solution is a swapfile.

```bash title='Enter super user mode'
sudo su
```

## Creating a swapfile

```bash
# Show swap spaces
swapon --show

# Allocate the file (1G)
dd if=/dev/zero of=/var/swapfile bs=1M count=1K
chmod 600 /var/swapfile
mkswap /var/swapfile

# Activate the swap
swapon /var/swapfile
echo "/var/swapfile swap swap defaults 0 0" >> /etc/fstab
```

## Adjusting the swappiness value

A lower swappiness value will tell the OS to avoid using the swap, while a higher one will tell it to use the swap more frequently.

Swappiness values usually range between `0` and `100`.

```bash
# Show swappiness
cat /proc/sys/vm/swappiness

# Set swappiness value
sysctl vm.swappiness=20
echo "vm.swappiness=20" >> /etc/sysctl.conf
```

## Resizing a swapfile

:::caution
Deactivating a swapfile will swap its contents into RAM, which could summon the OOM killer. It may be better to just create a second one.
:::

```bash
# Deactivate the swap
swapoff /var/swapfile

# Increase the swapfile size (1G)
dd if=/dev/zero of=/var/swapfile bs=1M count=1K
mkswap /var/swapfile

# Reactivate the swap
swapon /var/swapfile
```

## Removing a swapfile

```bash
# Deactivate the swap
swapoff /var/swapfile

# Remove the swapfile from /etc/fstab
vim /var/swapfile

# Delete the file
rm /var/swapfile
```
