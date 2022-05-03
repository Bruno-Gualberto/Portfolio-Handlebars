(function() {
    var kitties = document.querySelectorAll('#kitties img');
    var dots = document.querySelectorAll('.dot');

    var isTransitioning = false;
    var currKitty = 0;
    var timer;

    for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', function(e) {
            var dotIdx = +e.target.id.slice(3);

        if (isTransitioning || dotIdx === currKitty) {
            return;
        } 

        dots[dotIdx].classList.add('on');
        clearTimeout(timer);
        moveKitties(dotIdx);
        });
    }

    function moveKitties(dotIndex) {
        kitties[currKitty].classList.remove('onscreen');
        dots[currKitty].classList.remove('on');
        kitties[currKitty].classList.add('exit-left');
        
        currKitty++;

        if (dotIndex != undefined) {
            currKitty = dotIndex;
        }
        
        if (currKitty >= kitties.length) {
            currKitty = 0;
        }

        kitties[currKitty].classList.add("onscreen");
        dots[currKitty].classList.add('on');
        isTransitioning = true;

        timer = setTimeout(moveKitties, 5000);
    }

    timer = setTimeout(moveKitties, 1000);

    document.addEventListener('transitionend', function(e) {
        if (e.target.classList.contains('exit-left')) {
            e.target.classList.remove('exit-left');
            isTransitioning = false;
        }
    })
})();