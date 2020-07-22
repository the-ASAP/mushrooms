"use strict";var _this=void 0,contentFadeInOnReady=function(){$(".preloader").fadeOut(150,function(){$(".preloader").remove()})},bindModalListeners=function(e){e.forEach(function(e){var t=$(e.trigger),o=$(e.modal);t.on("click",function(){stopScroll("body"),o.addClass("active")}),o.on("click",function(e){$(e.target).hasClass("modal")&&($(this).removeClass("active"),$("body").attr("style",""))}),o.find(".modal__close").on("click",function(){o.closest(".modal").removeClass("active"),$("body").attr("style","")})})},modalOpen=function(e,t){$(e).on("click",function(){stopScroll("body"),$(t).addClass("active")})},modalClose=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:".modal__close",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:".modal";$(e).on("click",function(){$(_this).closest(t).removeClass("active"),$("body").attr("style","")})},closeOnEscape=function(){$(document).keydown(function(e){return 27===e.keyCode?($(".modal").removeClass("active"),$("body").attr("style",""),!1):void 0})},stopScroll=function(e){var t=parseInt(document.documentElement.clientWidth),o=parseInt(window.innerWidth),n=o-t;$(e).attr("style","overflow: hidden; padding-right: "+n+"px")},freeScroll=function(e){$(e).attr("style","")},initAOS=function(){AOS.init({disable:!1,startEvent:"DOMContentLoaded",initClassName:"aos-init",animatedClassName:"aos-animate",useClassNames:!1,disableMutationObserver:!1,debounceDelay:50,throttleDelay:99,offset:120,delay:0,duration:600,easing:"ease",once:!0,mirror:!1,anchorPlacement:"top-bottom"})},createNav=function(e){return{prevNav:'<svg class="nav-arrow nav-arrow--'.concat(e,' nav-arrow--prev" width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <circle cx="48" cy="48" r="47" stroke="#5C8741" stroke-width="2"/>\n                    <path d="M39.2929 47.2929C38.9024 47.6834 38.9024 48.3166 39.2929 48.7071L45.6569 55.0711C46.0474 55.4616 46.6805 55.4616 47.0711 55.0711C47.4616 54.6805 47.4616 54.0474 47.0711 53.6569L41.4142 48L47.0711 42.3431C47.4616 41.9526 47.4616 41.3195 47.0711 40.9289C46.6805 40.5384 46.0474 40.5384 45.6569 40.9289L39.2929 47.2929ZM56 47H40V49H56V47Z" fill="#5C8741"/>\n                </svg>'),nextNav:'<svg class="nav-arrow nav-arrow--'.concat(e,' nav-arrow--next" width="97" height="96" viewBox="0 0 97 96" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <circle cx="48.0195" cy="48" r="47" stroke="#5C8741" stroke-width="2"/>\n                    <path d="M56.7071 48.7071C57.0976 48.3166 57.0976 47.6834 56.7071 47.2929L50.3431 40.9289C49.9526 40.5384 49.3195 40.5384 48.9289 40.9289C48.5384 41.3195 48.5384 41.9526 48.9289 42.3431L54.5858 48L48.9289 53.6569C48.5384 54.0474 48.5384 54.6805 48.9289 55.0711C49.3195 55.4616 49.9526 55.4616 50.3431 55.0711L56.7071 48.7071ZM40 49L56 49L56 47L40 47L40 49Z" fill="#5C8741"/>\n                </svg>')}};$().ready(function(){function e(){$(".menu").addClass("active"),stopScroll("body")}function t(){$(".menu").removeClass("active"),$("body").attr("style","")}function o(e){e.split(",");$("#map").html(""),ymaps.ready(function(){var t=new ymaps.Map("map",{center:e.split(","),zoom:18,controls:[]},{searchControlProvider:"yandex#search"}),o=new ymaps.Placemark(e.split(","),{},{iconColor:"#d32f2f"});t.geoObjects.add(o),t.container.fitToViewport()})}contentFadeInOnReady(),modalClose();var n=function(){function e(){o=new THREE.Scene,n=new THREE.PerspectiveCamera(40,$(".eco__model").width()/$(".eco__model").height(),1,5e3),n.rotation.y=.25*Math.PI,n.position.x=1e3,n.position.y=400,n.position.z=1e3,i=new THREE.AmbientLight(11776947,100),o.add(i);var e=new THREE.DirectionalLight(7566195,50);e.position.set(0,1,0),e.castShadow=!0;var s=new THREE.PointLight(11838612,5);s.position.set(-500,300,0),o.add(s);var c=new THREE.PointLight(11838612,7);c.position.set(0,0,6e3),o.add(c),a=new THREE.WebGLRenderer({antialias:!0,alpha:!0}),a.setSize(window.innerWidth,window.innerHeight),a.setClearColor(0,0),document.querySelector(".eco__model").appendChild(a.domElement);var l=new THREE.GLTFLoader;l.load("../vendors/js/mushroom.glb",function(e){r=e.scene.children[0],r.scale.set(180,180,180),o.add(e.scene),t()})}function t(){requestAnimationFrame(t),r.rotation.z+=.002,a.render(o,n)}var o,n,a,i,r=null;e()};n(),initAOS();var a=500;$(window).on("scroll",function(){$(window).scrollTop()>$(".eco__item:eq(1)").offset().top-a&&$(".eco__table-container").addClass("second"),$(window).scrollTop()>$(".eco__item:eq(2)").offset().top-a&&$(".eco__table-container").addClass("third")}),$(".production__slider").owlCarousel({items:3,navText:[createNav("production").prevNav,createNav("production").nextNav],navContainer:$(".production__nav"),loop:!1,margin:40,nav:!0,dots:!1}),$(".recipes__slider").owlCarousel({items:3,navText:[createNav("recipes").prevNav,createNav("recipes").nextNav],navContainer:$(".recipes__nav"),loop:!1,margin:40,nav:!0,dots:!1}),$(".menu__product").on("mouseenter",function(){$(this).siblings().removeClass("active"),$(this).addClass("active"),$(".menu__products-pic").css("background-image","url(".concat($(this).attr("data-pic"),")"))}),$(".header__burger").on("click",function(){e()}),$(".menu__close").on("click",function(){t()}),bindModalListeners([{trigger:".shops__map",modal:".modal--map"}]),$(".shops__map").on("click",function(){o($(this).attr("data-coords"))})});