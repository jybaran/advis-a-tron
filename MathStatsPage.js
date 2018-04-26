// global variables
let coursesJSON = null;
let majors = null;
let courses = null;
let requirements = null;
let reqsDone = null;
let div = document.createElement("div");

// Use fetch to retrieve database. Report any errors that occur in the fetch operation
// Once the majors have been successfully loaded and formatted as a JSON object
// using response.json(), run the initialize() function
fetch('courses.json').then(function(response){
    if(response.ok){
        response.json().then(function(json){
            coursesJSON = json;
            initialize();
        });

    } else {
        console.log('Network request for courses.json failed with response ' + response.status + ': ' + response.statusText);
    }
});

fetch('majors.json').then(function(response){
    if(response.ok){
        response.json().then(function(json){
            majors = json;
            initialize();
        });

    } else {
        console.log('Network request for majors.json failed with response ' + response.status + ': ' + response.statusText);
    }
});




// declares necessary variables, contains functions
function initialize() {
  // ensuring the data sets are non empty
    if (coursesJSON == null || majors == null) {
      return
    }
    let main = document.querySelector('main');
    // grab the UI elements that we need to manipulate
    // Set requirements equal to an empty array
    majorReqs = [];
    // when the search button is clicked load specific page for each major
    showMajor();
    Submit.onclick = checkBoxes;

    // Display a major inside the <main> element
    function showMajor() {
        // create <section>, <h2>, <p>, and <img> elements
        let section = document.createElement('section');
        let major = document.createElement('h2');
        let advisorsList = document.createElement('h3');

        // setting up which major the user chose and initializing all the variables
        // to be used later (mostly for HTML purposes)
        major.textContent = "Department: Mathematics Stats";
        let advisors = majors["Mathematics Stats"].advisors;
        advisorsList.textContent = "";
        for (let advisor of advisors) {
          advisorsList.textContent = advisorsList.textContent.concat(advisor, ", ");
        }
        courses = majors["Mathematics Stats"].courses;

        section.appendChild(major);
        section.appendChild(advisorsList);
        main.appendChild(section);

        div.innerHTML = "";
        for (let key in courses) {
          let c = document.createElement("Input");
          c.setAttribute("type", "checkbox");
          c.value = key;
          div.innerHTML = div.innerHTML.concat(" ", '<label for=' +key + '><input type = "checkbox" id = ' + key + '>' + key + '</label> </br>')
        }
        section.appendChild(div);
    }
    // this function processes which courses have been selected by the user
    function checkBoxes(e) {
      e.preventDefault();
      requirements = majors["Mathematics Stats"].reqlist;
      reqsDone = {};
      for (let i = 0; i<div.children.length;i+=2) {
        let child = div.children[i].children[0];
        if (child.checked) {
          reqsDone[child.id] = courses[child.id];
        }
      }
      updateDisplay();
    }

    //this function puts the dictionary of taken courses
    // into a more palatable format
    function displayHelper() {
      sumReqs = [];
      for (key in reqsDone) {
        if (sumReqs.length==0) {
          for (j=0;j<reqsDone[key].length;j++) {
          	sumReqs.push(reqsDone[key][j]);
          }
        } else {
          temp = reqsDone[key];
          for (let i = 0; i < sumReqs.length; i++) {
            sumReqs[i] = sumReqs[i] + temp[i];
          }
        }
      }
      return sumReqs;
    }
    // simple find-max-element-of-array function
    function findMax(array) {
      max = null;
      for (let i = 0; i<array.length; i++) {
        if (max == null) {
          max = array[i];
        } else {
          if (array[i] > max) {
            max = array[i];
          }
        }
      }
      return max;
    }
    // simple find-min-element-of-array function
    function findMin(array) {
      min = null;
      index = null;
      for (let i = 0; i<array.length; i++) {
        if (min == null && array[i] != 0) {
          min = array[i];
          index = i;
        } else {
          if (array[i] < min && array[i] != 0) {
            min = array[i];
            index = i;
          }
        }
      }
      return [min, index];
    }
    // this function checks to see which courses the user has taken and marks
    // their corresponding requirement 'slot' as satisfied
    function processReqs(sumReqs) {
      preqs = true;
      filled = {};
      while (preqs) {
        minItem = findMin(sumReqs);
        minIndex = minItem[1];
        minItem = minItem[0];
        for (item in reqsDone) {
          req = reqsDone[item];
          if (req[minIndex] != 0) {
            // if we're here, using current course to fill a req
            filled[item] = requirements[minIndex];
            for (let i = 0; i<sumReqs.length;i++) {
              sumReqs[i] = sumReqs[i]-req[i];
            }
            sumReqs[minIndex] = 0;
            break;
          }
        }
        max = findMax(sumReqs);
        if (max == 0) {
          preqs = false;
        }
      }
      return filled;
    }

    // this function displays all of the information in the HTML element of the page
    function updateDisplay() {
      while (main.firstChild) {
          main.removeChild(main.firstChild);
      }
      // LEFT TO DO:
      // compare filled requirements to as of yet unsatisfied requirements
      // take unsatisfied reqs and display corresponding courses on page
      // Call display helper to sum the binary indicators for requirements courses fill
      reqsSum = displayHelper();
      // Call process reqs to mark requirements filled based on courses taken
      filledReqs = processReqs(reqsSum);
      //Deal with everything that's not filled
      filledKeys = Object.keys(filledReqs);
      unfilled = {};
      reqDescription = majors["Mathematics Stats"].reqdict;
      for (let i=0;i<requirements.length;i++) {
      	r = requirements[i];     //the requirement category
      	if (!(filledKeys.includes(r))) {
      		for (c in courses) {
      			if (courses[c][i] == 1 && !Object.keys(reqsDone).includes(c)) {
      				if (reqDescription[r] in unfilled) {
      					unfilled[reqDescription[r]].push(c);
      				} else {
      					unfilled[reqDescription[r]] = [c];
      				}
      			}
      		}
      	}
      }
      console.log(unfilled);
    }
    // this displays all information for a given course
    // USED FOR TESTING PURPOSES AND DEBUGGING
    function showReq(major) {
        //console.log("got to showreq");
        // create <section>, <h2>, <p>, and <img> elements
        let section = document.createElement('section');
        let heading = document.createElement('h2');
        let subhead = document.createElement('h3');
        let desc = document.createElement('p');

        // Give the <h2> textContent equal to the course "name" property
        heading.textContent = course.name;

        // Give the <h3> textContent equal to the course "number" property
        subhead.textContent = course.number;

        // Give the <p>s textContent equal to the course description
        desc.textContent = course.description;

        // append the elements to the DOM as appropriate, to add the course to the UI
        main.appendChild(section);
        section.appendChild(heading);
        section.appendChild(subhead);
        section.appendChild(desc);
    }

}
