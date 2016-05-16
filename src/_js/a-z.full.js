$(document).ready(function() {
    (function(e, t, n, r, i, s, o) {
        e["GoogleAnalyticsObject"] = i;
        e[i] = e[i] || function() {
            (e[i].q = e[i].q || []).push(arguments)
        }, e[i].l = 1 * new Date;
        s = t.createElement(n), o = t.getElementsByTagName(n)[0];
        s.async = 1;
        s.src = r;
        o.parentNode.insertBefore(s, o)
    })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
    ga("create", "UA-27189539-1");
    if (typeof dimension1 !== "undefined") {
        ga("set", "metric1", dimension1);
        ga("set", "dimension1", dimension1)
    }
    ga("send", "pageview")
})
$(document).ready(function() {
    var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
    if (mobile) {
        var path = window.location.pathname;
        var ploc = path.indexOf("article/");
        var mobileSite = "http://m.army.mil";
        if (ploc != -1) {
            var path_pid = path.split("article/");
            path_pid = path_pid[1].split("/");
            var pid = path_pid[0];
            $('body').prepend("<a class='mobileAd' href='" + mobileSite + "/article/" + pid + "'><div class='mobileAdMain'>View Mobile Version!</div></a>");
        } else {
            if (path == "/") {
                $('body').prepend("<a class='mobileAd' href='" + mobileSite + "'><div class='mobileAdMain'>View Mobile Site!</div></a>");
            }
        }
    }
});
$(document).ready(function() {
    $(".armyBox").live("click", function() {
        function parseQuery(query) {
            var Params = {};
            if (!query) {
                return Params;
            }
            var Pairs = query.split(/[;&]/);
            for (var i = 0; i < Pairs.length; i++) {
                var KeyVal = Pairs[i].split('=');
                if (!KeyVal || KeyVal.length != 2) {
                    continue;
                }
                var key = unescape(KeyVal[0]);
                var val = unescape(KeyVal[1]);
                val = val.replace(/\+/g, ' ');
                Params[key] = val;
            }
            return Params;
        }

        function position() {
            popup.css({
                marginLeft: '-' + parseInt((popupW / 2), 10) + 'px',
                width: popupW + 'px'
            });
            if (!(jQuery.browser.msie && jQuery.browser.version < 7)) {
                popup.css({
                    marginTop: '-' + parseInt((popupH / 2), 10) + 'px'
                });
            }
        }
        if (typeof document.body.style.maxHeight === "undefined") {
            $("body", "html").css({
                height: "100%",
                width: "100%"
            });
            $("html").css("overflow", "hidden");
            $("select").hide();
        }
        if (document.getElementById("overlay") === null) {
            $("body").append("<div id='overlay'></div><div id='popup'></div>");
        }
        var overlay = $("#overlay");
        var popup = $("#popup");
        var url;
        url = $(this).attr("href");
        if (typeof(url) === "undefined") {
            url = $(this).attr("value");
        }
        var queryString = url.replace(/^[^\?]+\??/, '');
        var params = parseQuery(queryString);
        var popupW = (params['width'] * 1) || 668;
        var popupH = (params['height'] * 1) || 600;
        var current = (params['curr']) || 999;
        position();
        if (document.getElementById("ajaxContent") != null) {
            $.ajax({
                url: url,
                cache: false,
                success: function(html) {
                    $("#ajaxContent").html(html);
                    popup.fadeIn(300);
                    if (window.init) {
                        init();
                    }
                }
            });
        } else {
            popup.append("<a href='' id='closeWindowButton'><span class='hide'>close</span></a><div id='ajaxContent' style='width:" + popupW + "px;height:" + popupH + "px'></div>");
            $("#closeWindowButton").css({
                "position": "relative",
                "left": popupW - 30
            });
            $.ajax({
                url: url,
                cache: false,
                success: function(html) {
                    $("#ajaxContent").html(html);
                    popup.fadeIn(300);
                    if (window.init && current != 999) {
                        init(current);
                    }
                }
            });
        }
        return false;
    });
    $("#closeWindowButton").live("click", function() {
        var overlay = $("#overlay");
        var popup = $("#popup");
        popup.fadeOut(300, function() {
            popup.unbind().remove();
            overlay.unbind().remove();
        });
        if (typeof document.body.style.maxHeight == "undefined") {
            $("body", "html").css({
                height: "auto",
                width: "auto"
            });
            $("html").css("overflow", "");
            $("select").show();
        }
        return false;
    });
});
$(document).ready(function() {
    $("body").append('<div id="overlays"><div id="overlayAll"></div></div>');
    var overlays = $("#overlays");
    var borderWidth = 6;
    var counter = 0;

    function setOverlays() {
        var container = $("#pageManagementCol #container");
        var cPos = container.offset();
        var cHeight = container.height();
        var cWidth = container.width();
        $("#overlayAll").css({
            "position": "absolute",
            "top": cPos.top,
            "left": cPos.left,
            "height": cHeight,
            "width": cWidth,
            "z-index": 1200
        });
        $(".widgetBox").each(function() {
            var pos = $(this).offset();
            var height = $(this).height();
            var width = $(this).width();
            var sectionID = $(this).attr('value');
            if (counter == 0) {
                overlays.append('<div id="overlay_' + sectionID + '"><a class="armyBox" href="/webpages/manage_page/?asset=' + $(this).attr('name') + '&aid=' + sectionID + '"></a><span class="overlayFill"></span><span class="overlayEffects"></span><span class="widgetEditIcon"></span></div>');
            }
            $("#overlay_" + sectionID + ", #overlay_" + sectionID + " a, #overlay_" + sectionID + " .overlayFill, #overlay_" + sectionID + " .overlayEffects").css({
                "position": "absolute",
                "height": height - borderWidth,
                "width": width - borderWidth
            });
            $("#overlay_" + sectionID).css({
                "top": pos.top,
                "left": pos.left,
                "z-index": 1201
            }).addClass("overlay");
            $("#overlay_" + sectionID + " a").css({
                "top": 0,
                "left": 0,
                "z-index": 1299
            });
            $("#overlay_" + sectionID + " .overlayFill").css({
                "top": 0,
                "left": 0,
                "z-index": 1202
            });
            $("#overlay_" + sectionID + " .overlayEffects").css({
                "top": 0,
                "left": 0,
                "z-index": 1203
            });
        });
        counter = 1;
    }
    $(window).resize(function() {
        setOverlays();
    });
    $(window).load(function() {
        setOverlays();
    });
    $(".overlay a").live("mouseover", function() {
        $(this).parent().addClass("hover");
    });
    $(".overlay a").live("mouseout", function() {
        $(this).parent().removeClass("hover");
    });
});
(function($) {
    $.extend($.fn, {
        livequery: function(type, fn, fn2) {
            var self = this,
                q;
            if ($.isFunction(type))
                fn2 = fn, fn = type, type = undefined;
            $.each($.livequery.queries, function(i, query) {
                if (self.selector == query.selector && self.context == query.context && type == query.type && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid))
                    return (q = query) && false;
            });
            q = q || new $.livequery(this.selector, this.context, type, fn, fn2);
            q.stopped = false;
            q.run();
            return this;
        },
        expire: function(type, fn, fn2) {
            var self = this;
            if ($.isFunction(type))
                fn2 = fn, fn = type, type = undefined;
            $.each($.livequery.queries, function(i, query) {
                if (self.selector == query.selector && self.context == query.context && (!type || type == query.type) && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid) && !this.stopped)
                    $.livequery.stop(query.id);
            });
            return this;
        }
    });
    $.livequery = function(selector, context, type, fn, fn2) {
        this.selector = selector;
        this.context = context || document;
        this.type = type;
        this.fn = fn;
        this.fn2 = fn2;
        this.elements = [];
        this.stopped = false;
        this.id = $.livequery.queries.push(this) - 1;
        fn.$lqguid = fn.$lqguid || $.livequery.guid++;
        if (fn2) fn2.$lqguid = fn2.$lqguid || $.livequery.guid++;
        return this;
    };
    $.livequery.prototype = {
        stop: function() {
            var query = this;
            if (this.type)
                this.elements.unbind(this.type, this.fn);
            else if (this.fn2)
                this.elements.each(function(i, el) {
                    query.fn2.apply(el);
                });
            this.elements = [];
            this.stopped = true;
        },
        run: function() {
            if (this.stopped) return;
            var query = this;
            var oEls = this.elements,
                els = $(this.selector, this.context),
                nEls = els.not(oEls);
            this.elements = els;
            if (this.type) {
                nEls.bind(this.type, this.fn);
                if (oEls.length > 0)
                    $.each(oEls, function(i, el) {
                        if ($.inArray(el, els) < 0)
                            $.event.remove(el, query.type, query.fn);
                    });
            } else {
                nEls.each(function() {
                    query.fn.apply(this);
                });
                if (this.fn2 && oEls.length > 0)
                    $.each(oEls, function(i, el) {
                        if ($.inArray(el, els) < 0)
                            query.fn2.apply(el);
                    });
            }
        }
    };
    $.extend($.livequery, {
        guid: 0,
        queries: [],
        queue: [],
        running: false,
        timeout: null,
        checkQueue: function() {
            if ($.livequery.running && $.livequery.queue.length) {
                var length = $.livequery.queue.length;
                while (length--)
                    $.livequery.queries[$.livequery.queue.shift()].run();
            }
        },
        pause: function() {
            $.livequery.running = false;
        },
        play: function() {
            $.livequery.running = true;
            $.livequery.run();
        },
        registerPlugin: function() {
            $.each(arguments, function(i, n) {
                if (!$.fn[n]) return;
                var old = $.fn[n];
                $.fn[n] = function() {
                    var r = old.apply(this, arguments);
                    $.livequery.run();
                    return r;
                }
            });
        },
        run: function(id) {
            if (id != undefined) {
                if ($.inArray(id, $.livequery.queue) < 0)
                    $.livequery.queue.push(id);
            } else
                $.each($.livequery.queries, function(id) {
                    if ($.inArray(id, $.livequery.queue) < 0)
                        $.livequery.queue.push(id);
                });
            if ($.livequery.timeout) clearTimeout($.livequery.timeout);
            $.livequery.timeout = setTimeout($.livequery.checkQueue, 20);
        },
        stop: function(id) {
            if (id != undefined)
                $.livequery.queries[id].stop();
            else
                $.each($.livequery.queries, function(id) {
                    $.livequery.queries[id].stop();
                });
        }
    });
    $.livequery.registerPlugin('append', 'prepend', 'after', 'before', 'wrap', 'attr', 'removeAttr', 'addClass', 'removeClass', 'toggleClass', 'empty', 'remove');
    $(function() {
        $.livequery.play();
    });
    var init = $.prototype.init;
    $.prototype.init = function(a, c) {
        var r = init.apply(this, arguments);
        if (a && a.selector)
            r.context = a.context, r.selector = a.selector;
        if (typeof a == 'string')
            r.context = c || document, r.selector = a;
        return r;
    };
    $.prototype.init.prototype = $.prototype;
})(jQuery);
$(document).ready(function() {
    var focusCount = 0;
    $("#librarySearchField").livequery("focus", function() {
        if (focusCount == 0) {
            $(this).val("");
            $(this).css({
                "color": "#3d3d3d"
            });
            focusCount = 1;
        }
    });
    $(".deleteItem").live("click", function() {
        var li = $(this).parents("li");
        var value = li.attr("value");
        var filler = '\n';
        filler += '<li class="filler" value="' + value + '">\n';
        filler += ' <div class="itemOverlay"></div>\n';
        filler += ' <div class="boxLeft"></div>\n';
        filler += ' <div class="boxContent">\n';
        filler += ' <img src="http://www.army.mil/images/icon_star_100.png" height = "38px" width = "58px" alt="">\n';
        filler += ' <div class="boxText">\n';
        filler += '  <h5>Filler Content</h5>\n';
        filler += '  <h6><span class="author"></span></h6>\n';
        filler += ' </div>\n';
        filler += ' <a class="deleteItem" href=""><span class="hide">Delete Item</span></a>\n';
        filler += ' </div>\n';
        filler += ' <div class="boxRight"></div>\n';
        filler += '</li>\n';
        li.replaceWith(filler);
        runsortable();
        rundroppable();
        return false;
    });
    $("#librarySearch #searchIcon").live("click", function() {
        $("#librarySearch").submit();
    });

    function updateFeed(id) {
        $.ajax({
            type: "GET",
            url: "/webpages/load_feed_items/" + id + "/1/1/",
            success: function(msg) {
                $("#availableItems").empty().append(msg);
            },
            complete: function() {
                rundraggable();
                rundroppable();
            }
        });
        $.ajax({
            type: "GET",
            url: "/webpages/load_feed_list/" + id + "/",
            success: function(msg) {
                $("#pickFeedAndSectionSelection").replaceWith(msg);
            }
        });
    }

    function updateFeedAndSection(id, s_id, p) {
        $.ajax({
            type: "GET",
            url: "/webpages/load_feed_items/" + s_id + "/" + id + "/" + p + "/",
            success: function(msg) {
                $("#availableItems").empty().append(msg);
            },
            complete: function() {
                rundraggable();
                rundroppable();
            }
        });
    }

    function updateLibrary(p) {
        $.ajax({
            type: "GET",
            url: "/webpages/load_feed_library/" + p + "/",
            success: function(msg) {
                $("#libraryPag").empty().append(msg);
            },
            complete: function() {}
        });
    }
    $('#pickFeedSectionSelection').livequery("change", function() {
        var id = $(this).children("option:selected").attr("value");
        updateFeed(id);
        updateLibrary(1);
    });
    $('#pickFeedAndSectionSelection').livequery("change", function() {
        var s_id = $("#pickFeedSectionSelection").attr("value");
        var id = $(this).children("option:selected").attr("value");
        updateFeedAndSection(id, s_id, 1);
        updateLibrary(1);
    });
    $('#libraryNext.active').live("click", function() {
        var s_id = $("#pickFeedSectionSelection").attr("value");
        var id = $("#pickFeedAndSectionSelection").children("option:selected").attr("value");
        var p = $(this).attr("value");
        updateFeedAndSection(id, s_id, p);
        updateLibrary(p);
        return false;
    });
    $('#libraryPrev.active').live("click", function() {
        var s_id = $("#pickFeedSectionSelection").attr("value");
        var id = $("#pickFeedAndSectionSelection").children("option:selected").attr("value");
        var p = $(this).attr("value");
        updateFeedAndSection(id, s_id, p);
        updateLibrary(p);
        return false;
    });
});