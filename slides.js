/*
 * The MIT License
 *
 * Copyright (c) 2008-2021 Olle Törnström studiomediatech.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Very simple automatic image slideshow that degrades nice and is completely
 * unobtrusive. Simply add the data attribute `data-slides` to an image element,
 * and supply an array string of images.
 *
 *   <img src="dog.jpg" data-slides="['cat.jpg', 'frog.jpg', 'fish.jpg']" />
 *
 * Some configuration properties may also be provided by data attributes. For
 * example: `data-wait="3000"`, `data-pause="2000"` and `data-fade="1200"`.
 *
 * @author  Olle Törnström olle[at]studiomediatech[dot]com
 * @author  Emil Bengtsson emil0r[at]gmail[dot]com
 *
 * @since   2009-01-15
 * @version 3.0.0
 */
(function () {
  "use strict";

  var slides = function ($el, images, options) {
    this.$el = $el;
    this.images = images;
    this.options = options;
    initWrapper(this);
    preloadNextImage(this);
    setTimeout(
      (slides) => {
        startSlideshow(slides);
      },
      this.options.wait,
      this
    );
  };

  const initWrapper = (slides) => {
    var $el = slides.$el;
    var $wrapper = document.createElement("span");
    $wrapper.style.display = "block";
    $wrapper.style.overflow = "hidden";
    $wrapper.style.height = $el.height + "px";
    $wrapper.style.width = $el.width + "px";
    var $new = $el.cloneNode();
    $new.style.transition = `opacity ${slides.options.fade}ms`;
    $wrapper.appendChild($new);
    $el.parentElement.replaceChild($wrapper, $el);
    slides.$el = $wrapper;
  };

  const preloadNextImage = (slides) => {
    var nextImage = slides.images.shift();
    slides.images.push(nextImage);
    var image = new Image();
    image.src = nextImage;
    slides.nextImage = image;
  };

  const startSlideshow = (slides) => {
    console.log("Starting", slides.images);

    var $wrapper = slides.$el;
    var $image = slides.$el.children[0];

    $image.addEventListener("transitionend", () => {
      if ($image.style.opacity == 0) {
        preloadNextImage(slides);
        $image.src = slides.nextImage.src;
        setTimeout(() => {
          $image.style.opacity = 1;
        }, slides.options.pause);
      } else {
        preloadNextImage(slides);
        $wrapper.style.background = `transparent url(${slides.nextImage.src}) top left no-repeat`;
        setTimeout(() => {
          $image.style.opacity = 0;
        }, slides.options.pause);
      }
    });

    // Start fading in and out...
    $wrapper.style.background = `transparent url(${slides.nextImage.src}) top left no-repeat`;
    $image.style.opacity = 0;
  };

  const DEFAULT_WAIT = 3000;
  const DEFAULT_PAUSE = 6000;
  const DEFAULT_FADE = 3000;

  // NOTE: Wait for placeholder image to load.
  window.addEventListener("load", () => {
    document.querySelectorAll("img[data-slides]").forEach(($el) => {
      new slides($el, JSON.parse($el.dataset.slides.replaceAll("'", '"')), {
        wait: $el.dataset.wait || DEFAULT_WAIT,
        pause: $el.dataset.pause || DEFAULT_PAUSE,
        fade: $el.dataset.fade || DEFAULT_FADE,
      });
    });
  });
})();
