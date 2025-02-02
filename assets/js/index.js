import Swiper from './swiper/swiper-bundle.min.mjs';
import Navigation from './swiper/modules/navigation.min.mjs';

$(document).ready( ()=>{

    // Theme
    function changeLogoCarousel( images , darkTheme ) {

        const imageSrcRegex = new RegExp(/wallet-\d/)
        $( images ).each( ( index , image ) => {

            const imageSrc = $( image ).attr( 'src' );
            const imageSrcNewName = imageSrcRegex.exec( imageSrc )[0] + '-black';
            const oldImageSrc = imageSrc.replace( '-black' , '' );
            const newImageSrc = imageSrc.replace( imageSrcRegex.exec( imageSrc ) , imageSrcNewName );

            if( darkTheme ) { $( image ).attr( 'src' , newImageSrc ); }
            else{ $( image ).attr( 'src' , oldImageSrc ); }


        });

    }
    const walletImages = $('.logo-carousel').find('img').toArray();

    if( 'dark' === localStorage.theme ) {
        $(document.documentElement).addClass('dark');
        $('#change-theme').find('use').attr( 'href' , '#light-theme');
        changeLogoCarousel( walletImages , true );
    }
    const HTMLObserver = new MutationObserver( ( item ) => {

        const classValue = item[0].target.classList;
        if( 0 < classValue.length ) { changeLogoCarousel( walletImages , true ); }
        else{ changeLogoCarousel( walletImages , false ); }

    } );
    HTMLObserver.observe( document.documentElement , { attributes : true } );


    // Header
    const headerMenuButton = $('#header-menu')[0];
    const headerMenuCloseButton = $('#close-menu')[0];
    const nav = $('nav')[0];
    $( headerMenuButton ).on( 'click' , () => {

        $( nav ).css( 'left' , '0' );
        $( headerMenuCloseButton ).on( 'click' , () =>{ $( nav ).css( 'left' , '100%' ); } );

    });

    const themeChangeButton = $('#change-theme')[0];
    $( themeChangeButton ).on( 'click' , () => {

        const svg = $( themeChangeButton ).find( 'use' )[0];
        if ( 'dark' === localStorage.theme ) {

            $( document.documentElement ).removeClass('dark');
            localStorage.theme = 'light';
            $( svg ).attr( 'href' , '#dark-theme' );

        } else {
            $( document.documentElement ).addClass('dark');
            localStorage.theme = 'dark';
            $( svg ).attr( 'href' , '#light-theme' );

        }

    });


    //Collection
    function calculateTotalSlides(slidesContainer , slides ){

        for (let slide = 0; slide < slides.length; slide++) {

            let slideNumber = slide + 1;
            if( ( slides[slide].clientWidth ) * slideNumber > slidesContainer.clientWidth ){

                return slide;

            }

        }

    }
    function calculateWrapperTranslate( slidePerView ) {

        const swiperSlideWidth = +
         getComputedStyle( document.documentElement )
        .getPropertyValue('--swiper-slide-width')
        .replace('px' , '');

        let swiperWrapperSnapGrid = [];
        for (let slide = 0; slide < slidePerView; slide++) {

            if( 0 === slide) { swiperWrapperSnapGrid.push( -0 ) }
            swiperWrapperSnapGrid.push( swiperSlideWidth * ( slide + 1 ) )

        }
        return swiperWrapperSnapGrid;

    }

    const swiper = $('.swiper')[0];
    const swiperSlides = $('.swiper').find('.swiper-slide').toArray();
    const totalSlide = calculateTotalSlides( swiper , swiperSlides ) ;

    const swiperObject = new Swiper('.swiper' , {

        modules: [Navigation],
        slidesPerView : totalSlide,
        speed : 1000,
        autoplay : true,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: { el: '.swiper-pagination' },
        on: {

            activeIndexChange : function (swiper) {

                if( swiper.activeIndex === 0  ) {
                    $( swiper.navigation.prevEl ).addClass('swiper-button--disabled');
                }else{  $( swiper.navigation.prevEl ).removeClass('swiper-button--disabled');}

                if( swiper.activeIndex === swiper.slides.length - 1  ) {

                    $( swiper.navigation.nextEl ).addClass('swiper-button--disabled');
                }else{  $( swiper.navigation.nextEl ).removeClass('swiper-button--disabled');}

            }

        }


    })
    swiperObject.snapGrid = calculateWrapperTranslate( swiperSlides.length - totalSlide );
    swiperObject.slidesGrid = calculateWrapperTranslate( swiperSlides.length - totalSlide );
    swiperObject.slidesSizesGrid = calculateWrapperTranslate( swiperSlides.length - totalSlide );


    // FAQ
    const allFaqs = $('.faq').toArray();
    $( allFaqs ).each( ( index , faq ) => {

        $( faq ).on( 'click' , () => {

            const textContainer = $( faq.parentElement ).find( 'section' )[1];
            const svg = $( faq ).find( 'svg' )[0];

            if( '' === textContainer.style.height ) {
                $( textContainer ).css( 'height' , `${ textContainer.scrollHeight }px` );
                $( svg ).css( 'rotate' , '180deg' );

            }else{
                $( textContainer ).css( 'height' , '' );
                $( svg ).css( 'rotate' , '' );
            }

        });

    });


    // Animation
    const sectionAnimation = $('[data-animation]').toArray();
    const sectionAnimationObserver = new IntersectionObserver( ( entry ) => {

        $( entry ).each( ( index , observedSection ) => {

            if( observedSection.isIntersecting ){

                const animationData = $( observedSection.target ).attr( 'data-animation' );
                const animationScope = animationData.split( '-' )[0];
                const animationName = animationData.split( '-' )[1];

                const sectionAnimations = {

                    main : {

                        title : function () {

                            const observedTarget = observedSection.target;
                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 50 , 0 ],
                                duration : 1500

                            } );

                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        text : function () {

                            const observedTarget = observedSection.target;
                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 50 , 0 ],
                                duration : 1500,
                                delay : 300

                            } );

                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        button : function () {

                            const observedTarget = observedSection.target;
                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ -50 , 0 ],
                                duration : 1500,
                                delay : 300

                            } );

                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        character : function () {

                            const observedTarget = observedSection.target;
                            const animationDelay = + $( observedTarget ).attr( 'data-animation-delay' );
                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 10 , 0 ],
                                duration : 1500,
                                delay : animationDelay

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        communityText : function () {

                            const observedTarget = observedSection.target;
                            const animationDelay = + $( observedTarget ).attr( 'data-animation-delay' );
                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 20 , 0 ],
                                duration : 1500,
                                delay : animationDelay

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        image : function () {

                            const observedTarget = observedSection.target;
                            const animationDelay = + $( observedTarget ).attr( 'data-animation-delay' );
                            const observedTargetRotate = getComputedStyle( observedTarget )
                                .getPropertyValue('--tw-rotate');

                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 20 , 0 ],
                                rotate : [ observedTargetRotate , 0 ] ,
                                duration : 1000,
                                delay : animationDelay

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        shape : function () {

                            const observedTarget = observedSection.target;
                            const animationProperty = JSON.parse( $( observedTarget ).attr( 'data-animation-property' ) );
                            anime( {

                                targets : observedTarget,
                                left : `${animationProperty.left}%`,
                                duration : animationProperty.duration,
                                delay : animationProperty.delay,
                                opacity:[ 0 , 1 ]

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        carousel : function () {

                            const observedTarget = observedSection.target;

                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateX : [ 300 , 0 ],
                                duration : 1500,

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        }
                    },
                    collection : {

                        title : function () {

                            const observedTarget = observedSection.target;
                            const animationDelay = + $( observedTarget ).attr( 'data-animation-delay' );
                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 30 , 0 ],
                                duration : 1500,
                                delay : animationDelay

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        slider : function () {

                            const observedTarget = observedSection.target;
                            const animationDelay = + $( observedTarget ).attr( 'data-animation-delay' );
                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 50 , 0 ],
                                duration : 1500,
                                delay : animationDelay

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        button : function () {

                            const observedTarget = observedSection.target;
                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ -50 , 0 ],
                                duration : 1500,

                            } );

                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },

                    },
                    whyUs : {

                        title : function () {

                            const observedTarget = observedSection.target;
                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 30 , 0 ],
                                duration : 1500,

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        item : function () {

                            const observedTarget = observedSection.target;
                            const animationDelay = + $( observedTarget ).attr( 'data-animation-delay' );

                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 50 , 0 ],
                                duration : 1500,
                                delay:animationDelay

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        shape : function () {

                            const observedTarget = observedSection.target;
                            const animationProperty = JSON.parse( $( observedTarget ).attr( 'data-animation-property' ) );
                            anime( {

                                targets : observedTarget,
                                left : `${animationProperty.left}%`,
                                top : `${animationProperty.top}%`,
                                rotate : [360 , 0] ,
                                duration : animationProperty.duration,
                                delay : animationProperty.delay,
                                opacity:[ 0 , 1 ]

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },

                    },
                    details : {

                        item : function () {

                            const observedTarget = observedSection.target;
                            const animationDelay = + $( observedTarget ).attr( 'data-animation-delay' );

                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 50 , 0 ],
                                duration : 1500,
                                delay:animationDelay

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        shape : function () {

                            const observedTarget = observedSection.target;
                            const animationProperty = JSON.parse( $( observedTarget ).attr( 'data-animation-property' ) );
                            anime( {

                                targets : observedTarget,
                                left : `${animationProperty.left}%`,
                                top : `${ ( window.innerWidth >= 768 ) ? animationProperty.topMd : animationProperty.top }%`,
                                rotate : [360 , 0] ,
                                duration : animationProperty.duration,
                                delay : animationProperty.delay,
                                opacity:[ 0 , 1 ]

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },


                    },
                    howItWork: {

                        title : function () {

                            const observedTarget = observedSection.target;
                            const animationDelay = + $( observedTarget ).attr( 'data-animation-delay' );
                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 30 , 0 ],
                                duration : 1500,
                                delay : animationDelay

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        item : function () {

                            const observedTarget = observedSection.target;
                            const animationDelay = + $( observedTarget ).attr( 'data-animation-delay' );

                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 50 , 0 ],
                                duration : 1500,
                                delay:animationDelay

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },

                    },
                    subscribe : {

                        container : function () {

                            const observedTarget = observedSection.target;
                            const animationDelay = + $( observedTarget ).attr( 'data-animation-delay' );
                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 50 , 0 ],
                                duration : 1500,
                                delay : animationDelay

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        shape : function () {

                            const observedTarget = observedSection.target;
                            const animationDelay = + $( observedTarget ).attr( 'data-animation-delay' );
                            anime( {

                                targets : observedTarget,
                                duration : 1500,
                                scale : [ 0 , 1 ],
                                delay : animationDelay,

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },

                    },
                    roadMap : {

                        title : function () {

                            const observedTarget = observedSection.target;
                            const animationDelay = + $( observedTarget ).attr( 'data-animation-delay' );
                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 30 , 0 ],
                                duration : 1500,
                                delay : animationDelay

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        item : function () {

                            const observedTarget = observedSection.target;
                            const animationDelay = + $( observedTarget ).attr( 'data-animation-delay' );

                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 50 , 0 ],
                                duration : 1500,
                                delay:animationDelay

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },

                    },
                    artists : {

                        title : function () {

                            const observedTarget = observedSection.target;
                            const animationDelay = + $( observedTarget ).attr( 'data-animation-delay' );
                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 30 , 0 ],
                                duration : 1500,
                                delay : animationDelay

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        item : function () {

                            const observedTarget = observedSection.target;
                            const animationDelay = + $( observedTarget ).attr( 'data-animation-delay' );

                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 50 , 0 ],
                                duration : 1500,
                                delay:animationDelay

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },

                    },
                    faq : {

                        title : function () {

                            const observedTarget = observedSection.target;
                            const animationDelay = + $( observedTarget ).attr( 'data-animation-delay' );
                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 30 , 0 ],
                                duration : 1500,
                                delay : animationDelay

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        faqs : function () {

                            const observedTarget = observedSection.target;
                            const animationDelay = + $( observedTarget ).attr( 'data-animation-delay' );

                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 50 , 0 ],
                                duration : 1500,
                                delay:animationDelay

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },

                    },
                    minting : {

                        title : function () {

                            const observedTarget = observedSection.target;
                            const animationDelay = + $( observedTarget ).attr( 'data-animation-delay' );
                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 30 , 0 ],
                                duration : 1500,
                                delay : animationDelay

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        text : function () {

                            const observedTarget = observedSection.target;
                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ 50 , 0 ],
                                duration : 1500,
                                delay : 300

                            } );

                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        shape : function () {

                            const observedTarget = observedSection.target;
                            const animationDelay = + $( observedTarget ).attr( 'data-animation-delay' );
                            anime( {

                                targets : observedTarget,
                                duration : 1500,
                                scale : [ 0 , 1 ],
                                delay : animationDelay,

                            } );
                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },
                        button : function () {

                            const observedTarget = observedSection.target;
                            anime( {

                                targets : observedTarget,
                                opacity : [ 0 , 1 ],
                                translateY : [ -50 , 0 ],
                                duration : 1500,

                            } );

                            $( observedTarget ).attr( 'data-has-animated' , true ) ;

                        },

                    },

                }
                if( !'true' === $(observedSection.target).attr('data-has-animated') || undefined === $(observedSection.target).attr('data-has-animated') ) {

                    sectionAnimations[ animationScope ][ animationName ]();

                }

            }

        });

    }, { threshold : [ 0.2 , 0.3 ] } );
    $( sectionAnimation ).each( ( index , section ) => { sectionAnimationObserver.observe( section ) } )


});