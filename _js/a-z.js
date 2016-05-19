
    var ToTop = require('./globals/modules/ToTop'),
    bodyElem = document.getElementsByTagName('body')[0],
    docElem = document.documentElement;
    
    window.onscroll = function () {
        ToTop.showTopBtn(bodyElem.scrollTop || docElem.scrollTop);
    };