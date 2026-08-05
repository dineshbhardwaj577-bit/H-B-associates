// AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 80
});

// Sticky Header
window.addEventListener("scroll", function () {
    const header = document.querySelector(".main-header");

    if (window.scrollY > 80) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
});


//mobile header
const menu = document.getElementById("menu");
const menuIcon = document.querySelector(".menu-icon");

if (menu && menuIcon) {

    menu.addEventListener("show.bs.collapse", function () {
        menuIcon.classList.remove("bi-list");
        menuIcon.classList.add("bi-x-lg");
    });

    menu.addEventListener("hide.bs.collapse", function () {
        menuIcon.classList.remove("bi-x-lg");
        menuIcon.classList.add("bi-list");
    });

}


//mobile menu header close after click menu

document.querySelectorAll(".navbar-nav .nav-link, .theme-btn").forEach(link => {

    link.addEventListener("click", function () {

        const bsCollapse = bootstrap.Collapse.getInstance(menu);

        if (bsCollapse) {
            bsCollapse.hide();
        }

    });

});



// Counter
const counters = document.querySelectorAll(".counter");

const startCounter = () => {

    counters.forEach(counter => {

        const target = +counter.dataset.count;

        let count = 0;

        const speed = target / 80;

        const update = () => {

            count += speed;

            if (count < target) {

                counter.innerText = Math.ceil(count);

                requestAnimationFrame(update);

            } else {

                counter.innerText = target + "+";

            }

        }

        update();

    });

}

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            startCounter();

            observer.disconnect();

        }

    });

});

observer.observe(document.querySelector(".trust-bar"));


/*==========================
TESTIMONIAL
==========================*/
const slider = new Swiper(".testimonialSlider", {

    loop: true,

    speed: 800,

    autoplay: {

        delay: 3500,

        disableOnInteraction: false,

    },

    navigation: {

        nextEl: ".testimonial-next",

        prevEl: ".testimonial-prev",

    }

});

const avatars = document.querySelectorAll(".avatar");

slider.on("slideChange", () => {

    avatars.forEach(item => item.classList.remove("active"));

    const real = slider.realIndex;

    avatars.forEach(item => {

        if (item.dataset.slide == real) {

            item.classList.add("active");

        }

    });

});

avatars.forEach(item => {

    item.addEventListener("click", () => {

        slider.slideToLoop(item.dataset.slide);

    });

});
/*==========================
scroll progress
==========================*/

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const docHeight = document.body.scrollHeight - window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    document.querySelector(".scroll-progress").style.width = progress + "%";

});

/*==========================
Back To Top
==========================*/
const backTop = document.querySelector(".back-top");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backTop.classList.add("active");

    } else {

        backTop.classList.remove("active");

    }

});

backTop.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

/*==========================
Page Loader
==========================*/
window.addEventListener("load", () => {

    document.querySelector(".page-loader").classList.add("hide");

});

/*==========================
Smooth Scroll
==========================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior: "smooth"

        });

    });

});

/*==========================================
EMAILJS CONTACT FORM
==========================================*/

emailjs.init("5Ka0DLU3LweFxqjeK");

document.querySelectorAll(".contactForm").forEach(function (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');

        const btnText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending...";

        emailjs.sendForm(
            "service_fu2l83v",
            "template_9h9ikva",
            this
        ).then(() => {

            submitBtn.innerHTML = "Submitted Successfully";

            this.reset();

            setTimeout(() => {

                window.location.href = "thank-you.html";

            }, 1500);

        }).catch((error) => {

            console.log(error);

            submitBtn.disabled = false;

            submitBtn.innerHTML = btnText;

            window.location.href = "error.html";

        });

    });

});

/*==========================================
Enquary CONTACT FORM
==========================================*/

window.addEventListener("load", function () {

    if (!sessionStorage.getItem("popupShown")) {

        setTimeout(function () {

            const modal = new bootstrap.Modal(document.getElementById("enquiryModal"));

            modal.show();

            sessionStorage.setItem("popupShown", "yes");

        }, 1000);

    }

});