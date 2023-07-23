# Pi Remote

This is a remote control application designed to run on a raspberry pi.

## Hardware

- Raspberry Pi (Q4 2012, Model B)
- Half-size breadboard connected to the GPIO
  - PNP Transistor
  - Infrared LED
  - Infrared Receiver
  - Resistor

## Dependencies

- Raspbian
- Linux Infrared Remote Control (LIRC)
- Node.js (with npm)

## Software

- Server (app.js)
- Remote page (index.html, style.css, script.js)
  - HTML
  - Bootstrap CSS
  - Font Awesome (icons and logos)
  - JavaScript 

This was inspired by and adapted from the pi-remote project from Michael Vartan. Thank you!
- https://github.com/vartan/pi-remote
- http://mvartan.com/2014/11/25/controlling-your-tv-or-any-ir-device-with-raspberry-pi>

## Configuration

- Wi-Fi configuration settings file (/etc/wpa_supplicant/wpa_supplicant.conf). Use sudo to view/edit the file. See the sample `wpa_supplicant.conf` file in the same directory as this `README.md`.

- Assign a fixed IP on your router, and make sure it's private (not in the DMZ). _Note_: For google fiber, this setting is only available on the web app, not the phone app, under Network / Edit network settings / Advanced network settings.

- Schedule a script to run every 10 minutes and check/fix the network connection. See the sample `netcheck.sh` file in the same directory as this `README.md`.
```sh
*/10 * * * * /usr/bin/netcheck.sh
```

- Use `/etc/init.d/pi-remote` config to launch the app on startup. See the sample `pi-remote` file in the same directory as this `README.md`. This script uses `forever` to run the node application `app.js` from source directory `/home/pi/pi-remote`.
