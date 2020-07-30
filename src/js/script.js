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
        ($(window).width() > 1024) ? isDesktop = true: isDesktop = false;
    })();

    (function setIsTablet() {
        ($(window).width() <= 1024 && $(window).width() > 768) ? isTablet = true: isTablet = false;
    })();

    (function setIsMobile() {
        ($(window).width() <= 768) ? isMobile = true: isMobile = false;
    })();
}

function setPageName() {
    pageName = $('name').text().trim();
}

function initAnimationsArray(elems) {
    animationsArray = elems;
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

function initModel() {
    let scene, camera, renderer, hLight, mushroom = null;

    function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(40, $('.eco__model').width() / $('.eco__model').height(), 1, 5000);
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
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        document.querySelector('.eco__model').appendChild(renderer.domElement);

        // var controls = new THREE.OrbitControls(camera, renderer.domElement);
        // controls.addEventListener('change', renderer);
        // controls.update();

        let loader = new THREE.GLTFLoader();
        loader.load('../vendors/js/mushroom.glb', function(gltf) {
            mushroom = gltf.scene.children[0];
            mushroom.scale.set(180, 180, 180);

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
function initMap(coords) {
    let coordsArr = coords.split(',');

    $('#map').html('');

    ymaps.ready(function() {
        var myMap = new ymaps.Map('map', {
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

    $(selector).owlCarousel({
        ...defaultParams,
        ...params,
    });
}

// отправка формы
function sendForm(e, formSelector, url, onSuccess, onError, onStart) {
    console.log(123)

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
        }, 500);
    });
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

    $('.mobile-menu__search-input').on('focus', function() {
        $('.mobile-menu').addClass('focus');
    });

    $('.mobile-menu__search-input').on('blur', function() {
        $('.mobile-menu').removeClass('focus');
    });

    // Футер

    $('.footer__search-input').on('focus', function() {
        $('.footer__search').addClass('focus');
    });

    $('.footer__search-input').on('blur', function() {
        $('.footer__search').removeClass('focus');
    });

    $('.footer__search-reset').on('click', function() {
        $('.footer__search').removeClass('focus');
        $('.footer__search-input').val('');
    });

    // Модалки

    $('.enter__form').on('submit', function(e) {
        sendForm(e, '.enter__form', 'УРЛ ДЛЯ ВХОДА В ЛИЧНЫЙ КАБИНЕТ');
    });

    // ГЛАВНАЯ

    $('.shops__map').on('click', function() {
        initMap($(this).attr('data-coords'));
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
        e.preventDefault();
        formValidate({
            form: '.cooperation-request__form',
            url: 'https://cors-anywhere.herokuapp.com/http://mushrooms.asap-lp.ru/form.php',
            onLoadStart: () => {
                console.log('start')
            },
            onSuccess: () => {
                console.log(this.data);
                console.log('success')
            },
            onError: () => {
                console.log('errroo')
            }
        });
    });

    // Только для десктопа
    if (isDesktop) {
        if (pageName === 'Главная') {
            initModel();

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
        //массив элементов, которым нужна последовательная анимация или где aos-анимация не работает (слайдеры)
        initAnimationsArray([$('.production__slide-box'),
            $('.production__slide-title'),
            $('.recipes__slide'),
            $('.present__item'),
            $('.shops__item'),
            $('.features__item'),
            $('.news__slide'),
            $('.supplies__item'),
            $('.docs__slide'),
            $('.recipe__ingredient')
        ]);
        //добавление data-атрибута с задержкой анимации (не трож)
        addDataDelayAttr(animationsArray);

        $(window).on('scroll', function() {
            // обработчик срабатывания анимации на элементах из массива выше (не трож)
            triggerSwipeDownAnimation(animationsArray);
        })
    }

    //Для десктопа и планшета
    if (!isMobile) {
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
    }

    // Только для мобилки

    if (isMobile) {
        truncText('.recipes__slide-text', 75);
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
        { trigger: '.mobile-menu__account', modal: '.modal--enter' }
    ]);

    truncText('.recipes__slide-text', 200);
    truncText('.news__slide-title', 70);

});