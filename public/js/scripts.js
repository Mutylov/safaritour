/*jshint esversion: 6 */

$(function() {
    $('.path').on('click', function(event) {
        event.preventDefault();

        const path = $(this);
        const id = path.data('modal');
        const modal = $('#' + id);

        $('.path:not([data-modal=' + id + '])').removeClass('path--active');
        $('.modal:not(#' + id + ')').fadeOut(200);

        modal.fadeToggle(200);
        path.toggleClass('path--active');

        $('.modal__close').on('click', function() {
            $(this)
                .parents('.modal')
                .fadeOut(200);
            path.toggleClass('path--active');
        });
    });

    $('#inner__toggle').on('click', function(event) {
        event.preventDefault();

        $('#header').toggleClass('header--active');

        $('#inner__nav').slideToggle(400);
    });

    $('#subscribe__mark').on('click', function(event) {
        event.preventDefault();

        const block = $(this).parent();
        const right = block.css('right');

        if (right == '1px') {
            block.css({ right: -273 });
        } else if (right == '-273px') {
            block.css({ right: 1 });
        }
    });

    $('.tabs__items .tabs__link')
        .each(function() {
            const el = $(this);
            const isActive = el.hasClass('tabs__link--active');
            const innerId = el.data('inner');

            if (isActive) {
                $('#' + innerId).show();
            }
        })
        .on('click', function(event) {
            event.preventDefault();

            const el = $(this);
            const isActive = el.hasClass('tabs__link--active');

            if (isActive) {
                return true;
            }

            const innerId = el.data('inner');

            $('.tabs__link--active').removeClass('tabs__link--active');
            $('.inner__content').hide();

            el.addClass('tabs__link--active');

            $('#' + innerId).show();
        });
});
