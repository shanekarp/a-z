/*global window, document, Showdown, require*/

var Helper = require('Helper');

(function() {
    var bodyElem = document.getElementsByTagName('body')[0],
        docElem = document.documentElement;

    function showTopBtn(scrolledAmt) {
        var topBtn = document.getElementsByClassName('to-top')[0];

        if (scrolledAmt >= 750) {
            Helper.addClass(topBtn, 'visible');
        } else {
            Helper.removeClass(topBtn, 'visible');
        }
    }

    window.onscroll = function() {
        showTopBtn(bodyElem.scrollTop || docElem.scrollTop);
    };
}());
