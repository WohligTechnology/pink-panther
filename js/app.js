// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice',
    'angular-loading-bar'
]);

firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider) {

    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "views/template-home.html",
            controller: 'HomeCtrl'
        })

    .state('players', {
        url: "/players",
        templateUrl: "views/template.html",
        controller: 'PlayersCtrl'
    })

    .state('wallpapper', {
        url: "/wallpaper",
        templateUrl: "views/template.html",
        controller: 'WallpapperCtrl'
    })

    .state('gallery-inner', {
        url: "/gallery-inner/:id",
        templateUrl: "views/template.html",
        controller: 'GalleryInnerCtrl'
    })

    .state('wallpapper-inner', {
        url: "/wallpaper-inner/:id",
        templateUrl: "views/template.html",
        controller: 'WallpapperInnerCtrl'
    })

    .state('gallery', {
        url: "/gallery",
        templateUrl: "views/template.html",
        controller: 'GalleryCtrl'
    })

    .state('fixtures', {
        url: "/fixtures",
        templateUrl: "views/template.html",
        controller: 'FixturesCtrl'
    })

    .state('news-media', {
        url: "/news-media",
        templateUrl: "views/template.html",
        controller: 'NewsMediaCtrl'
    })

    .state('news-detail', {
        url: "/news-detail",
        templateUrl: "views/template.html",
        controller: 'NewsDetailCtrl'
    })

    .state('ticket-merchandize', {
        url: "/ticket-merchandize",
        templateUrl: "views/template.html",
        controller: 'TicketMerchandizeCtrl'
    })

    .state('about-us', {
        url: "/about-us",
        templateUrl: "views/template.html",
        controller: 'AboutUsCtrl'
    });

    $urlRouterProvider.otherwise("/home");

});
firstapp.directive('fancyboxThumb', function() {
    return {
        restrict: 'C',
        replace: false,
        link: function($scope, element, attrs) {
            $('.fancybox-thumb').fancybox({
                prevEffect: 'none',
                nextEffect: 'none',
                helpers: {
                    title: {
                        type: 'outside'
                    },
                    thumbs: {
                        width: 70,
                        height: 70
                    }
                }
            });

        }
    };
});
firstapp.directive('img', function($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            if (!attrs.noloading) {
                $element.after("<img src='img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function() {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            } else {
                $($element).addClass("doneLoading");
            }
        }
    };
});
firstapp.filter('serverimage', function() {
    return function(input) {
        if (input) {
            return imgurl + input;
        } else {
            return "";
        }
    };
});
firstapp.directive('autoHeight', function($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            var windowHeight = $(window).height();
            var addHeight = function() {
                $element.css("min-height", windowHeight);
            };
            addHeight();
        }
    };
});

firstapp.directive('childHeight', function($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            var parentHeight = $('.parent-height').height();
            var addHeight = function() {
                $element.css("height", parentHeight);
            };
            addHeight();
        }
    };
});
firstapp.filter('cut', function() {
    return function(value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }
        return value + (tail || ' …');
    };
});
firstapp.directive('mycircle', function ($compile, $parse) {
   return {
       restrict: 'EA',
       replace: false,
       link: function ($scope, element, attrs) {
           var $element = $(element);
           var amount = 1;
           var myinterval = {};
           $element.ready(function () {
               console.log("DEMO");

               $element.hover(function () {
                   clearInterval(myinterval);
               }, function () {


                   myinterval = setInterval(function () {
                       var $element = $(element);
                       var $elementli = $element.children("li");
                       $abc = $elementli;



                       amount++;
                       var elewidth = $elementli.eq(0).width();
                       //                        console.log(elewidth);
                       var num = amount % elewidth;
                       if (num == 0 && amount > 0) {
                           amount = -15;
                           //                            console.log(amount);
                           var $firstelement = $elementli.eq(0);
                           $element.append("<li>" + $firstelement.html() + "</li>");
                           $firstelement.eq(0).remove();
                       }



                       for (var i = 0; i < $elementli.length; i++) {
                           $elementli.eq(i).css("transform", "translateX(" + (-1 * amount) + "px)");
                           $elementli.eq(i).css("-webkit-transform", "translateX(" + (-1 * amount) + "px)");
                           $elementli.eq(i).css("-moz-transform", "translateX(" + (-1 * amount) + "px)");
                           $elementli.eq(i).css("-ms-transform", "translateX(" + (-1 * amount) + "px)");
                           $elementli.eq(i).css("-o-transform", "translateX(" + (-1 * amount) + "px)");
                       }

                   }, 10);

               });

               $element.trigger("mouseleave");


           });

       }
   };
});
firstapp.directive('fancybox', function ($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function ($scope, element, attrs) {
            $element = $(element);
            console.log("Checking Fancybox");
            setTimeout(function () {
                $(".various").fancybox({
                    maxWidth: 800,
                    maxHeight: 600,
                    fitToView: false,
                    width: '70%',
                    height: '70%',
                    autoSize: false,
                    closeClick: false,
                    openEffect: 'none',
                    closeEffect: 'none'
                });
            }, 100);
        }
    };
});
firstapp.directive("scroll", function($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            var windowHeight = $(window).height();
            if (windowHeight > 600) {
                //$('#boutique').boutique();
            }
            if (this.pageYOffset >= windowHeight) {
                console.log(windowHeight);
                element.addClass('affix');
            } else {
                element.removeClass('affix');
            }
        });
    };
});
