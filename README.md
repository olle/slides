# Slides

Slides is a JavaScript that extends the `IMG` element, to a very simple and
fully unobtrusive image slideshow, with cross fading effect, to any image
element on a web page.

Features:

- Unobtrusive
- Optional initial delay before start
- Cross fades between images
- Configurable cross fade time
- Adjustable pause duration

Slides does not require any extra HTML elements to define a slideshow.

## Quick Start

Any image element can be enabled as a slideshow, automatically using Slides.
Just add the `data-slides="..."` attribute, and specify the list of image
sources to use in the slideshow.

```html
<img src="dog.jpg" data-slides="['cat.jpg', 'fish.jpg', 'frog.jpg']" />
```

A few other data-attributes makes it easy to control the slideshow.

```
data-wait="6000"   // Time in ms before slideshow starts, default is 3000.
data-pause="12000" // Time in ms that each image is showed, default 6000.
data-fade="3000"   // Time in ms for the fade transition, default 3000.
```

## Development

Slides is free, free as in free to use and free to extend. It means that it's
open for anybody to join in and help out or extend on the codebase.

### Feedback

Anything else, feel free to contact me on olle[at]studiomediatech[dot]com.
