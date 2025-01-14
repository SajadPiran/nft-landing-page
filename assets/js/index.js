$(document).ready( ()=>{

    ( 'dark' === localStorage.theme ) ? $(document.documentElement).addClass('dark') : null;

    const headerMenuButton = $('#header-menu')[0];
    const headerMenuCloseButton = $('#close-menu')[0];
    const nav = $('nav')[0];
    $( headerMenuButton ).on( 'click' , () => {

        $( nav ).css( 'left' , '0' );
        $( headerMenuCloseButton ).on( 'click' , () =>{ $( nav ).css( 'left' , '100%' ); } );

    });

    const themeChangeButton = $('#change-theme')[0];
    $( themeChangeButton ).on( 'click' , () => {

        if ( 'dark' === localStorage.theme ) {
            $( document.documentElement ).removeClass('dark');
            localStorage.theme = 'light';
        } else {
            $( document.documentElement ).addClass('dark');
            localStorage.theme = 'dark';
        }

    });


});