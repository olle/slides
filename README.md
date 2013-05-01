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

MINI-MANUAL
-----------

### Usage:

Any IMG element can be enabled as a slideshow using Slides. Just find your
elements by some selector, for example an ID or CLASS selector. In this
example we use the ID.

    <img src="images/someimage.jpg" id="slide" />

Bind the Slides plugin to the element found by simply calling the plugin with
your slideshow configuration passed as a JSON object.

    $("#slide").Slides({
       images : [image1.jpg, image2.jpg, image3.jpg]  
    });

Optional settings control initial wait time before starting, crossfade or fade
time, image pause or time showed, link to URL on click or a custom function to
be used on image click.

    $("#slide").Slides({
       images : [image1.jpg, image2.jpg, image3.jpg],
       urls : [link1, link2, link3],
       functions : [fn1, fn2, fn3],
       wait : 0,
       pause : 12000,
       fade : 2000
    });
 
REFERENCE
---------

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

### Code ###

You can find the Slides code on Github:

[http://github.com/olle/slides/tree/master]()

### Bugs, Issues or Features Requests ###

Slides can only get better if you provide feedback, report bugs and problems
or suggest new options, features or changes. Please use the issue handling
found on Github at:

[http://github.com/olle/slides/issues]()

### Feedback ###

Anything else, feel free to contact me on olle[at]studiomediatech[dot]com.
 