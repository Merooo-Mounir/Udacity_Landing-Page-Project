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
 * @var {string} navigation => <ul id="navbar__list"></ul>
 * @var sections => get all sections on the page.
 * 
 * @method Document.getElementById (@param {string} elementId: "navbar__list") => Returns a reference to the first object with the specified value of the ID attribute.
 * @method ParentNode.querySelectorAll<"section">(selectors:"section") => Returns all element descendants of node that match selectors("section").
*/

// navigation global variables
const navigation = document.getElementById('navbar__list');

// sections global variables
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Begin Main Functions
 * 
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
/**
 * build the nav
 * 
 * ES6 introduces a new kind of function called the arrow function.
 * Setting the value of innerHTML lets you append new contents to the existing one of an element.
 * (property) InnerHTML.innerHTML: string (append a new list item (<li>) to the existing list (<ul>)).
 * Template literals are literals delimited with backtick (`) characters.
 * placeholders, which are embedded expressions delimited by a dollar sign and curly braces: ${expression}.
 * 
 * @description Represents navBuilder => function to dynamically build the navigation menu.
 * 
 * @method sections.forEach (@param) section: HTMLElement => forEach calls the parameter section one time for each element in the list.
 * 
 * @var {string} sectionLink => Returns the value of element's id content attribute.
 * @var {string} sectionName => Select name of the section by data-nav (data-*).
 * 
 * @property {innerHTML} string => (ex.<li><a class="menu__link" href="#section1">Section 1</a></li>).
 */

// Dynamically build the navigation menu
const navBuilder = () => {
    
     // Iterate through each of the section 
     sections.forEach( section => {
        
        const sectionLink = section.id;
        
        const sectionName = section.dataset.nav;
        
        // Append all elements to navigation
        navigation.innerHTML += `<li><a class="menu__link" href="#${sectionLink}">${sectionName}</a></li>`;
    });
    
};

// Build menu 
// Call the function
navBuilder();

/**
 * Add class 'active' to section when near top of viewport
 *  
 * use the classList API to add and remove 'active' class
 * 
 * @description Represents sectionActive => function to add class 'active' to section when near top of viewport
 * 
 * @method sections.forEach (@param) section: HTMLElement => forEach calls the parameter section one time for each element in the list.
 * @method section.classList.add(string['your-active-class']) => if section is inviewport add class "your-active class"
 * @method section.classList.remove(string['your-active-class']') => if section is not inviewport remove class "your-active class"
 * @method addEventListener<"scroll">(type:"scroll",listener:sectionActive) 
 * @method Element.getBoundingClientRect() => to calculate distance from top ,Return pixel distance from top.
 * 
 * @var {number} elementOffset => Getting the largest value that's less or equal to the number
 */

const sectionActive = () => {
   
    // Iterate through each of the section 
    sections.forEach(section => {
        
        const elementOffset = section.getBoundingClientRect().top - 50;
        
        // determines if 'section' is in viewport
        return (elementOffset < 150 && elementOffset >= -150) ?
            
            section.classList.add('your-active-class') : section.classList.remove('your-active-class');
        
    });
};

// Set sections as active
window.addEventListener('scroll', sectionActive);

/**
 * Make the active section's tab active in the navigation bar
 * 
 * @description Represents navigationActive => function to make the active section's tab active in the navigation bar.
 * 
 * @method NavLinks.forEach (@param) link: Element => forEach calls the parameter link one time for each element in the list.
 * @method link.classList.add(string['active']) => if Link is inviewport add class "active".
 * @method link.classList.add(string['active']) => if Link is not inviewport remove class "active".
 * @method document.querySelectorAll<Element>(selectors:string) => Returns all element descendants of node that match selectors ("nav ul li a").
 * @method document.querySelector(selectors:link.hash) => Returns the first element that is a descendant of node that matches selectors (link.hash) .
 * @method addEventListener<"scroll">(type:"scroll",listener:navigationActive).
 * 
 * @var {NodeListOf<Element>} NavLinks => Collect all li links
 * @var {string} section => returns a string containing a '#' followed by the fragment identifier of the URL
 * @var {number} fromTop => returns the number of pixels that the document is currently scrolled vertically
 * @var {number} sectionTop => read-only property returns the distance of the outer border of the current element relative to the inner border of the top
 * @var {number} sectionHeight => read-only property returns the height of section,, including vertical padding and borders
 */

//   
const navigationActive = () => {
    
    // Collect all li links
    let NavLinks = document.querySelectorAll('nav ul li a');
    
    // Iterate through each of the li links
    NavLinks.forEach(link => {
        
        let section = document.querySelector(link.hash);
        let fromTop = window.scrollY;
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight ;
        
        // determines if 'link' is in viewport
        return (sectionTop < fromTop && sectionTop + sectionHeight / 2 > fromTop) ?
            
            link.classList.add('active') : link.classList.remove("active");
        
    });
};

// Set navigation Links as active
window.addEventListener("scroll",navigationActive);

/**
 * Scroll to anchor ID using scrollTO event
 * 
 * Define selector for selecting anchor links with the hash
 * @method document.querySelectorAll<Element>(selectors:string) => Returns all element descendants of node that match selectors ("a[href^="#"]").
 * @method anchorList.forEach (@param) link: Element => forEach calls the parameter link one time for each element in the list.
 * @method Event.preventDefault() => Prevent scrolling if the hash value is blank.
 * @method addEventListener<"click">(type:"click",listener:function(e))
 * 
 * @description Represents scrollTo ((@property) ScrollToOptions.top?: number, (@property) ScrollOptions.behavior?: ScrollBehavior).
 * 
 * @var {string} anchorList => Collect all such anchor links
 * @var {string} href
 * @var {number} offsetTop
*/
 
// Collect all such anchor links
let anchorList = document.querySelectorAll('a[href^="#"]');
         
// Iterate through each of the links
anchorList.forEach(link => {
    
    // Scroll to section on link click
    link.addEventListener ("click", function (e) {
        
        // Prevent scrolling if the hash value is blank
        e.preventDefault();

        // Get the destination to scroll to using the hash property
        //let destination =  document.querySelector(this.hash);
        
        const href = this.getAttribute("href");
        const offsetTop = document.querySelector(href).offsetTop;
        
        //Scroll to the destination using scrollto method
        scrollTo({
            top: offsetTop,
            behavior: "smooth"
        });
        
        // Scroll to the destination using scrollIntoView method
        //destination.scrollIntoView({ behavior: 'smooth' });

    })

});


/**
 * End Main Functions
 * 
*/

/** 
 * Using the scrollTo() Method
 * Inside this method, we’ll determine the scrolling behavior via the behavior configuration property. 
 * This property is the JavaScript representation of the scroll-behavior CSS property 
 * and can receive the auto (default) and smooth values. 
 * All we have to do is to set the value of the behavior property to smooth.
*/

/** 
 * Using the scrollIntoView() Method
 * As scroll methods which are attached to the window object (i.e. window.scroll()), 
 * there’s also the scrollIntoView() method which applies to DOM elements. 
 * This can accept as well the familiar behavior property with the value set to smooth.
*/
 






