INTRODUCTION
============

Slides is a jQuery plugin that provides a very simple and fully unobtrusive
image slideshow, with cross fading effect, to any image element on a web page.

Features:

 - Unobtrusive
 - Cross fading between images
 - Configurable cross fade time
 - Adjustable pause time on each image
 - Optional linking to URL on click or custom event handler function

Slides is different to some other plugins in that it does not require any
extra HTML elements to define the slideshow.

Quick Start
-----------

Any image element can be enables as a slideshow automatically using Slides. Just
add the `data-slides` attribute, and specify the list of image sources to use
in the slideshow.

    <img src="dog.jpg" data-slides="['cat.jpg', 'fish.jpg', 'frog.jpg']" />

The presence of the data attribute will trigger the slideshow to begin. A few
simple properties makes it easy to control the slideshow.

    data-wait="6000"   // Time in ms before slideshow starts, default is 0.
    data-pause="12000" // Time in ms that each image is showed, default 6000.
    data-fade="3000"   // Time in ms for the fade transition, default 3000.

### With JS/jQuery

Slides can also be used as a traditional jQuery plug-in. An image element can
simply be targetted using some selector.

    <img src="burger.jpg" id="foods" />

In our JS we select the image element by it's ID attribute. The optional
settings can configure the initial wait time before starting, crossfade or fade
time, image pause or time showed, link to URL on click or a custom function to
be used on image click.

    $("#foods").Slides({
       images : ['salad.jpg', 'steak.jpg', 'soup.jpg'],
       urls : [link1, link2, link3],
       functions : [fn1, fn2, fn3],
       wait : 0,
       pause : 12000,
       fade : 2000
    });

### Required parameters:

    images : Array of images to show in the slideshow. Note that the slideshow
             will not automatically include the static image of the IMG-element.

### Optional parameters:

     wait : Time in ms before slideshow starts, default 0.
    pause : Time in ms that each image is showed, default 6000.
     fade : Time in ms for the image fade transition, default 3000.

Optional handlers for clicks, paired by order in `images`, either one of:

         urls : Array of URLs, normal linking
    functions : Array of custom functions

DEVELOPMENT
-----------

Slides is free, free as in free to use and free to extend. It means that it's
open for anybody to join in and help out or extend on the codebase.

### Feedback

Anything else, feel free to contact me on olle[at]studiomediatech[dot]com.
