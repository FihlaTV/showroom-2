/**
 * Galleria Showroom Theme 2014-05-26
 * http://galleria.io
 *
 * Licensed under the MIT license
 * https://raw.github.com/bluesparklabs/showroom/master/LICENSE
 *
 */

(function($) {

/*global window, jQuery, Galleria */

Galleria.addTheme({
    name: 'showroom',
    author: 'Galleria',
    css: 'galleria.showroom.css',
    defaults: {
        initialTransition: 'fade',
        transition: 'slide',
        thumbCrop:  'height',

        // Set this to false if you want to show the caption all the time:
        _toggleInfo: true
    },
    init: function(options) {

        Galleria.requires(1.33, 'This version of the showroom theme requires Galleria 1.3.3 or later');

        // Add the caption info button and caption box close button elements.
        this.addElement('info-link','info-close');
        this.append({
            'info' : ['info-link','info-close']
        });

        // Place the info caption inside the stage area.
        this.append({'stage': 'info'});

        // Place the info caption inside the stage area.
        this.append({'container': 'image-nav'});

        // Cache some stuff
        var info = this.$('info-link,info-close,info-text'),
            touch = Galleria.TOUCH;

        // Show loader & counter with opacity
        this.$('loader,counter').show().css('opacity', 0.4);

        // Some stuff for non-touch browsers.
        if (! touch ) {
            //this.addIdleState( this.get('image-nav-left'), { left:-50 });
            //this.addIdleState( this.get('image-nav-right'), { right:-50 });
            this.addIdleState( this.get('counter'), { opacity:0 });
        }

        // Toggle functionality for info button.
        if ( options._toggleInfo === true ) {
            info.bind( 'click:fast', function() {
                info.toggle();
            });
        } else {
            info.show();
            this.$('info-link, info-close').hide();
        }

        // Bind some stuff.
        this.bind('thumbnail', function(e) {

            if (! touch ) {
                // Fade thumbnails.
                $(e.thumbTarget).css('opacity', 0.6).parent().hover(function() {
                    $(this).not('.active').children().stop().fadeTo(100, 1);
                }, function() {
                    $(this).not('.active').children().stop().fadeTo(400, 0.6);
                });

                if ( e.index === this.getIndex() ) {
                    $(e.thumbTarget).css('opacity',1);
                }
            } else {
                $(e.thumbTarget).css('opacity', this.getIndex() ? 1 : 0.6).bind('click:fast', function() {
                    $(this).css( 'opacity', 1 ).parent().siblings().children().css('opacity', 0.6);
                });
            }
        });

        var activate = function(e) {
            $(e.thumbTarget).css('opacity',1).parent().siblings().children().css('opacity', 0.6);
        };

        this.bind('loadstart', function(e) {
            if (!e.cached) {
                this.$('loader').show().fadeTo(200, 0.4);
            }
            window.setTimeout(function() {
                activate(e);
            }, touch ? 300 : 0);
            this.$('info').toggle( this.hasInfo() );
        });

        this.bind('loadfinish', function(e) {
            this.$('loader').fadeOut(200);
        });
    }
});

}(jQuery));