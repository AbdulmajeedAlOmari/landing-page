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
 * Define Global Variables
 *
*/

/**
 * Number of Sections: number of section tabs in the navbar (recommended between 3 and 5)
 * default value: 3
 */
const NUMBER_OF_SECTIONS = 3;

/**
 * List of Sections: contains list of section elements with their content
 */
const LIST_OF_SECTIONS = [];

/**
 * Current Active Section: points to the current active section
 */
let currentActiveSection;

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

/**
 * Creates a list of navbar elements and returns them.
 */
function generateNavbarElements() {
  const sectionNavbarElementList = [];

  for (let i = 0; i < NUMBER_OF_SECTIONS; i++) {
    // Contains (li) element which holds the anchors
    const listElement = document.createElement("li");

    // Contains (a) element which points to the desired section using (href) attribute
    const innerAnchorElement = document.createElement("a");

    // Construct anchor element content (textContent, class, href)
    innerAnchorElement.textContent = `Section ${i+1}`;
    innerAnchorElement.classList.add("menu__link");
    innerAnchorElement.href = `#section${i+1}`;
    listElement.id = `navbar-item-section${i+1}`

    // Append the anchor element to the section
    listElement.appendChild(innerAnchorElement);

    // Add them to the list to return them later
    sectionNavbarElementList.push(listElement);
  }

  return sectionNavbarElementList;
}

function generateSectionsContent() {

  for (let i = 0; i < NUMBER_OF_SECTIONS; i++) {
    const sectionElement = document.createElement("section");
    const divElement = document.createElement("div");
    const sectionHeaderElement = document.createElement("h2");
    const paragraphElement = document.createElement("p");

    sectionElement.id = `section${i+1}`;

    divElement.classList.add("landing__container");

    sectionHeaderElement.textContent = `Section ${i+1}`;

    paragraphElement.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.";

    divElement.appendChild(sectionHeaderElement);
    divElement.appendChild(paragraphElement);

    sectionElement.appendChild(divElement);

    LIST_OF_SECTIONS.push(sectionElement);
  }

  return LIST_OF_SECTIONS;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNavbar() {
  // First, we initiate the document fragment to fill it with the sections
  // instead of manipulating the actual documnt (better performance)
  const documentFragment = document.createDocumentFragment();

  const generatedListOfElements = generateNavbarElements();

  // Append all of the section anchor tags
  generatedListOfElements.forEach(element => {
    documentFragment.appendChild(element);
  })

  // We get the navbar holder/container to fill it with the wanted sections
  const navbarContainerElement = document.getElementById("navbar__list");

  navbarContainerElement.appendChild(documentFragment);
}

// build the sections
function buildSections() {
  const documentFragment = document.createDocumentFragment();

  // Rretrieve list of sections with their content
  const generatedListOfSections = generateSectionsContent();

  // Append all of the sections in the document fragment
  generatedListOfSections.forEach(section => {
    documentFragment.appendChild(section);
  })

  // Get main section to append all the generated sections
  const sectionsContainerElement = document.getElementById("main-section");

  sectionsContainerElement.appendChild(documentFragment);
}

// Add class 'active' to section when near top of viewport
function onScroll(e) {

  // Initially, set the last element as the temp active section
  let tempActiveSection = currentActiveSection;

  const currentHeight = window.pageYOffset || document.documentElement.scrollTop;

  // Start from the bottom to check whether they are the active element
  for(let i = LIST_OF_SECTIONS.length-1; i >= 0; i--) {
    if(LIST_OF_SECTIONS[i].offsetTop < currentHeight + 400) {
      tempActiveSection = LIST_OF_SECTIONS[i];
      break;
    }
  }

  // Save the old active section to remove its active class
  let oldActiveSection = currentActiveSection;

  // If the new active section is not the same as before, change it to active
  if(tempActiveSection.id !== currentActiveSection.id) {
    currentActiveSection = tempActiveSection;
    // Activate current section and remove it from the old one
    currentActiveSection.classList.add("active-section");
    oldActiveSection.classList.remove("active-section");

    // Highlight the navbar item above to the current section
    document.getElementById(`navbar-item-${currentActiveSection.id}`).classList.add("active-navbar-item");
    document.getElementById(`navbar-item-${oldActiveSection.id}`).classList.remove("active-navbar-item");
  }
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu & sections
document.addEventListener('DOMContentLoaded', function () {
  buildNavbar();
  buildSections();
  currentActiveSection = document.querySelector("#section1");
  currentActiveSection.classList.add("active-section");
  document.querySelector("#navbar-item-section1").classList.add("active-navbar-item")
})

// Set sections as active
document.addEventListener('scroll', onScroll)

