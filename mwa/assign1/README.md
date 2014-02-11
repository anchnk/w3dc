# [W3DC MWA Assignment 1](http://www.morphogenistes.org/olivier/w3c/mwa/assign1/)

For this assignment I had to review a sample Web application provided with some features not adapted for mobile devices. The goal was to read mobile and mobile application best practices and identify the specificities of mobile context. 

I tested the sample application on two mobile phones :

* Sony Ericsson Xperia X10 mini (Android 2.1.1).
* Nokia Lumia 650 (Windows Phone 8).

It was interesting to test on those devices as they vary a lot in their characteristics. The SE Xperia X10 has limited hardware capabilites, a small screen size. On the other side, the Nokia got a much bigger screen size and resolution. It's a top-notch device compared to the SE. It allowed me to have two different user experience regarding the same application.

## **Mobile User Experience**

After tested the application of the devices mentioned, my first consideration concerns the application URI. It's way too long. As it's a sample application, this might not be relevant, however for a real production application the length of the URI does matter. On the SE Xperia X10 mini with a limited screen size it wasn't easy to type it correctlty, it's really hard to see mistakes and not easy to fix erros either. It was much better on the Nokia which got a bigger screen resolution and can show if not all most part of the URI especially in landscape mode.

Concerning the application itself: The layout is the most obvious problem.
Clearly, there are no techniques involved to adapt content to mobile screen resolutions and take viewport in the account. The layout is fixed, looking like a desktop application zoomed out. It's impossible to read it pleasantly on the SE Xperia X10 without zooming in (which leads to scroll bars).

Font sizes seems to be fixed which is a problem as it affects readability. On the Nokia, the device's browser zooms in when input fields get focus, forcing the user to zoom out in order to be able to submit their entry. Button and layout component are really small, it's error prone as one can easily click on the bad element. The position of the main component "add a text entry" is not suited, it should be the center of attention as it's the main feature whose with the user will interact.  Colors and contrasts aren't suited for a mobile Web application under bad lightning condition (e.g sunlight). Fancy Web fonts might looks nice on desktop but adds 4 HTTP requests and should be avoided under mobile network (took some time to load under EDGE network). On top of that, the application pop-up windows when clicking on links which violate mobile web best practices (as it's not as easy to get back to previous page than desktops). 

However, there are some good parts. The application isn't using large images, page content is styled using only CSS that degrades gracefully. The script used in order to validate user inputs (no empty fields) works on devices tested and respect Javascript module design pattern. 

## **Mobile Delivery**

Concerning network performance, first all sources aren't minified neither concatenated which is something important when bandwidth does matter. As stated, there are 4 requests for CSS which might be ok during development but should have been reduced before deployment.

Using a library like JQuery for doing such basic tasks is overkill. Vanilla Javascript or a lighter library could have handle DOM selections. It's the heaviest file in the application, size is around 80ko.

On the server side, GZIP compression doesn't seem to be enableb (no HTTP headers showing that serer compression is set up), server side optimisation does matter when delivering content to mobile, especially compression and cache. Compression can reduce bandwidth latencies as well as cost in user data traffic billing plan. 

## ** Markup, Content, Structure **

HTML defines HTML5 doctype and use obsolete markup. The meta tag indicating charset encoding is old version, some deprecated inline style tags are present (like b), and the form could be updated using proper HTML5 form elements. Semantically, it's not perfect, should use label for input rather than div and class, as well as using HTML5 sectioning elements. The CSS files use absolute units like px to define font sizes as well as grid layout which should be fluid and scalable. 