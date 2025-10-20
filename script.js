let select = (e) => document.querySelector(e);
let selectAll = (e) => document.querySelectorAll(e);

const face01 = select('#face01').getAttribute('d'),
    face02 = select('#face01').getAttribute('d'),
    handSec01 = select('#handSec01').getAttribute('d'),
    handSec02 = select('#handSec02').getAttribute('d'),
    handMin01 = select('#handMin01').getAttribute('d'),
    handMin02 = select('#handMin02').getAttribute('d'),
    handHr01 = select('#handHr01').getAttribute('d'),
    handHr02 = select('#handHr02').getAttribute('d');

gsap.set('#face', { attr: { d: face01 } });
gsap.set('#hand-sec', { attr: { d: handSec01 } });
gsap.set('#hand-min', { attr: { d: handMin01 } });
gsap.set('#hand-hr', { attr: { d: handHr01 } });

gsap.set(['.gsapWrapper', '.vline'], { autoAlpha: 1 });

window.onload = function () {
    startAnimation();
};

function startAnimation() {
    setTime(true);

    gsap.to('.cw.t24', 1, {
        rotation: '-=15',
        transformOrigin: '50% 50%',
        ease: 'bounce',
        onComplete: function () {
            this.invalidate().delay(1).restart(true);
        },
    });
    gsap.to('.cw.t20', 1, {
        rotation: '-=18',
        transformOrigin: '50% 50%',
        ease: 'bounce',
        onComplete: function () {
            this.invalidate().delay(1).restart(true);
        },
    });
    gsap.to('.ccw.t12', 1, {
        rotation: '+=30',
        transformOrigin: '50% 50%',
        ease: 'bounce',
        onComplete: function () {
            this.invalidate().delay(1).restart(true);
        },
    });
    gsap.to('#sec', 0.5, {
        rotation: getSec,
        transformOrigin: '50% 50%',
        ease: 'bounce',
        onComplete: function () {
            setTime();
            if (gsap.getProperty('#sec', 'rotation') >= 360) {
                gsap.set('#sec', { rotation: 0, transformOrigin: '50% 50%' });
            }
            this.invalidate().delay(0).restart(true);
        },
    });

    gsap
        .timeline({
            repeat: -1,
            repeatDelay: 5,
            defaults: { duration: 0.25, ease: 'power1.out' },
        })
        .to('#face', { morphSVG: '#face02', repeat: 2, yoyo: true });

    gsap
        .timeline({
            repeat: -1,
            repeatDelay: 5,
            defaults: { duration: 1, ease: 'bounce' },
        })
        .delay(8)
        .to('#hand-sec', { morphSVG: '#handSec02' })
        .to('#hand-sec', { morphSVG: '#handSec01' });

    gsap
        .timeline({
            repeat: -1,
            repeatDelay: 18,
            defaults: { duration: 1, ease: 'bounce' },
        })
        .delay(5)
        .to('#hand-min', { morphSVG: '#handMin02' })
        .to('#hand-min', { morphSVG: '#handMin01' });

    gsap
        .timeline({
            repeat: -1,
            repeatDelay: 30,
            defaults: { duration: 1, ease: 'bounce' },
        })
        .delay(10)
        .to('#hand-hr', { morphSVG: '#handHr02' })
        .to('#hand-hr', { morphSVG: '#handHr01' });

    function setTime(init) {
        let newDateTime = new Date();

        if (init == true) {
            gsap.set('#sec', { rotation: getSec, transformOrigin: '50% 50%' });
        }

        gsap.set('#min', {
            rotation:
                newDateTime.getMinutes() * 6 + (new Date().getSeconds() * 6) / 59,
            transformOrigin: '50% 50%',
        });
        gsap.set('#hr', {
            rotation:
                newDateTime.getHours() * 30 + (new Date().getMinutes() * 30) / 59,
            transformOrigin: '50% 50%',
        });
    }

    function getSec() {
        let newDateTime = new Date();
        let sec = newDateTime.getSeconds();
        let rotation = sec * 6;
        if (sec == 0) rotation = 360;

        let difference = Math.abs(
            gsap.getProperty('#sec', 'rotation') - rotation
        );
        if (difference >= 12)
            gsap.set('#sec', {
                rotation: rotation,
                transformOrigin: '50% 50%',
            });

        return rotation;
    }
}