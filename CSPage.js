// Create variable to store majors database in
let courses;
let major;

// Use fetch to retrieve database. Report any errors that occur in the fetch operation
// Once the majors have been successfully loaded and formatted as a JSON object
// using response.json(), run the initialize() function
fetch('courses.json').then(function(response){
                           if(response.ok){
                           response.json().then(function(json){
                                                courses = json;
                                                initialize();
                                                });

                           } else {
                           console.log('Network request for houses.json failed with response ' + response.status + ': ' + response.statusText);
                           }
                           });

fetch('majors.json').then(function(response){
                          if(response.ok){
                          response.json().then(function(json){
                                               majors = json;
                                               initialize();
                                               });

                          } else {
                          console.log('Network request for houses.json failed with response ' + response.status + ': ' + response.statusText);
                          }
                          });




// Sets up the logic, declares necessary variables, contains functions
function initialize() {
    let main = document.querySelector('main');
    //console.log("got to initialize");
    // grab the UI elements that we need to manipulate
    // Set both to equal an empty array
    majorReqs = [];

    // when the search button is clicked, invoke goTo() to load
    // the specific page for each major
    showMajor();

    // Display a major inside the <main> element
    function showMajor() {
        //console.log("got to showhouse");
        // create <section>, <h2>, <p>, and <img> elements
        let section = document.createElement('section');
        let major = document.createElement('h2');
        let advisors = document.createElement('h3');
        let course = document.createElement('p');
        let credits = document.createElement('p');

        major.textContent = "Department: " + majors.major;
        advisors.textContent = "Advisors: " + majors.advisors;
        course.textContent = "Course: " + majors.course;
        credits.textContent = "Credits Required: " + majors.credits;

        main.appendChild(section);
        section.appendChild(major);
        section.appendChild(advisors);

    }


    // start the process of updating the display with the new set of houses
    function updateDisplay() {
        //console.log("got to updatedisplay");
        // remove the previous contents of the <main> element
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }

        // if no houses match the search term, display a "No results to display" message
        if(finalGroup.length == 0) {
            //console.log("empty finalgroup");
            let para = document.createElement('p');
            para.textContent = 'No results to display!';
            main.appendChild(para);
            // for each house we want to display, pass its house object to fetchBlob()
        } else {
            //console.log("made it to else in updatedisplay");
            console.log("hi");
            for
        }

    }

    function showReq(major) {
        //console.log("got to showreq");
        // create <section>, <h2>, <p>, and <img> elements
        let section = document.createElement('section');
        let heading = document.createElement('h2');
        let subhead = document.createElement('h3');
        let desc = document.createElement('p');

        // Give the <h2> textContent equal to the house "name" property, but with the first character
        // replaced with the uppercase version of the first character
        heading.textContent = course.name;

        // Give the <h3> textContent equal to the house "area" property, but with the first
        // character replaced with the uppercase version of the first character
        subhead.textContent = course.number;

        // Give the <p>s textContent equal to the other house info
        desc.textContent = course.description;

        // append the elements to the DOM as appropriate, to add the house to the UI
        main.appendChild(section);
        section.appendChild(heading);
        section.appendChild(subhead);
        section.appendChild(desc);
    }

}
