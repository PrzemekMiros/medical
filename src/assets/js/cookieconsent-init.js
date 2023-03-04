
var cc = initCookieConsent();

var logo = 'Ustawienia plików cookies';
var cookie = '🍪';

cc.run({
    current_lang : 'pl',
    autoclear_cookies : true,                   // default: false
    cookie_name: 'cc_cookie_demo1',             // default: 'cc_cookie'
    cookie_expiration : 365,                    // default: 182
    page_scripts: true,                         // default: false

    gui_options: {
        consent_modal: {
            layout: 'cloud',                      // box,cloud,bar
            position: 'bottom right',           // bottom,middle,top + left,right,center
            transition: 'slide'                 // zoom,slide
        },
        settings_modal: {
            layout: 'box',                      // box,bar
            // position: 'left',                // right,left (available only if bar layout selected)
            transition: 'slide'                 // zoom,slide
        }
    },

    onFirstAction: function(){
        console.log('onFirstAction fired');
    },

    onAccept: function (cookie) {
        console.log('onAccept fired ...');
    },

    onChange: function (cookie, changed_preferences) {
        console.log('onChange fired ...');
    },

    languages: {
        'pl': {
            consent_modal: {
                title: cookie + ' Strona używa pliki cookies ',
                description: 'Ta strona wykorzystuje niezbędne pliki cookie, aby zapewnić prawidłowe działanie, oraz śledzące pliki cookie. <button type="button" data-cc="c-settings" class="cc-link">Chcę wybrać</button>',
                primary_btn: {
                    text: 'Akceptuj',
                    role: 'accept_all'              // 'accept_selected' or 'accept_all'
                },
                secondary_btn: {
                    text: 'Odrzuć',
                    role: 'accept_necessary'        // 'settings' or 'accept_necessary'
                }
            },
            settings_modal: {
                title: logo,
                save_settings_btn: 'Zapisz ustawienia',
                accept_all_btn: 'Akceptuj',
                reject_all_btn: 'Odrzuć',
                close_btn_label: 'Zamknij',
                cookie_table_headers: [
                    {col1: 'Nazwa'},
                    {col2: 'Adres'},
                    {col3: 'Wygasa'},
                    {col4: 'Opis'}
                ],
                blocks: [
                    {
                        title: 'Wykorzystanie plików cookies 📢',
                        description: 'Strona wykorzystuje pliki cookie, aby poprawić komfort użutkowania. Możesz wybrać dla każdej kategorii opcję włączenia/wyłączenia w dowolnym momencie. Aby uzyskać więcej informacji na temat plików cookie i innych wrażliwych danych, przeczytaj całą <a href="/polityka/" class="cc-link">politykę prywatności</a>.'
                    }, {
                        title: 'Niezbędne pliki cookie',
                        description: 'Te pliki cookie są niezbędne do prawidłowego funkcjonowania strony internetowej. Bez tych plików cookie witryna nie działałaby poprawnie',
                        toggle: {
                            value: 'necessary',
                            enabled: true,
                            readonly: true          // cookie categories with readonly=true are all treated as "necessary cookies"
                        }
                    }, {
                        title: 'Wydajnościowe i analityczne pliki cookie',
                        description: 'Te pliki cookie umożliwiają witrynie zapamiętanie wyborów dokonanych w przeszłości',
                        toggle: {
                            value: 'analytics',     // there are no default categories => you specify them
                            enabled: false,
                            readonly: false
                        },
                        cookie_table: [
                            {
                                col1: 'Google Analytics',
                                col2: 'google.com',
                                col3: '2 lata',
                                col4: 'Zachownie użytkowników',
                                is_regex: true
                            },
                        ]
                    }, {
                        title: 'Reklamowe i targetujące pliki cookie',
                        description: 'Te pliki cookie zbierają informacje o tym, w jaki sposób korzystasz z witryny, które strony odwiedziłeś i które linki kliknąłeś. Wszystkie dane są anonimowe i nie mogą służyć do identyfikacji użytkownika',
                        toggle: {
                            value: 'targeting',
                            enabled: false,
                            readonly: false
                        }
                    }, {
                        title: 'Więcej informacji',
                        description: 'W przypadku jakichkolwiek pytań dotyczących mojej polityki dotyczącej plików cookie i Twoich wyborów, proszę o <a class="cc-link" href="/kontakt/">kontakt</a>.',
                    }
                ]
            }
        }
    }

});
