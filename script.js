import { getProjects } from "./firebase.js";

// render projects

(async function () {
    try {
        let projects = await getProjects();
        let projectsCardContainer = document.querySelector('#project-card-container');

        if (!projects) {
            alert("Some error occured! projects could not load");
            return;
        }
        projects.forEach((project) => {
            let newCard = document.createElement('div');
            newCard.classList.add('project-card');

            newCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.img}" alt="">
                </div>
                <div class="project-content">
                    <h2 class="project-title">${project.title}</h2>
                    <p>${project.description}</p>
                    <div class="project-btn-container">
                        <button class="btn project-btn" data-key="focus"><a href="${project.githubCode}" data-key="focus" target="_blank">Checkout Code</a></button>
                        <button class="btn project-btn" data-key="focus"><a href="${project.liveWeb}" data-key="focus" target="_blank">See live Website</a></button>
                    </div>
                </div>`

            projectsCardContainer.appendChild(newCard);

        });

        applyGsaptoProjectCards()

    } catch (error) {
        alert('Some error occured! projects could not load');
    } finally {
        document.querySelector('#projectloader').style.display = 'none';
    }
})()

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


// Code for theme changing

let lightToDark = document.querySelector('.fa-moon');
let darkToLight = document.querySelector('.fa-sun');

let saveTheme = localStorage.getItem('theme');
if (saveTheme === 'light') {
    ConvertDarkToLight()
}

darkToLight.addEventListener('click', ConvertDarkToLight);

lightToDark.addEventListener('click', ConvertLightToDark);


function ConvertDarkToLight() {
    darkToLight.style.display = 'none';
    lightToDark.style.display = 'block';
    document.documentElement.style.setProperty('--primary-color', 'white');
    document.documentElement.style.setProperty('--secondary-color', 'black');
    document.documentElement.style.setProperty('--primary-color-2', '#dde3e9');
    document.documentElement.style.setProperty('--glassmorphism-color', 'rgba(221, 160, 221, 0.7)');
    localStorage.setItem('theme', 'light');
}


function ConvertLightToDark() {
    lightToDark.style.display = 'none';
    darkToLight.style.display = 'block';
    document.documentElement.style.setProperty('--primary-color', '#011627');
    document.documentElement.style.setProperty('--secondary-color', 'white');
    document.documentElement.style.setProperty('--primary-color-2', 'black');
    document.documentElement.style.setProperty('--glassmorphism-color', 'rgba(0, 0, 0, 0.7)');
    localStorage.setItem('theme', 'dark');
}


// code to play video on on mouseenter project


// GSAP Animations

// blur effect on skills logo

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

// animations on projects section

function applyGsaptoProjectCards() {

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#projects-section-heading",
            scroller: "body",
            start: "top 80%",
            end: "top -90%",
            scrub: true,
            markers: true,
        }
    });

    tl.from(".project-card", {
        y: 100,            // slide up
        opacity: 0,        // fade in
        rotation: -15,     // slight tilt
        scale: 0.8,        // pop in
        duration: 1.5,
        stagger: 1
    });



}

// services animation

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

// custom service animation

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

// contact me form animation

gsap.from('#Contact-me > form', {
    y: 700,
    scale: 0.4,
    opacity: 0.4,
    scrollTrigger: {
        trigger: '#Contact-me',
        scroller: 'body',
        start: 'top 70%',
        end: 'top 62%',
        scrub: 4
    }
})

// email js setup

let emailConfirmPopup = document.querySelector('#popup');
let PopupBtn = document.querySelector('#popup button');
let popupMessage = document.querySelector('#popup p');
let formSubmitBtn = document.querySelector('form .btn');
let loaderContainer = document.querySelector('#loader-container');
let loader = document.querySelector('#loader');

function dispalyLoaderForForm() {
    loaderContainer.style.backgroundColor = 'transparent';
    loader.style.borderBlock = '10px solid var(--secondary-color)';
    loaderContainer.style.display = 'block';
}

function hideLoaderForForm() {
    loaderContainer.style.display = 'none';
    loaderContainer.style.backgroundColor = 'black';
    loader.style.borderBlock = '10px solid white';
}


PopupBtn.addEventListener('click', () => {
    emailConfirmPopup.style.display = 'none';
})

const serviceID = 'service_sho71bl';
const templateID = 'template_hp8mogl';

let nameInput = document.querySelector('#name');
let emailInput = document.querySelector('#email');
let objectiveInput = document.querySelector('#objective');
let messageInput = document.querySelector('#message');

function cleanInput() {
    nameInput.value = '';
    emailInput.value = '';
    objectiveInput.value = '';
    messageInput.value = '';
}


function collectdata() {

    let data = {
        name: nameInput.value,
        email: emailInput.value,
        objective: objectiveInput.value,
        message: messageInput.value
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
    dispalyLoaderForForm();
    emailjs.send(serviceID, templateID, data)
        .then((resolve) => {
            hideLoaderForForm();
            popupMessage.innerHTML = 'Thank you for reaching out. Your message has been received, and I will respond to you as soon as possible.';
            emailConfirmPopup.style.display = 'flex';
            cleanInput()
        })
        .catch((reject) => {
            hideLoaderForForm();
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


// Website preloader code

window.addEventListener('load', () => {
    loaderContainer.style.display = 'none';
});

// giving controls to videos on mobile devices

const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
let videos = document.querySelectorAll('video');

if (isTouchDevice) {
    videos.forEach((video) => {
        video.setAttribute('controls', 'true');
        video.setAttribute('autoplay', 'true');
        video.setAttribute('loop', 'true');
    })
}

//mobile menue code

let mobileMenu = document.querySelector('.fa-bars');
let navbar = document.querySelector('nav');
let isMenuOpen = false;

mobileMenu.addEventListener('click', () => {
    if (isMenuOpen === false) {
        navbar.style.height = '324px';
        isMenuOpen = true;
    } else {
        navbar.style.height = '80px';
        isMenuOpen = false;
    }
})

