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
    //console.log("got to initialize");
    // grab the UI elements that we need to manipulate
    // Set both to equal an empty array, in time for searches to be run
    majorReqs = [];

    // when the search button is clicked, invoke goTo() to load
    // the specific page for each major
    showMajor();

    // Display a major inside the <main> element
    function showMajor() {
        //console.log("got to showhouse");
        // create <section>, <h2>, <p>, and <img> elements
        major.textContent = "Department: " + courses.major;
        advisors.textContent = "Majors: " + courses.advisors;
        course.textContent = "Course: " + courses.course;
        credits.textContent = "Credits Required: " + courses.credits;
    }
}
