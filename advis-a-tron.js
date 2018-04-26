// Create variable to store majors database in
let majors;

// Use fetch to retrieve database. Report any errors that occur in the fetch operation
// Once the majors have been successfully loaded and formatted as a JSON object
// using response.json(), run the initialize() function
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
    majorGroup = [];
    courseGroup = [];

    // when the search button is clicked, invoke goTo() to load
    // the specific page for each major
    Submit.onclick = goTo;

    function goTo() {
      let goToTarget = document.querySelector('#major');
      console.log(goToTarget.value);
      if (goToTarget.value == "Computer Science") {
        window.open("CSPage.html");
      } else if (goToTarget.value == "Math") {
        window.open("MathPage.html");
      // only go to CS page for now
      //window.open("CSpage.html");
    }

}
    // start the process of updating the display




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
