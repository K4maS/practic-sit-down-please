(() => {


    // окна
    const windowCloseBtn = document.querySelector('.main-block__close-btn');
    const windowBlock = document.querySelector('.window');
    const goodBtn = document.querySelector('.good__btn');
    const formBtn = document.querySelector('.form__btn');
    const windowForm = document.querySelector('.main-block__form');
    const windowGalery = document.querySelector('.window__img-block');
    const windowInform = document.querySelector('.window__inform');
    const goodImgBtn = document.querySelectorAll('.good__img-btn');
    const inputs = document.querySelectorAll('.form__input');

    // green sock 
    const tlmenu = new TimelineMax({ paused: true });
    const tlwindow = new TimelineMax({ paused: true });
    document.addEventListener('DOMContentLoaded', function () {
        // окна
        windowCloseBtn.addEventListener('click', async function () {
            await tlwindow.reverse();
            windowBlock.classList.remove('window--active')
        })
        goodImgBtn.forEach(e => {
            e.addEventListener('click', function () {
                tlwindow.play();
                windowForm.classList.remove('form--active')
                windowGalery.classList.add('window__img-block--active')
                windowInform.classList.remove('window__inform--active')
                windowBlock.classList.add('window--active')

            })
        })

        goodBtn.addEventListener('click', function () {
            tlwindow.play();
            windowForm.classList.add('form--active')
            windowGalery.classList.remove('window__img-block--active')
            windowInform.classList.remove('window__inform--active')
            windowBlock.classList.add('window--active')

        })

        formBtn.addEventListener('click', function () {
            let valid = true;
            inputs.forEach(e => {
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
        // green sock 
        // tlmenu
        //     .to('.nav__list-mobile ', {
        //         duration: 0.3,
        //         y: 10,
        //         opacity: 1
        //     })
        //     .to('.nav__list', {
        //         duration: 0.4,
        //         opacity: 1
        //     })
        //     .from('.menu__tel', {
        //         duration: 0.5,
        //         opacity: 0,

        //     });

        tlwindow
            .to('.window', {
                duration: 0.51,
                opacity: 1,
            })
            .to('.main-block', {
                duration: 0.51,
                opacity: 1,
                y: 1,
            });
    })

})();