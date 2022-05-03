(function() {
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll('script[type="text/x-handlebars-template"]');

    Array.prototype.slice.call(templates).forEach(function (script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });

    var baseUrl = "https://spicedify.herokuapp.com/spotify";
    var hasInfiniteScroll = location.search.includes('scroll=infinite');

    function generateNextUrl(next) {
        var nextUrl = next && next.replace("https://api.spotify.com/v1/search", baseUrl);
        return nextUrl;
    }

    function generateHtml(response) {
        var defaultImg = "https://www.tibs.org.tw/images/default.jpg";

        for (var i = 0; i < response.items.length; i++) {
            response.items[i].images.push({url: defaultImg})
        }

        return Handlebars.templates.results(response);
    }

    function infiniteCheck() {
        var pageHeight = $(document).height();
        var windowHeight = $(window).height();
        var scrollTop = $(document).scrollTop();

        if(pageHeight >= windowHeight + scrollTop + 200) {
            setTimeout(function () {
                infiniteCheck();
            }, 1500);
        } else {
            $.ajax({
                url: nextUrl,
                method: "GET",
                success: function (response) {
                    response = response.artists || response.albums;

                    var html = generateHtml(response);
                    $(".results-container").append(html);

                    nextUrl = generateNextUrl(response.next);

                    infiniteCheck();
                },
            });
        }

    }

    $('.submit-button').on('click', function() {
        var userInput = $('input').val();
        var artistOrAlbum = $('select').val();

        $.ajax({
            url: "https://spicedify.herokuapp.com/spotify",
            data: {
                query: userInput,
                type: artistOrAlbum
            },
            success: function(response) {
                response = response.artists || response.albums;

                var html = generateHtml(response);
                !response.items.length ? $(".results-container").html("No results found ☹️") : $(".results-container").html(html);

                nextUrl = generateNextUrl(response.next);

                if (nextUrl && !hasInfiniteScroll) {
                    $(".more-button").removeClass("hidden") ;
                } else {
                    $(".more-button").addClass("hidden");
                    infiniteCheck();
                }
            }
        });
    });

    $(".more-button").on("click", function () {
        $.ajax({
            url: nextUrl,
            method: 'GET',
            success: function (response) {
                response = response.artists || response.albums;

                var html = generateHtml(response);
                $('.results-container').append(html);

                nextUrl = generateNextUrl(response.next);
                !nextUrl ? $(".more-button").addClass("hidden") : $(".more-button").removeClass("hidden");
            },
        });
    });
})();