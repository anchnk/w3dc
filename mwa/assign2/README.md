# [W3DC MWA Assignment 2](http://www.morphogenistes.org/olivier/w3c/mwa/assign2/)

## Disclaimer

This repository's code is a work in progress while studying new Web technologies. It shouldn't serve as an example, be cited or referenced if you want grab some samples, use at your own risk. It may be outdated quickly. It was done in the context of the w3 online classroom, for the mobile web applications programming course. If you want more information please visit [http://www.w3devcampus.com/](w3 dev campus).

## Design Principles

This application is based on progressive enhancement and features detection (mainly using [http://modernizr.com/](modernizr)).As a requirement initial HTML Structure of the document shouldn't be modified. 

Taking account this remark, in the current design principle, the application interactivity isn't going to work if Javascript isn't enable or supported. The only way I'm aware to make it work without Javascript would be using CSS pseudo class like target selectors and add elements to the DOM structure. This should be done in a real production environment however we assumed the client have Javascript support considering this.

In order to make it as small as possible, no third-party libraries other than modernizr were included. Using vanilla Javascript made it possible to support most devices and most browsers. The code is based on classList DOM elements manipulation, if the browser doesn't support it modernizr load this [https://github.com/eligrey/classList.js](polyfill). Modernizr includes the HTML5 shim makint it possible to style HTML5 sectioning elements correctly in older browsers.

## Performance

This is a sample application and the HTML file is really small. However, I've hosted files on a server that allows GZIP Compression even if it's not that efficient in this case. The HTML file is 1.5KB no compressed and 1.1KB with GZIP compression. Not a huge gain, but still an improvement. However the difference is much more appreciable on modernizr which is 13KB down to 5KB as well as the CSS file which is cut in half. 

YSlow rates the application around 95, Google PageSpeed Insights around 96 for desktop usage and 86 for mobile usage. Mainly because blocking JS and CSS. It's validating against CSS validator, HTML5 validator and both JS and CSS files are linted without any errors. 

The server configuration set cache expiration to 48 hours for JS files and 24 hours for CSS ones. I've modified it for one year for both but that would need to use fingerprinted links. I've done some test with [Grunt](http://gruntjs.com/) but it's still a work in progress.

## Devices Succesfully Tested

* **Iphone 5S** – IOS 7.0.3 – SafariMobile
* **Samsung Galaxy S3** – Android 4.3 – Webkit and Chrome Browsers
* **Nokia Lumia 920** – Windows Phone 8 – Internet Explorer
* **Sony Ericsson Xperia X10 mini** – Android 2.1 – Webkit, Opera Mini, Opera Classic
* **Motorola Blur** – Android 2.1 – Webkit Browser OK
* **Opera Mobile emulator** Various Devices Selected

Didn't tested much on emulators as I have access to a wide range of devices in my work. As emulators aren't really reliable i chose to test the application on several devices at work. The application behave correctly in most cases, however if the device doesn't support classList and connected to a 'low data' network as EDGE there's an unwanted flash of unstyled content occurring. I'm not sure yet how to handle this part (a loader before displaying content could be a hint).

## Related Readings

During the coding process, I've read the following links and try to apply some concepts in the given time. 

* [Modernizr documentation](http://modernizr.com/docs/)
* [Yahoo Performance Rules](http://developer.yahoo.com/performance/rules.html)
* [Optimise Browser Rendering](https://developers.google.com/speed/docs/best-practices/rendering)
* [Basline Grid](http://joshnh.com/2011/08/03/how-to-set-up-a-baseline-grid/)
* [Improving HTML5 app performance using GPU](http://www.urbaninsight.com/2013/01/04/improving-html5-app-performance-gpu-accelerated-css-transitions)
* [How to Optimize Your Site with HTTP Caching] (http://betterexplained.com/articles/how-to-optimize-your-site-with-http-caching/)
