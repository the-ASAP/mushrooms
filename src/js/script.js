// удаляемпрелодер при загрузке страницы
const contentFadeInOnReady = () => {
    $('.preloader').fadeOut(150, () => {
        $('.preloader').remove();
    });
};

// Открытие модальных окон
const modalOpen = (trigger, modal) => {
    $(trigger).on('click', function() {
        // стопаем скролл у боди
        stopScroll('body');
        // показываем модалку
        $(modal).addClass('active');
    })
}
// Закрытие  модалок
const modalClose = (btn = '.modal__close', modal = '.modal') => {
    $(btn).on('click', () => {
        $(this).closest(modal).removeClass('active')
        // возвращаем скролл для бади
        $('body').attr("style", '');
    });
}

// Закрытие модалок на  ESCAPE
const closeOnEscape = () => {
    $(document).keydown((e) => {
        // 27 = escape
        if (e.keyCode === 27) {
            $('.modal').removeClass('active')
            // возвращаем скролл для бади
            $('body').attr("style", '');
            return false;
        }
    });
}
// Запрещаем скролл для бади 
const stopScroll = (item) => {
    let documentWidth = parseInt(document.documentElement.clientWidth),
        windowsWidth = parseInt(window.innerWidth),
        scrollbarWidth = windowsWidth - documentWidth;
    $(item).attr("style", 'overflow: hidden; padding-right: ' + scrollbarWidth + 'px');
}

// возвращаем скролл для бади
const freeScroll = (item) => {
    $(item).attr("style", '');
}

const initAOS = () => {
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
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 600, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
}

const createNav = (className) => {
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

$().ready(() => {
    contentFadeInOnReady()
    modalClose();

    const initModel = () => {
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

    initModel();
    initAOS();

    let offset = 500;

    $(window).on('scroll', () => {
        if ($(window).scrollTop() > $('.eco__item:eq(1)').offset().top - offset) {
            $('.eco__table-container').addClass('second');
        }

        if ($(window).scrollTop() > $('.eco__item:eq(2)').offset().top - offset) {
            $('.eco__table-container').addClass('third');
        }
    });

    $('.production__slider').owlCarousel({
        items: 3,
        navText: [createNav('production').prevNav, createNav('production').nextNav],
        navContainer: $('.production__nav'),
        loop: false,
        margin: 40,
        nav: true,
        dots: false
    });

    $('.recipes__slider').owlCarousel({
        items: 3,
        navText: [createNav('recipes').prevNav, createNav('recipes').nextNav],
        navContainer: $('.recipes__nav'),
        loop: false,
        margin: 40,
        nav: true,
        dots: false
    })
});