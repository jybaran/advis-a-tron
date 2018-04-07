// Create variable to store houses database in
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
    areaGroup = [];
    finalGroup = [];

    // when the search button is clicked, invoke selectArea() to start
    // a search running to select the category of houses we want to display
    searchBtn.onclick = selectMajor;


    // JENNY: lots of this is bad
    function selectMajor(e) {
        //console.log("got to select area");
        majorTarget = [];
        for (let i = 0; i < tempMajorTarget.length; i++) {
            if (tempMajorTarget[i].checked) {
                areaTarget.push(tempMajorTarget[i].value);
            }
        }
        //console.log(areaTarget);
        // Use preventDefault() to stop the form submitting — that would ruin
        // the experience
        e.preventDefault();
    }

    // selectHouses() Takes the group of houses selected by selectArea(), and further
    // filters them by the other limits (if any have been entered)
    function selectMajor() {
        console.log("got to selectmajor");
        // If no further limits have been entered, just make the finalGroup array equal to the areaGroup
        // array — we don't want to filter the houses further — then run updateDisplay().


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
            for(let i = 0; i < finalGroup.length; i++) {
                fetchBlob(finalGroup[i]);
            }
        }
    }

    // Display a house inside the <main> element
    function showMajor(objectURL, house) {
        //console.log("got to showhouse");
        // create <section>, <h2>, <p>, and <img> elements

        credits.textContent = "Credits Required: " + major.credits;
        core.textContent = "Core Classes: " + major.core;

    }
}
