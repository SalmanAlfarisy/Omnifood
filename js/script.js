// Global Variable
const headerEl = document.querySelector(".header");

// Fixing flexbox gap property missing in some Safari browser
function checkFlexGap(){
    const flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.gap = "1px";

    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));

    document.body.appendChild(flex);
    const isSupported = flex.scrollHeight === 1;
    console.log(isSupported);

    if(!isSupported){
        document.body.classList.add("no-flexbox-gap");
    }
}

// Set up current year
function currentYearFooter(){
    const yearEl = document.querySelector(".year");
    const currentYear = new Date().getFullYear();
    yearEl.textContent = currentYear;
}

// Make mobile nav 
function toggleMobileNav(){
    const btnNav = document.querySelector(".btn-mobile-nav");

    btnNav.addEventListener('click', function(){
        headerEl.classList.toggle('nav-open');
    });
}

// Smooth Scrolling Animation
function scrollingAnimation(){
    const allLinks = document.querySelectorAll("a:link");
    allLinks.forEach(function(link){
        link.addEventListener('click', function(e){
            e.preventDefault();
            const href = link.getAttribute('href');
            console.log(href);

            // Scroll back to top
            if (href === "#"){
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            }

            // Scroll to other links
            if(href !== "#" && href.startsWith('#')){
                const sectionEl = document.querySelector(href);
                sectionEl.scrollIntoView({behavior: "smooth"});
            }

            // Close mobile navigation
            if(link.classList.contains('main-nav-link')){
                headerEl.classList.toggle('nav-open');
            } 
        });
    });
}


// Sticky Navigation
function stickyNavigation(){
    const sectionHeroEl = document.querySelector(".section-hero");
    const obs = new IntersectionObserver(function(entries){
        const ent = entries[0];
        if(ent.isIntersecting === false){
            document.body.classList.add("sticky");
        }

        if(ent.isIntersecting === true){
            document.body.classList.remove("sticky");
        }
    }, 
    {
        // in the viewport
        root: null,
        threshold: 0,
        rootMargin: '-80px'
    });
    obs.observe(sectionHeroEl);
}



checkFlexGap();
currentYearFooter();
toggleMobileNav();
scrollingAnimation();
stickyNavigation();