/*
 * The MIT License
 * 
 * Copyright (c) 2008-2009 Olle Törnström studiomediatech.com
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
 * unobtrusive. Simple to use, just apply to an image element by some selector:
 *
 *    <img src="start-image.jpg" alt="" id="my-image" />
 *
 *    $('#my-image').Slides({images : ['image1.jpg', 'image2.jpg']});
 *
 * This will create a slideshow that rotates over the images passed in the
 * array. You can also pass some optional settings for a bit of customization:
 *
 *    $('#my-image').Slides({
 *          images : [...], // required image URL array
 *            wait : 2000,  // wait before start, default 0
 *           pause : 5000,  // pause on each image, default 6000
 *            fade : 3000   // time to fade, default 1000
 *    });
 *
 * Passing these settings will create a slideshow that first waits 2s before
 * starting the slideshow timer. Each image is then displayed 5s and faded with
 * a transition time of 3s.
 *
 * @author  Olle Törnström olle[at]studiomediatech[dot]com
 * @author  Emil Bengtsson emil0r[at]gmail[dot]com
 * 
 * @since   2009-01-15
 * @version 1.3.0-ALPHA
 */
;(function ($) {

	var settings = {};

	$.fn.Slides = function (options) {
		
		var that = this;
		var id = $(this).attr('id');
		
		settings[id] = $.extend({}, $.fn.Slides.defaults, options || {});
		
		$.fn.Slides.init(that, settings[id], function() {
			return that.each(function () {
				$.fn.Slides.start(id);
			});
		});
	};

	$.fn.Slides.defaults = {
		wait : 0,
		pause : 6000,
		fade : 1000
	};

	$.fn.Slides.init = function (target, settings, callback) {

		if (typeof settings.images === 'undefined')
			throw Error('Image array is not optional must be passed in the call $("#id").Slides({images : ["img1.jpg", "img2.jpg"]})');
			
		if (typeof settings.urls != 'undefined' && (settings.urls.length != settings.images.length))
			throw Error('Urls length must match images length');
		
		if (typeof settings.functions != 'undefined' && (settings.functions.length != settings.images.length))
			throw Error('Functions length must match images length');

		settings = $.extend(settings, {
			main : $(target),
			pipes : {urls : [], functions : []},
			initialized : false
		});
		
		var initWrapper = function () {
			settings.toggle = settings.main.wrap('<span></span>')
					.parent()
					.css({
							display : 'block',
							overflow : 'hidden',
							height : settings.main.height() + 'px',
							width : settings.main.width() + 'px'
					});
			$.fn.Slides.preloadNextImage(settings);
			settings.initialized = true;
		};
		
		settings.main.load(function () {
			if (settings.initialized)
				return;
			initWrapper();
			callback();
		});

		if (settings.main[0].complete && !settings.initialized) {
			initWrapper();
			callback();
		}
	};

	$.fn.Slides.preloadNextImage = function (settings) {
		var nextImage = $.fn.Slides.getNextImage(settings);
		var image = new Image();
		image.src = nextImage;
		settings.nextImage = image;
	};

	$.fn.Slides.getNextImage = function (settings) {
		var nextImage = settings.images.shift();
		settings.images.push(nextImage);

		if (settings.urls) {
		    var url = settings.urls.shift();
		    settings.urls.push(url);
		    settings.pipes.urls.push(url);
		}
		
		if (settings.functions) {
		    var func = settings.functions.shift();
		    settings.functions.push(func);
		    settings.pipes.functions.push(func);
		}
		
		return nextImage;
	};

	$.fn.Slides.start = function (id) {
		setTimeout(function () {
			$.fn.Slides.execute(id);
		}, settings[id].wait);	
	};

	$.fn.Slides.execute = function (id) {

		var _settings = settings[id];
		_settings.isToggle = false;

		setInterval(function () {
			
			if (_settings.isToggle) {
				_settings.main.attr('src', _settings.nextImage.src).animate({opacity : 1}, _settings.fade);
				_settings.isToggle = false;
			} else {
				_settings.toggle.css({background : 'transparent url(' + _settings.nextImage.src + ') left top no-repeat'});
				_settings.main.animate({opacity : 0}, _settings.fade);
				_settings.isToggle = true;
			}
			
			if (_settings.pipes.urls.length > 0) {
                _settings.main.click(function () {
					window.location.href = _settings.pipes.urls.shift();					
				});
			}
			
            if (_settings.pipes.functions.length > 0)
                _settings.pipes.functions.shift()();
				
			$.fn.Slides.preloadNextImage(_settings);
			
		}, _settings.pause);
	};

})(jQuery);
