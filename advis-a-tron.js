// Create variable to store majors database in
let majors;

// Use fetch to retrieve database. Report any errors that occur in the fetch operation
// Once the houses have been successfully loaded and formatted as a JSON object
// using response.json(), run the initialize() function
fetch('majors.json').then(function(response){
                          if(response.ok){
                          response.json().then(function(json){
                                               majors = json;
                                               majors.sort( function( a, b ) {
                                                           a = a.name.toLowerCase();
                                                           b = b.name.toLowerCase();

                                                           return a < b ? -1 : a > b ? 1 : 0;
                                                           });
                                               majors.sort();
                                               initialize();
                                               });

                          } else {
                          console.log('Network request for houses.json failed with response ' + response.status + ': ' + response.statusText);
                          }
                          });


// Sets up the logic, declares necessary variables, contains functions
function initialize() {
    //console.log("got to initialize");
    // grab the UI elements that we need to manipulate
    let tempMajorTarget = document.getElementsByName('#major');

    updateDisplay();

    // Set both to equal an empty array, in time for searches to be run
    majorGroup = [];
    courseGroup = [];

    // when the search button is clicked, invoke goTo() to load
    // the specific page for each major
    searchBtn.onclick = goTo;

    function goTo() {
      let goToTarget = document.getElementById('#major');
      console.log(goToTarget);
      // only go to CS page for now
      window.open("CSpage.html");
    }


    // start the process of updating the display
    function updateDisplay() {
        //console.log("got to updatedisplay");
        // remove the previous contents of the <main> element
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }

        // if nothing to show, display a "No results to display" message
        if(finalGroup.length == 0) {
            //console.log("empty finalgroup");
            let para = document.createElement('p');
            para.textContent = 'No results to display!';
            main.appendChild(para);
            // for each thing in major we want to display, pass its object to fetchBlob()
        } else {
            //console.log("made it to else in updatedisplay");
            for(let i = 0; i < finalGroup.length; i++) {
                fetchBlob(finalGroup[i]);
            }
        }
    }


    // Display a major inside the <main> element
    function showMajor(objectURL, house) {
        //console.log("got to showhouse");
        // create <section>, <h2>, <p>, and <img> elements
        major.textContent = "Department: " + major.major;
        advisors.textContent = "Majors: " + major.advisors;
        course.textContent = "Course: " + major.course;
        credits.textContent = "Credits Required: " + major.credits;
    }
}
