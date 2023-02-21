/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

// Get nav list
const navList = document.getElementById('navbar__list');
// get dropdown nav list
const dropdown = document.getElementById('dropdown');
// Get array of all sections on window
const sections = document.querySelectorAll('section');
// Get object of section dimensions locations in window
const boxes = getBoxDimensions()
// Get burger icon
const burger = document.querySelector('#icon');
// Get page location id
const pageLocationID = document.querySelector('#page__location');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// 
function getBoxDimensions() {
    const allSections = {};
    for (const section of sections) {
        const box = section.getBoundingClientRect();
        allSections[section.id] = box;
    }
    return allSections;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
// Get all sections on window
generateNav('navbar__list');
generateNav('dropdown');

// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', () => {
    
    currentLocation = document.body.scrollTop;
    if (currentLocation < boxes['section1'].y) {
        pageLocationID.innerText = 'Landing Page';
    } else if (currentLocation > boxes['section1'].y && currentLocation < boxes['section2'].y) {
        pageLocationID.innerText = 'Section 1';
        makeActive(currentLocation, 'section1');
    } else if (currentLocation > boxes['section2'].y && currentLocation < boxes['section3'].y) {
        pageLocationID.innerText = 'Section 2';
        makeActive(currentLocation, 'section2');
    } else if (currentLocation > boxes['section3'].y && currentLocation < boxes['section4'].y) {
        pageLocationID.innerText = 'Section 3';
        makeActive(currentLocation, 'section3');
    } else if (currentLocation > boxes['section4'].y && currentLocation < boxes['section4'].bottom) {
        pageLocationID.innerText = 'Section 4';
        makeActive(currentLocation, 'section4');
    }
});

function makeActive(currentLocation, currentSection){
    //Find a value that works best, but 150 seems to be a good start.
    if (boxes[currentSection].top <= currentLocation && boxes[currentSection].bottom >= currentLocation) {
        //apply active state on current section and corresponding Nav link
        document.getElementById(currentSection).classList.add('your-active-class');
    }
    //Remove active state from other section and corresponding Nav link
    for (const section of sections) {
        if (section.id !== currentSection){
            document.getElementById(section.id).classList.remove('your-active-class');
        }
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Toggle between showing and hiding the navigation menu when the user clicks on the hamburger menu / bar icon
window.addEventListener('resize', () => {
    // Toggle burger on
    if (window.innerWidth <= 700) {
        burger.classList.remove('hidden');
        burger.classList.add('show');
        navList.classList.remove('show');
        navList.classList.add('hidden');
    } 
    if (window.innerWidth > 700) {
        burger.classList.remove('show');
        burger.classList.add('hidden');
        navList.classList.remove('hidden');
        navList.classList.add('show');
    }
  });

// Toggle between showing and hiding the navigation menu when the user clicks on the hamburger menu / bar icon
function generateNav (whichParent) {

    // loop through all sections and create a list item for each section
    for (let i = 0; i < sections.length; i++) {
        // get section name and id
        const section = sections[i];
        // Get box top
        //const boxTop = isWindowTop(section);
        const boxTop = boxes[section.id].top + window.pageYOffset;
        // get section name - used for nav link text
        const sectionName = section['dataset']['nav'];
        // get section id - used for linking
        const sectionId = section['id'];
        // create list item
        const sectionNav = document.createElement('li');
        sectionNav.setAttribute('class', 'dropdown__link');
        // create link
        const sectionLink = document.createElement('a');
        // set link attributes
        //sectionLink.setAttribute('href', `#${sectionId}`);
        // set link classes
        sectionLink.setAttribute('class', 'menu__link');
        // set link text
        sectionLink.innerText = sectionName;
        // set onclick event
        sectionLink.setAttribute('onclick', `smoothScroll('${boxTop}')`);
        // append link to list item
        sectionNav.appendChild(sectionLink);
        // get nav bar
        const navList = document.getElementById(whichParent);
        // append list item to nav bar
        navList.appendChild(sectionNav);
    }
}

function clickBurger() {

    var link = document.getElementsByClassName('dropdown__link');

    if (burger.classList.contains('active')) {
        dropdown.classList.add('hidden');
        dropdown.classList.remove('show');
        burger.classList.remove('active');
    } else {
        burger.classList.add('active');
        dropdown.classList.add('show');
        dropdown.classList.remove('hidden');  
    }
}

// Scroll to anchor ID using scrollTO event
function smoothScroll(to) {

    console.log(to)

    const boxTop = to;

    window.scrollTo({top: boxTop, behavior: 'smooth'});
    
}

