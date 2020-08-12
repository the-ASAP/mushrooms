let isDesktop, isTablet, isMobile = false;
let animationsArray = [];
let pageName = '';

// удаляем прелодер при загрузке страницы
const contentFadeInOnReady = () => {
    $('.preloader').fadeOut(150, () => {
        $('.preloader').remove();
    });
};

// Открытие и закрытие модальных окон
const bindModalListeners = modalArr => {
    modalArr.forEach(obj => {

        let jQTrigger = $(obj.trigger);
        let jQModal = $(obj.modal);

        jQTrigger.on('click', function(e) {
            e.preventDefault();
            $('.modal').removeClass('active');

            stopScroll('body');
            jQModal.addClass('active');

        });

        jQModal.on('click', function(e) {
            if ($(e.target).hasClass('modal')) {
                $(this).removeClass('active');
                freeScroll();
            }
        });

        jQModal.find('.modal__close').on('click', function() {
            jQModal.removeClass('active');
            freeScroll();
        });

        $(document).keydown((e) => {
            if (e.keyCode === 27) {
                $('.modal').removeClass('active');
                freeScroll();
                return false;
            }
        });
    });
}

// BEGIN не лезь, оно тебя сожрёт
function setDeviceType() {
    (function setIsDesktop() {
        isDesktop = $(window).width() > 1024;
    })();

    (function setIsTablet() {
        isTablet = $(window).width() <= 1024 && $(window).width() >= 768;
    })();

    (function setIsMobile() {
        isMobile = $(window).width() < 768;
    })();
}

function setPageName() {
    pageName = $('template').html().toString().trim();
}

function initAnimationsArray(elems) {
    //добавление data-атрибута с задержкой анимации (не трож)
    addDataDelayAttr(elems);
    triggerSwipeDownAnimation(elems);

    $(window).on('scroll', function() {
        // обработчик срабатывания анимации на элементах из массива elems (не трож)
        triggerSwipeDownAnimation(elems);
    });
}

function addDataDelayAttr(elems) {
    elems.forEach(elem => {
        if ($(elem).length > 0) {
            $(elem).each((i, item) => {
                $(item).attr('data-delay', i * 100);
            });
        }
    })
}

function triggerSwipeDownAnimation(elems, offset = 1000) {
    elems.forEach(elem => {
        if ($(elem).length > 0) {
            if ($(window).scrollTop() > ($(elem).offset().top - offset)) {
                $(elem).each((i, item) => {
                    setTimeout(() => {
                        $(item).addClass('animated');
                    }, $(item).attr('data-delay'))
                });
            }
        }
    });
}

function isIE() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    } else if (navigator.appName == 'Netscape') {
        var ua = navigator.userAgent;
        var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv === -1 ? false : true;
}

function initModel(model, width = window.innerWidth, height = window.innerWidth) {
    let scene, camera, renderer, hLight, mushroom = null;

    function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(40, $(model).width() / $(model).height(), 1, 5000);
        camera.rotation.y = 45 / 180 * Math.PI;
        camera.position.x = 1000;
        camera.position.y = 400;
        camera.position.z = 1000;


        hLight = new THREE.AmbientLight(0xB3B3B3, 100);
        scene.add(hLight);

        let directionalLight = new THREE.DirectionalLight(0x737373, 50);
        directionalLight.position.set(0, 1, 0);
        directionalLight.castShadow = true;
        // scene.add(directionalLight);

        // let light = new THREE.PointLight(0xDFDAD1, 5);
        // light.position.set(0, 300, 500);
        // scene.add(light);

        // let light2 = new THREE.PointLight(0xDFDAD1, 5);
        // light2.position.set(500, 100, 0);
        // scene.add(light2);

        // let light3 = new THREE.PointLight(0xB4A494, 5);
        // light3.position.set(0, 100, -500);
        // scene.add(light3);

        let light4 = new THREE.PointLight(0xB4A494, 5);
        light4.position.set(-500, 300, 0);
        scene.add(light4);


        let light5 = new THREE.PointLight(0xB4A494, 7);
        light5.position.set(0, 0, 6000);
        scene.add(light5);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        document.querySelector(model).appendChild(renderer.domElement);

        // var controls = new THREE.OrbitControls(camera, renderer.domElement);
        // controls.addEventListener('change', renderer);
        // controls.update();

        let loader = new THREE.GLTFLoader();
        loader.load('../vendors/js/mushroom.glb', function(gltf) {
            mushroom = gltf.scene.children[0];
            mushroom.scale.set(-180, 180, 180);


            scene.add(gltf.scene);
            animate();
        })
    }

    function animate() {
        requestAnimationFrame(animate);
        mushroom.rotation.z += 0.002;

        renderer.render(scene, camera);
    }

    init()
}

// END не лезь, оно тебя сожрёт

// отключение скролла (по умолчанию у всей страницы) 
function stopScroll(item = 'body') {
    let documentWidth = parseInt(document.documentElement.clientWidth),
        windowsWidth = parseInt(window.innerWidth),
        scrollbarWidth = windowsWidth - documentWidth;
    $(item).attr("style", 'overflow: hidden; padding-right: ' + scrollbarWidth + 'px');
}

// включение скролла (по умолчанию у всей страницы) 
function freeScroll(item = 'body') {
    $(item).attr("style", '');
}

// инициализация библиотеки анимации при скролле
function initAOS() {
    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 200, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 600, // values from 0 to 3000, with step 50ms
        easing: 'ease-out', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
}

// создание стрелочек в навигации
function createNav(className) {
    return {
        prevNav: `<svg class="nav-arrow nav-arrow--${className} nav-arrow--prev" width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="48" cy="48" r="47" stroke="#5C8741" stroke-width="2"/>
                    <path d="M39.2929 47.2929C38.9024 47.6834 38.9024 48.3166 39.2929 48.7071L45.6569 55.0711C46.0474 55.4616 46.6805 55.4616 47.0711 55.0711C47.4616 54.6805 47.4616 54.0474 47.0711 53.6569L41.4142 48L47.0711 42.3431C47.4616 41.9526 47.4616 41.3195 47.0711 40.9289C46.6805 40.5384 46.0474 40.5384 45.6569 40.9289L39.2929 47.2929ZM56 47H40V49H56V47Z" fill="#5C8741"/>
                </svg>`,

        nextNav: `<svg class="nav-arrow nav-arrow--${className} nav-arrow--next" width="97" height="96" viewBox="0 0 97 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="48.0195" cy="48" r="47" stroke="#5C8741" stroke-width="2"/>
                    <path d="M56.7071 48.7071C57.0976 48.3166 57.0976 47.6834 56.7071 47.2929L50.3431 40.9289C49.9526 40.5384 49.3195 40.5384 48.9289 40.9289C48.5384 41.3195 48.5384 41.9526 48.9289 42.3431L54.5858 48L48.9289 53.6569C48.5384 54.0474 48.5384 54.6805 48.9289 55.0711C49.3195 55.4616 49.9526 55.4616 50.3431 55.0711L56.7071 48.7071ZM40 49L56 49L56 47L40 47L40 49Z" fill="#5C8741"/>
                </svg>`
    }
}

function showMenu(className) {
    $(className).addClass('active');
    stopScroll();
}

function hideMenu(className) {
    $(className).removeClass('active');
    freeScroll();
}

// инициализация карты по переданным координатам
function initMap(coords, selector) {
    let coordsArr = coords.split(',');

    $(selector).html('');

    ymaps.ready(function() {
        var myMap = new ymaps.Map(`${selector.slice(1)}`, {
                center: coords.split(','),
                zoom: 18,
                controls: []
            }, {
                searchControlProvider: 'yandex#search'
            }),

            myPlacemark = new ymaps.Placemark(coords.split(','), {}, {
                iconColor: '#d32f2f'
            });

        myMap.geoObjects.add(myPlacemark);
        myMap.container.fitToViewport();
    });
}

function initCartMap() {
    if ($('#delivery-map').find('*').length === 0) {
        var myMap;
        var myPlacemark;
        var startPlacemark;
        ymaps.geolocation.get().then(function(res) {
            var mapContainer = $('#delivery-map'),
                bounds = res.geoObjects.get(0).properties.get('boundedBy'),
                // Рассчитываем видимую область для текущей положения пользователя.
                mapState = ymaps.util.bounds.getCenterAndZoom(
                    bounds,
                    [mapContainer.width(), mapContainer.height()]
                );
            createMap({
                center: res.geoObjects.position,
                zoom: 17,
            });
            startPlacemark = createPlacemark(res.geoObjects.position)
            myMap.geoObjects.add(startPlacemark);
        }, function(e) {
            // Если местоположение невозможно получить, то просто создаем карту.
            createMap({
                center: [51.533103, 46.034158],
                zoom: 17,
            });
        });

        function createMap(state) {
            myMap = new ymaps.Map('delivery-map', state);

            myMap.events.add('click', function(e) {
                var coords = e.get('coords');

                // Если метка уже создана – просто передвигаем ее.
                if (myPlacemark) {
                    myPlacemark.geometry.setCoordinates(coords);
                    myMap.geoObjects.remove(startPlacemark);
                }
                // Если нет – создаем.
                else {
                    myMap.geoObjects.remove(startPlacemark);
                    myPlacemark = createPlacemark(coords);
                    myMap.geoObjects.add(myPlacemark);
                    // Слушаем событие окончания перетаскивания на метке.
                    myPlacemark.events.add('dragend', function() {
                        getAddress(myPlacemark.geometry.getCoordinates());
                    });
                }

                myMap.container.fitToViewport();
                getAddress(coords);
            });
        }

        // Создание метки.
        function createPlacemark(coords) {
            return new ymaps.Placemark(coords, {}, {
                iconColor: '#d32f2f',
                draggable: true
            });
        }

        // Определяем адрес по координатам (обратное геокодирование).
        function getAddress(coords) {
            myPlacemark.properties.set('iconCaption', 'поиск...');
            ymaps.geocode(coords).then(function(res) {
                var firstGeoObject = res.geoObjects.get(0);

                myPlacemark.properties
                    .set({
                        // Формируем строку с данными об объекте.
                        iconCaption: [
                            // Название населенного пункта или вышестоящее административно-территориальное образование.
                            firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                        ].filter(Boolean).join(', '),
                        // В качестве контента балуна задаем строку с адресом объекта.
                        balloonContent: firstGeoObject.getAddressLine()

                    });
                $('.cart__offer-data-input--address').val(firstGeoObject.getAddressLine());
            });
        }
    }
}

// обрезка текста
function truncText(selector, len) {
    if ($(selector).length > 0) {
        $(selector).each(function(i, item) {
            let shortText = ''
            if ($(item).text().trim().length > len) {
                shortText = $(item).text().trim().substr(0, len - 1) + '…';
                $(item).text(shortText)
            }
        });
    }
}

// инициализация слайдера
function initSlider(selector, params = {}) {
    let defaultParams = {
        loop: false,
        dots: false,
        nav: true,
        lazyLoad: true,
        smartSpeed: 600,
    }
    if ($(selector).length > 0) {
        $(selector).owlCarousel({
            ...defaultParams,
            ...params,
        });
    }
}

// замена контента формы при успешной отправке формы в модалке на блок .success
function showSuccessModal(modalForm) {
    let modal = $(modalForm).closest('.modal');
    let modalContent = modal.find('.modal__content');

    let setSuccessStyles = (width, height) => {
        return {
            'height': height,
            'width': width,
            'display': 'flex',
            'flex-direction': 'column',
            'justify-content': 'center',
            'align-items': 'center'
        };
    }

    let modalContentHeight = `${modalContent.innerHeight()}px`;
    let modalContentWidth = `${modalContent.innerWidth()}px`;
    let btnWidth = `${modal.find('button[type="submit"]').innerWidth()}px`;

    modalContent.fadeOut(400, function() {
        modal.find('.success').css(setSuccessStyles(modalContentWidth, modalContentHeight));
        modal.find('.success__btn').css('width', btnWidth);
    });

    $(modal).on('click', function(e) {
        if ($(e.target).hasClass('modal')) {
            setTimeout(() => {
                modal.find('.success').css('display', 'none');
                modalContent.show();
            }, 500);
        }
    });

    $('.success__btn, .modal__close').on('click', function() {
        $(this).closest('.modal').removeClass('active');
        setTimeout(() => {
            modal.find('.success').css('display', 'none');
            modalContent.show();
            freeScroll();
        }, 500);
    });
}

function sendForm(e, form, url, onSuccess, onError, onLoadStart, params) {
    e.preventDefault();
    formValidate({
        form: form,
        url: url,
        onLoadStart: () => onLoadStart ? onLoadStart() : (() => {}),
        onSuccess: (data) => onSuccess ? onSuccess(data) : (() => {}),
        onError: (error) => onError ? onError(error) : console.log(error),
        ...params
    });
}

function showFeedbackScreen(feedback) {
    let parent = feedback.closest('.feedback__item');
    let img = parent.attr('data-screen');
    let feedbackModal = $('.full-feedback .modal__box');

    $('.full-feedback img').attr('src', img);
    if (isDesktop) {
        feedbackModal.css({
            'position': 'absolute',
            'top': `calc(${parent.offset().top - $(window).scrollTop()})px`,
            'left': `${parent.offset().left + (parent.width() / 8)}px`,
        })
    }
}

// инициализация всех обработчиков
function initListeners() {
    // ОБЩИЕ ОБРАБОТЧИКИ

    // Меню

    $('.burger').on('click', function() {
        if (!isDesktop) {
            showMenu('.mobile-menu');
        } else {
            showMenu('.menu');
        }
    });

    $('.menu__close').on('click', function() {
        hideMenu('.menu');
    });

    $('.mobile-menu__close').on('click', function() {
        hideMenu('.mobile-menu');
    });

    $('.menu__product').on('mouseenter', function() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('.menu__products-pic').css('background-image', `url(${$(this).attr('data-pic')})`);
    });

    // Модалки

    $('.enter__form').on('submit', function(e) {
        sendForm(e,
            '.enter__form',
            'https://cors-anywhere.herokuapp.com/http://mushrooms.asap-lp.ru/form.php',
            data => showSuccessModal($(this))
        );
    });

    $('.register__form').on('submit', function(e) {
        sendForm(e,
            '.register__form',
            'https://cors-anywhere.herokuapp.com/http://mushrooms.asap-lp.ru/form.php',
            data => showSuccessModal($(this))
        );
    });

    // Футер

    $('.write__form').on('submit', function(e) {
        sendForm(e,
            '.write__form',
            'https://cors-anywhere.herokuapp.com/http://mushrooms.asap-lp.ru/form.php',
            data => showSuccessModal($(this)),
        );
    });

    // ГЛАВНАЯ

    $('.shops__map').on('click', function() {
        initMap($(this).attr('data-coords'), '#map');
    });

    initSlider('.recipes .recipes__slider', {
        items: 3,
        navText: [createNav('recipes').prevNav, createNav('recipes').nextNav],
        navContainer: $('.recipes__nav'),
        margin: 40,
        responsive: {
            0: {
                items: 1,
                margin: 8
            },
            490: {
                items: 2
            },
            1200: {
                items: 3,
            }
        }
    });

    // ПРОИЗВОДСТВО

    initSlider('.news__slider', {
        items: 3,
        navText: [createNav('news').prevNav, createNav('news').nextNav],
        navContainer: $('.news__nav'),
        margin: 40,
        responsive: {
            0: {
                items: 1,
                margin: 8
            },
            768: {
                items: 2,
                margin: 30
            },
            1024: {
                margin: 40
            }
        }
    });

    // СОТРУДНИЧЕСТВО

    initSlider('.docs__slider', {
        items: 3,
        navText: [createNav('docs').prevNav, createNav('docs').nextNav],
        navContainer: $('.docs__nav'),
        margin: 40,
        autoWidth: true,
        responsive: {
            0: {
                items: 1,
                margin: 8,
                autoWidth: false
            },
            490: {
                items: 2,
            },
            768: {
                items: 3,
                autoWidth: true
            },
            1400: {
                margin: 40
            }
        }
    });

    $('.cooperation-request__form').on('submit', function(e) {
        sendForm(
            e,
            '.cooperation-request__form',
            'https://cors-anywhere.herokuapp.com/http://mushrooms.asap-lp.ru/form.php',
            data => showSuccessModal($(this))
        );
    });

    // ОТЗЫВЫ

    $('.feedback__item-original').on('click', function() {
        showFeedbackScreen($(this));
    });

    // 404

    if (pageName == '404' && !isIE()) {
        initModel('.notfound__model', $('.notfound__model').width(), $('.notfound__model').height());
    }

    // ПРОДУКТ

    $('.product-info__desc-show-more').on('click', function() {
        if ($('.product-info__desc-text').hasClass('show-more')) {
            $('.product-info__desc-text').removeClass('show-more');
            $('.product-info__desc-show-more').text('Подробнее');
        } else {
            $('.product-info__desc-text').addClass('show-more');
            $('.product-info__desc-show-more').text('Скрыть');
        }
    });

    $('.product-info__desc-title-wrapper').on('click', function() {
        if ($('.product-info__desc-table').hasClass('hidden')) {
            $('.product-info__desc-table').slideDown().removeClass('hidden');
            $('.product-info__desc-hide').addClass('showed');

        } else {
            $('.product-info__desc-table').slideUp().addClass('hidden');
            $('.product-info__desc-hide').removeClass('showed');
        }
    });

    // КОРЗИНА

    $('input#delivery').on('click', function() {
        $('.delivery-header__table, .cart__delivery, .cart__offer-data-input--address').removeClass('hidden');
        $('.shops--cart').addClass('hidden');
        $('label[for="offline"]').text('Курьеру (наличными или картой)');

        initCartMap();
    });

    $('input#self').on('click', function() {
        $('.delivery-header__table, .cart__delivery, .cart__offer-data-input--address').addClass('hidden');
        $('.shops--cart').removeClass('hidden');
        $('label[for="offline"]').text('На точке (наличными или картой)');
    });


    // Только для десктопа
    if (isDesktop) {
        if (pageName === 'Главная') {
            if (!isIE()) {
                initModel('.eco__model');
            }

            let offset = 500;

            $(window).on('scroll', () => {
                if ($(window).scrollTop() > $('.eco__item:eq(1)').offset().top - offset) {
                    $('.eco__table-container').addClass('second');
                }

                if ($(window).scrollTop() > $('.eco__item:eq(2)').offset().top - offset) {
                    $('.eco__table-container').addClass('third');
                }
            });
        }
    }

    //Для десктопа и планшета
    if (!isMobile) {
        //массив элементов, которым нужна последовательная анимация или где aos-анимация не работает (слайдеры)
        initAnimationsArray([$('.production__slide-box'),
            $('.production__slide-title'),
            $('.recipes__slide'),
            $('.present__item'),
            $('.shops__item'),
            $('.features__item'),
            $('.news__slide'),
            $('.supplies__item-box'),
            $('.docs__slide'),
            $('.recipe__ingredient'),
            $('.feedback__item-box'),
            $('.products__item-box'),
            $('.product-info__desc-item'),
            $('.cart__table-item')
        ]);

        initSlider('.production__slider', {
            items: 3,
            navText: [createNav('production').prevNav, createNav('production').nextNav],
            navContainer: $('.production__nav'),
            margin: 40,
            responsive: {
                0: {
                    items: 2,
                },

                1024: {
                    items: 3,
                }
            }
        });
    }

    // Для планшета и мобилки

    if (!isDesktop) {
        initSlider('.present__table', {
            items: 2.3,
            margin: 15,
            nav: false,
            responsive: {
                0: {
                    items: 1,
                },

                768: {
                    items: 2
                }
            }
        });

        initSlider('.other-recipes .recipes__slider', {
            items: 2,
            nav: false,
            margin: 15,
            responsive: {
                0: {
                    items: 1,
                    margin: 8
                },
                490: {
                    items: 2,
                    margin: 15,
                }
            }
        });

        let contactsTitle = $('.contacts__title').detach();
        $('.contacts__contacts').prepend(contactsTitle);
    }

    if (isTablet) {
        truncText('.feedback__item-text', 170);
        truncText('.recipes__slider--product .recipes__slide-text', 100);
    }

    // Только для мобилки

    if (isMobile) {
        truncText('.recipes__slide-text', 75);
        truncText('.feedback__item-text', 150);

        initSlider('.recipes__slider--product', {
            items: 2,
            nav: false,
            margin: 15,
            responsive: {
                0: {
                    items: 1,
                    margin: 8
                },
                490: {
                    items: 2,
                    margin: 15,
                }
            }
        });
    }
}

$().ready(() => {
    contentFadeInOnReady();
    setDeviceType();
    setPageName();
    initListeners();
    initAOS();
    bindModalListeners([
        { trigger: '.shops__map', modal: '.modal--map' },
        { trigger: '.present__item-btn', modal: '.modal--enter' },
        { trigger: '.request__request-btn', modal: '.cooperation-request' },
        { trigger: '.mobile-menu__account', modal: '.modal--enter' },
        { trigger: '.enter__register', modal: '.register' },
        { trigger: '.register__enter', modal: '.enter' },
        { trigger: '.footer__write', modal: '.write' },
        { trigger: '.feedback__item-original', modal: '.full-feedback' }
    ]);

    truncText('.recipes__slide-text', 200);
    truncText('.news__slide-title', 70);
    truncText('.feedback__item-text', 300);
});