#!/bin/bash

# Revision: 2023.04.10
# (GNU/General Public License version 3.0)
# by eznix (https://sourceforge.net/projects/ezarch/)

# ----------------------------------------
# Define Variables
# ----------------------------------------

LCLST="en_US"
# Format is language_COUNTRY where language is lower case two letter code
# and country is upper case two letter code, separated with an underscore

KEYMP="us"
# Use lower case two letter country code

KEYMOD="pc105"
# pc105 and pc104 are modern standards, all others need to be researched

MYUSERNM="oshin"
# use all lowercase letters only

MYUSRPASSWD="oshin"
# Pick a password of your choice

RTPASSWD="toor"
# Pick a root password

MYHOSTNM="oshinos"
# Pick a hostname for the machine

# ----------------------------------------
# Functions
# ----------------------------------------

# Test for root user
rootuser () {
  if [[ "$EUID" = 0 ]]; then
    continue
  else
    echo "[-] Run As Root"
    sleep 2
    exit
  fi
}

# Display line error
handlerror () {
clear
set -uo pipefail
trap 's=$?; echo "$0: Error on line "$LINENO": $BASH_COMMAND"; exit $s' ERR
}

# Clean up working directories
cleanup () {
[[ -d ./oshinreleng ]] && rm -r ./oshinreleng
[[ -d ./work ]] && rm -r ./work
[[ -d ./out ]] && mv ./out ../
sleep 2
}

# Requirements and preparation
prepreqs () {
pacman -S --needed --noconfirm archiso mkinitcpio-archiso
}

# Copy oshinreleng to working directory
cposhinreleng () {
cp -r /usr/share/archiso/configs/releng/ ./oshinreleng
rm ./oshinreleng/airootfs/etc/motd
rm -r ./oshinreleng/airootfs/etc/pacman.d
rm -r ./oshinreleng/airootfs/etc/xdg
rm -r ./oshinreleng/grub
rm -r ./oshinreleng/efiboot
rm -r ./oshinreleng/syslinux
}

# Copy oshinrepo to opt
cposhinrepo () {
cp -r ./opt/oshinrepo /opt/
}

# Remove oshinrepo from opt
rmoshinrepo () {
rm -r /opt/oshinrepo
}

# Remove auto-login, cloud-init, hyper-v, ied, sshd, & vmware services
rmunitsd () {
rm -r ./oshinreleng/airootfs/etc/systemd/system/cloud-init.target.wants
rm -r ./oshinreleng/airootfs/etc/systemd/system/getty@tty1.service.d
rm ./oshinreleng/airootfs/etc/systemd/system/multi-user.target.wants/hv_fcopy_daemon.service
rm ./oshinreleng/airootfs/etc/systemd/system/multi-user.target.wants/hv_kvp_daemon.service
rm ./oshinreleng/airootfs/etc/systemd/system/multi-user.target.wants/hv_vss_daemon.service
rm ./oshinreleng/airootfs/etc/systemd/system/multi-user.target.wants/vmware-vmblock-fuse.service
rm ./oshinreleng/airootfs/etc/systemd/system/multi-user.target.wants/vmtoolsd.service
rm ./oshinreleng/airootfs/etc/systemd/system/multi-user.target.wants/sshd.service
rm ./oshinreleng/airootfs/etc/systemd/system/multi-user.target.wants/iwd.service
}

# Add cups, haveged, NetworkManager, & sddm systemd links
addnmlinks () {
mkdir -p ./oshinreleng/airootfs/etc/systemd/system/network-online.target.wants
mkdir -p ./oshinreleng/airootfs/etc/systemd/system/multi-user.target.wants
mkdir -p ./oshinreleng/airootfs/etc/systemd/system/printer.target.wants
mkdir -p ./oshinreleng/airootfs/etc/systemd/system/sockets.target.wants
mkdir -p ./oshinreleng/airootfs/etc/systemd/system/timers.target.wants
mkdir -p ./oshinreleng/airootfs/etc/systemd/system/sysinit.target.wants
ln -sf /usr/lib/systemd/system/NetworkManager-wait-online.service ./oshinreleng/airootfs/etc/systemd/system/network-online.target.wants/NetworkManager-wait-online.service
ln -sf /usr/lib/systemd/system/NetworkManager-dispatcher.service ./oshinreleng/airootfs/etc/systemd/system/dbus-org.freedesktop.nm-dispatcher.service
ln -sf /usr/lib/systemd/system/NetworkManager.service ./oshinreleng/airootfs/etc/systemd/system/multi-user.target.wants/NetworkManager.service
ln -sf /usr/lib/systemd/system/haveged.service ./oshinreleng/airootfs/etc/systemd/system/sysinit.target.wants/haveged.service
ln -sf /usr/lib/systemd/system/cups.service ./oshinreleng/airootfs/etc/systemd/system/printer.target.wants/cups.service
ln -sf /usr/lib/systemd/system/cups.socket ./oshinreleng/airootfs/etc/systemd/system/sockets.target.wants/cups.socket
ln -sf /usr/lib/systemd/system/cups.path ./oshinreleng/airootfs/etc/systemd/system/multi-user.target.wants/cups.path
ln -sf /usr/lib/systemd/system/sddm.service ./oshinreleng/airootfs/etc/systemd/system/display-manager.service
}

# Copy files to customize the ISO
cpmyfiles () {
cp pacman.conf ./oshinreleng/
cp profiledef.sh ./oshinreleng/
cp packages.x86_64 ./oshinreleng/
cp -r grub ./oshinreleng/
cp -r efiboot ./oshinreleng/
cp -r syslinux ./oshinreleng/
cp -r etc ./oshinreleng/airootfs/
cp -r opt ./oshinreleng/airootfs/
cp -r usr ./oshinreleng/airootfs/
ln -sf /usr/share/oshinos ./oshinreleng/airootfs/etc/skel/oshinos
}

# Set hostname
sethostname () {
echo "${MYHOSTNM}" > ./oshinreleng/airootfs/etc/hostname
}

# Create passwd file
crtpasswd () {
echo "root:x:0:0:root:/root:/usr/bin/bash
"${MYUSERNM}":x:1010:1010::/home/"${MYUSERNM}":/bin/bash" > ./oshinreleng/airootfs/etc/passwd
}

# Create group file
crtgroup () {
echo "root:x:0:root
sys:x:3:"${MYUSERNM}"
adm:x:4:"${MYUSERNM}"
wheel:x:10:"${MYUSERNM}"
log:x:18:"${MYUSERNM}"
network:x:90:"${MYUSERNM}"
floppy:x:94:"${MYUSERNM}"
scanner:x:96:"${MYUSERNM}"
power:x:98:"${MYUSERNM}"
uucp:x:810:"${MYUSERNM}"
audio:x:820:"${MYUSERNM}"
lp:x:830:"${MYUSERNM}"
rfkill:x:840:"${MYUSERNM}"
video:x:850:"${MYUSERNM}"
storage:x:860:"${MYUSERNM}"
optical:x:870:"${MYUSERNM}"
sambashare:x:880:"${MYUSERNM}"
users:x:985:"${MYUSERNM}"
"${MYUSERNM}":x:1010:" > ./oshinreleng/airootfs/etc/group
}

# Create shadow file
crtshadow () {
usr_hash=$(openssl passwd -6 "${MYUSRPASSWD}")
root_hash=$(openssl passwd -6 "${RTPASSWD}")
echo "root:"${root_hash}":14871::::::
"${MYUSERNM}":"${usr_hash}":14871::::::" > ./oshinreleng/airootfs/etc/shadow
}

# create gshadow file
crtgshadow () {
echo "root:!*::root
sys:!*::"${MYUSERNM}"
adm:!*::"${MYUSERNM}"
wheel:!*::"${MYUSERNM}"
log:!*::"${MYUSERNM}"
network:!*::"${MYUSERNM}"
floppy:!*::"${MYUSERNM}"
scanner:!*::"${MYUSERNM}"
power:!*::"${MYUSERNM}"
uucp:!*::"${MYUSERNM}"
audio:!*::"${MYUSERNM}"
lp:!*::"${MYUSERNM}"
rfkill:!*::"${MYUSERNM}"
video:!*::"${MYUSERNM}"
storage:!*::"${MYUSERNM}"
optical:!*::"${MYUSERNM}"
sambashare:!*::"${MYUSERNM}"
"${MYUSERNM}":!*::" > ./oshinreleng/airootfs/etc/gshadow
}

# Set the keyboard layout
setkeylayout () {
echo "KEYMAP="${KEYMP}"" > ./oshinreleng/airootfs/etc/vconsole.conf
}

# Create 00-keyboard.conf file
crtkeyboard () {
mkdir -p ./oshinreleng/airootfs/etc/X11/xorg.conf.d
echo "Section \"InputClass\"
        Identifier \"system-keyboard\"
        MatchIsKeyboard \"on\"
        Option \"XkbLayout\" \""${KEYMP}"\"
        Option \"XkbModel\" \""${KEYMOD}"\"
EndSection" > ./oshinreleng/airootfs/etc/X11/xorg.conf.d/00-keyboard.conf
}

# Set and fix locale.conf, locale.gen, and keyboard
crtlocalec () {
sed -i "s/pc105/"${KEYMOD}"/g" ./oshinreleng/airootfs/etc/default/keyboard
sed -i "s/us/"${KEYMP}"/g" ./oshinreleng/airootfs/etc/default/keyboard
sed -i "s/en_US/"${LCLST}"/g" ./oshinreleng/airootfs/etc/default/locale
sed -i "s/en_US/"${LCLST}"/g" ./oshinreleng/airootfs/etc/locale.conf
echo ""${LCLST}".UTF-8 UTF-8" > ./oshinreleng/airootfs/etc/locale.gen
echo "C.UTF-8 UTF-8" >> ./oshinreleng/airootfs/etc/locale.gen
}

# Start mkarchiso
runmkarchiso () {
mkarchiso -v -w ./work -o ./out ./oshinreleng
}

# ----------------------------------------
# Run Functions
# ----------------------------------------

rootuser
handlerror
prepreqs
cleanup
cposhinreleng
addnmlinks
cposhinrepo
rmunitsd
cpmyfiles
sethostname
crtpasswd
crtgroup
crtshadow
crtgshadow
setkeylayout
crtkeyboard
crtlocalec
runmkarchiso
rmoshinrepo
