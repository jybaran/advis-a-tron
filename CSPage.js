// Create variable to store majors database in
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




// Sets up the logic, declares necessary variables, contains functions
function initialize() {
    if (coursesJSON == null || majors == null) {
      return
    }
    let main = document.querySelector('main');
    //console.log("got to initialize");
    // grab the UI elements that we need to manipulate
    // Set both to equal an empty array
    majorReqs = [];

    // when the search button is clicked, invoke goTo() to load
    // the specific page for each major
    showMajor();
    Submit.onclick = checkBoxes;

    // Display a major inside the <main> element
    function showMajor() {

        //console.log("got to showhouse");
        // create <section>, <h2>, <p>, and <img> elements
        let section = document.createElement('section');
        let major = document.createElement('h2');
        let advisorsList = document.createElement('h3');
        //let courses = document.createElement('p');


        major.textContent = "Department: Computer Science";
        let advisors = majors["Computer Science"].advisors;
        advisorsList.textContent = "";
        for (let advisor of advisors) {
          advisorsList.textContent = advisorsList.textContent.concat(advisor, ", ");
        }
        courses = majors["Computer Science"].courses;

        section.appendChild(major);
        section.appendChild(advisorsList);
      //  section.appendChild(courses);

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

    function checkBoxes(e) {
      e.preventDefault();
      requirements = majors["Computer Science"].reqList;
      reqsDone = {};
      for (let i = 0; i<div.children.length;i+=2) {
        let child = div.children[i].children[0];
        if (child.checked) {
          reqsDone[child.id] = courses[child.id];
          //console.log(reqsDone);
        }
      }
      return reqsDone;
    }

    function displayHelper(reqsDone) {
      sumReqs = null;
      for key in reqsDone {
        if (sumReqs == null) {
          sumReqs = reqsDone[key];
        } else {
          temp = reqsDone[key];
          for (let i = 0; i < sumReqs.length; i++) {
            sumReqs[i] = sumReqs[i] + temp[i];
          }
        }
      }
      return sumReqs;
    }

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

    function findMin(array) {
      min = null;
      index = null;
      for (let i = 0; i<array.length; i++) {
        if (min == null) {
          min = array[i];
          index = i;
        } else {
          if (array[i] < min) {
            min = array[i];
            index = i;
          }
        }
      }
      return [min, index];
    }
    function processReqs(reqsDone, sumReqs) {
      preqs = true;
      filled = {};
      while  preqs {
        minItem = findMin(sumReqs);
        minIndex = minItem[1];
        minItem = minItem[0];
        for item in reqsDone {
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

    function updateDisplay() {
      while (main.firstChild) {
          main.removeChild(main.firstChild);
      }
      // LEFT TO DO:
      // compare filled requirements to as of yet unsatisfied requirements
      // take unsatisfied reqs and display corresponding courses on page

    }

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
