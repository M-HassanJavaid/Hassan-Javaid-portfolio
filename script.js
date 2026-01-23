import { getProjects } from "./firebase.js";

const signatureElem = document.querySelector('#logo > img');

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

        applyGsap()

    } catch (error) {
        alert(error.message);
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
    signatureElem.src = './assets/light-sign.png';
    document.documentElement.style.setProperty('--primary-color', 'white');
    document.documentElement.style.setProperty('--secondary-color', 'black');
    document.documentElement.style.setProperty('--primary-color-2', '#dde3e9');
    document.documentElement.style.setProperty('--glassmorphism-color', 'rgba(221, 160, 221, 0.7)');
    localStorage.setItem('theme', 'light');
}


function ConvertLightToDark() {
    lightToDark.style.display = 'none';
    darkToLight.style.display = 'block';
    signatureElem.src = './assets/signature.png';
    document.documentElement.style.setProperty('--primary-color', '#011627');
    document.documentElement.style.setProperty('--secondary-color', 'white');
    document.documentElement.style.setProperty('--primary-color-2', 'black');
    document.documentElement.style.setProperty('--glassmorphism-color', 'rgba(0, 0, 0, 0.7)');
    localStorage.setItem('theme', 'dark');
}


// code to play video on on mouseenter project


// GSAP Animations




function applyGsap() {

    // animations on projects section
    let projectTimeline = gsap.timeline({

    });

    document.querySelectorAll('.project-card').forEach((elem) => {
        gsap.from(elem, {
            y: 100,            // slide up
            opacity: 0,        // fade in
            rotation: -15,     // slight tilt
            scale: 0.8,        // pop in
            duration: 1.5,
            scrollTrigger: {
                trigger: elem,
                scroller: "body",
                start: "top 70%",
                // end: "top -90%",
                // scrub: true,
                markers: true,
                toggleActions: "play none none reverse"

            }
        });
    })


    // blur effect on skills logo

    gsap.from('.skill-card > img', {
        // filter: 'blur(40px)',
        opacity: 0,
        y: 200,
        scrollTrigger: {
            trigger: '#skills',
            scroller: 'body',
            start: 'top 50%',
            end: 'top 30%',
            scrub: 3
        }
    });

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
    });

    //contact form animation

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#contact-section",
            start: "top 80%", // Animation starts when section is 80% from the top
            toggleActions: "play none none reverse"
        }
    });

    // Animate the text and info
    tl.from(".form-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
    })

        // Animate the Glass Card
        .from(".contact-card", {
            scale: 0.9,
            opacity: 0,
            duration: 1,
            ease: "expo.out"
        }, "-=0.5")

        // Animate the Input fields one by one
        .from(".input-group", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out"
        }, "-=0.5")

        // Final button pop
        .from(".submit-btn", {
            y: 10,
            opacity: 0,
            duration: 0.5
        }, "-=0.2");

    // about us animation

    const text = new SplitType('.reveal-text', { types: 'words' });

    // Wrap each word in a container with overflow:hidden
    // This is what creates the "sliding out of nowhere" effect
    text.words.forEach(word => {
        const wrapper = document.createElement('span');
        wrapper.classList.add('word-inner');
        wrapper.innerHTML = word.innerHTML;
        word.innerHTML = '';
        word.appendChild(wrapper);
    });

    // 2. Register ScrollTrigger
    // gsap.registerPlugin(ScrollTrigger);

    // 3. Create the animation
    gsap.to('.word-inner', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
            trigger: '.reveal-text',
            start: 'top 80%', // Starts when the top of the text hits 80% of the viewport
            end: 'top 20%',
            toggleActions: 'play none none reverse', // Plays on scroll down, reverses on scroll up
            // markers: true
        }
    });

    ScrollTrigger.refresh();


}



// email js setup

let emailConfirmPopup = document.querySelector('#popup');
let PopupBtn = document.querySelector('#popup button');
let popupMessage = document.querySelector('#popup p');
let formSubmitBtn = document.querySelector('.submit-btn');
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
let messageInput = document.querySelector('#message');

function cleanInput() {
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
}


function collectdata() {

    let data = {
        name: nameInput.value,
        email: emailInput.value,
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
    console.log(data)
    if (data === null) { return }
    dispalyLoaderForForm();
    emailjs.send(serviceID, templateID, data)
        .then((resolve) => {
            hideLoaderForForm();
            popupMessage.innerHTML = 'Thank you for reaching out. Your message has been received, and I will respond to you as soon as possible.';
            emailConfirmPopup.style.display = 'flex';
            cleanInput()
        })
        .catch((err) => {
            hideLoaderForForm();
            popupMessage.innerHTML = `We're sorry, but your message couldn't be sent right now. Please try again in a few moments, 
            or feel free to reach out directly at <a href='mailto:javaidhassan464@gmail.com' data-key='focus'>javaidhassan464@gmail.com</a>.
            Thanks for your patience!`;
            emailConfirmPopup.style.display = 'flex';
            alert(err.message)
        });

}

formSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sendMail();
});


// Website preloader code

window.addEventListener('load', () => {
    loaderContainer.style.display = 'none';

    gsap.from('#name-container', {
        height: 0,
        duration: 2,
    });

    gsap.from('#hero-content-1', {
        x: '-100%',
        duration: 3,
    });
    gsap.from('#hero-content-2', {
        x: '100%',
        duration: 3,
    })
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
});