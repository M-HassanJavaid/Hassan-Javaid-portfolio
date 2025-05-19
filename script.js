// gsap.registerPlugin(ScrollTrigger);

// cursor follow my div

let cursorPartner = document.querySelector('.cursor-partner');
document.addEventListener('mousemove', (e) => {
    cursorPartner.style.top = e.clientY + 'px';
    cursorPartner.style.left = e.clientX + 'px';
    if (e.target.dataset.key === 'remove') {
        cursorPartner.className = 'cursor-partner remove';
    } else if (e.target.dataset.key === 'focus') {
        cursorPartner.className = 'cursor-partner focus';
    } else {
        cursorPartner.className = 'cursor-partner default';
    }
});

let lightToDark = document.querySelector('.fa-moon');
let darkToLight = document.querySelector('.fa-sun');

darkToLight.addEventListener('click', () => {
    darkToLight.style.display = 'none';
    lightToDark.style.display = 'block';
    document.documentElement.style.setProperty('--primary-color', 'white');
    document.documentElement.style.setProperty('--secondary-color', 'black');
    document.documentElement.style.setProperty('--primary-color-2', '#dde3e9');

});

lightToDark.addEventListener('click', () => {
    lightToDark.style.display = 'none';
    darkToLight.style.display = 'block';
    document.documentElement.style.setProperty('--primary-color', '#011627');
    document.documentElement.style.setProperty('--secondary-color', 'white');
    document.documentElement.style.setProperty('--primary-color-2', 'black');
});

const findVideo = (element) => document.querySelector(`video[data-project = ${element.id}]`);

let projects = document.querySelectorAll('.projects-child');

projects.forEach((element) => {
    element.addEventListener('mouseenter', function () {
        findVideo(this).play();
    });
    element.addEventListener('mouseleave', function () {
        findVideo(this).pause();
    });
});

// GSAP Animations


gsap.registerPlugin(ScrollTrigger);

gsap.from('.skill-card > img', {
    filter: 'blur(40px)',
    scrollTrigger: {
        trigger: '#skills',
        scroller: 'body',
        start: 'top 50%',
        end: 'top 30%',
        scrub: true
    }
});

gsap.from('#project1 > .videoContainer > video', {
    x: '200px',
    y: '200px',
    scale: 0.2,
    scrollTrigger: {
        trigger: '#project1',
        scroller: 'body',
        start: 'top 30%',
        end: 'top 20%',
        scrub: 2,
    }
});

gsap.from('#project2 > .videoContainer > video', {
    x: '200px',
    y: '200px',
    scale: 0.2,
    scrollTrigger: {
        trigger: '#project2',
        scroller: 'body',
        start: 'top 30%',
        end: 'top 20%',
        scrub: 2,
    }
});

gsap.from('#project3 > .videoContainer > video', {
    x: '200px',
    y: '200px',
    scale: 0.2,
    scrollTrigger: {
        trigger: '#project3',
        scroller: 'body',
        start: 'top 30%',
        end: 'top 20%',
        scrub: 2,
    }
});

// project description animation

gsap.from('#project-descript-1', {
    x: '-100%',
    filter: 'blur(10px)',
    scrollTrigger: {
        trigger: '#project1',
        scroller: 'body',
        start: 'top 30%',
        end: 'top 20%',
        scrub: true
    }
});

gsap.from('#project-descript-2', {
    x: '-100%',
    filter: 'blur(10px)',
    scrollTrigger: {
        trigger: '#project2',
        scroller: 'body',
        start: 'top 30%',
        end: 'top 20%',
        scrub: true
    }
});

gsap.from('#project-descript-3', {
    x: '-100%',
    filter: 'blur(10px)',
    scrollTrigger: {
        trigger: '#project3',
        scroller: 'body',
        start: 'top 30%',
        end: 'top 20%',
        scrub: true
    }
});

gsap.from('#services-container', {
    y: 2000,
    opacity: -10,
    scrollTrigger: {
        trigger: '#Services',
        scroller: 'body',
        start: 'top 97%',
        end: 'top -10%',
        scrub: 2
    }
});

gsap.from('#custom-services', {
    width: '0vw',
    opacity: 0,
    scrollTrigger: {
        trigger: '#custom-services',
        scroller: 'body',
        start: 'top 70%',
        end: 'top 90%',
        scrub: 4
    }
})

gsap.from('#Contact-me > form', {
    y: 700,
    scale: 0.4,
    opacity: 0.4,
    scrollTrigger: {
        trigger: '#Contact-me',
        scroller: 'body',
        start: 'top 20%',
        end: 'top 17%',
        scrub: 4
    }
})

// email js setup

let emailConfirmPopup = document.querySelector('#popup');
let PopupBtn = document.querySelector('#popup button');
let popupMessage = document.querySelector('#popup p');
let formSubmitBtn = document.querySelector('form .btn');
let loader = document.querySelector('#loader');

PopupBtn.addEventListener('click', () => {
    emailConfirmPopup.style.display = 'none';
})

const serviceID = 'service_sho71bl';
const templateID = 'template_hp8mogl';

function collectdata() {

    let data = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        objective: document.querySelector('#objective').value,
        message: document.querySelector('#message').value
    }

    for (const key in data) {
        if (data[key].trim() === '') {
            popupMessage.innerHTML = 'Oops! Looks like some fields are missing or incomplete. Please check and try again.';
            emailConfirmPopup.style.display = 'flex';
            return null
        }
    }

    return data
}

function sendMail() {
    let data = collectdata();
    if (data === null) { return }
    loader.style.display = 'block';

    emailjs.send(serviceID, templateID, data)
        .then((resolve) => {
            loader.style.display = 'none';
            popupMessage.innerHTML = 'Thank you for reaching out. Your message has been received, and I will respond to you as soon as possible.';
            emailConfirmPopup.style.display = 'flex';
        })
        .catch((reject) => {
            loader.style.display = 'none';
            popupMessage.innerHTML = `We're sorry, but your message couldn't be sent right now. Please try again in a few moments, 
        or feel free to reach out directly at <a href='mailto:javaidhassan464@gmail.com' data-key='focus'>javaidhassan464@gmail.com</a>.
        Thanks for your patience!`;
            emailConfirmPopup.style.display = 'flex';
        });

}

formSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sendMail();
});

