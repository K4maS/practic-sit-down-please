(() => {


    // окна
    const windowCloseBtn = document.querySelector('.main-block__close-btn');
    const windowBlock = document.querySelector('.window');
    const goodBtn = document.querySelector('.good__btn');
    const formBtn = document.querySelector('.form__btn');
    const windowForm = document.querySelector('.main-block__form');
    const windowGalery = document.querySelector('.window__img-block');

    const hederNav = document.querySelector('.header__nav');
    const burgerBtn = document.querySelector('.header__burger');

    const windowInform = document.querySelector('.window__inform');
    const goodImgBtn = document.querySelectorAll('.good__img-btn');
    const inputs = document.querySelectorAll('.form__input');

    let open = false;

    // green sock 
    const tlmenu = new TimelineMax({ paused: true });
    const tlwindow = new TimelineMax({ paused: true });

    document.addEventListener('DOMContentLoaded', function () {
        // бургер-меню
        try {
            burgerBtn.addEventListener('click', async function () {

                if (!open) tlmenu.play();
                else await tlmenu.reverse();
                open = !open
                burgerBtn.classList.toggle('burger--active');
                hederNav.classList.toggle('nav--active');
                document.body.classList.toggle('stop-scroll');
            })
        } catch { }
        // окна   

        try {
            windowCloseBtn.addEventListener('click', async function () {
                await tlwindow.reverse();
                windowBlock.classList.remove('window--active')
                document.body.classList.remove('stop-scroll');
            })
            goodImgBtn.forEach(e => {
                e.addEventListener('click', function () {
                    tlwindow.play();
                    windowForm.classList.remove('form--active')
                    windowGalery.classList.add('window__img-block--active')
                    windowInform.classList.remove('window__inform--active')
                    windowBlock.classList.add('window--active')
                    document.body.classList.add('stop-scroll');
                })
            })

            goodBtn.addEventListener('click', function () {
                tlwindow.play();
                windowForm.classList.add('form--active')
                windowGalery.classList.remove('window__img-block--active')
                windowInform.classList.remove('window__inform--active')
                windowBlock.classList.add('window--active')
                document.body.classList.add('stop-scroll');
            })

            formBtn.addEventListener('click', async function () {
                let valid = false;

                inputs.forEach(e => {
                    if (e.value) {
                        valid = true;
                    }
                    if (e.classList.contains('just-validate-error-field')) {
                        valid = false;
                    }
                })
                if (valid) {
                    windowForm.classList.remove('form--active')
                    windowGalery.classList.remove('window__img-block--active')
                    windowInform.classList.add('window__inform--active')

                }

            })
        }
        catch { }


        // green sock 
        tlmenu
            .to('.header__nav', {
                duration: 0.3,
                x: 30,
                opacity: 1
            })


        tlwindow
            .to('.window', {
                duration: 0.51,
                opacity: 1,
            })
            .to('.main-block', {
                duration: 0.51,
                opacity: 1,
                y: 50,
            });
    })

})();