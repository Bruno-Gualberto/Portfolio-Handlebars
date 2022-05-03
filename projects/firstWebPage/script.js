var menu = document.getElementById("menu");
var overlay = document.getElementById("overlay");
var sideNav = document.getElementById("side-nav");
var x = document.querySelector("#side-nav span");

var jQmodal = $("#modal-container");
var jQcloseModal = $("#close-modal");

function removeClass() {
    overlay.classList.remove("show");
    sideNav.classList.remove("show");
}

menu.addEventListener("click", function() {
    overlay.classList.add("show");
    sideNav.classList.add("show");
});

overlay.addEventListener("click", removeClass);
x.addEventListener("click", removeClass);

setTimeout(function() {
    jQmodal.css({
        display: "flex"
    });
    jQmodal.show();
    overlay.classList.add("show");
}, 1000);


jQcloseModal.on("click", function() {
    jQmodal.hide();
    overlay.classList.remove("show");
});