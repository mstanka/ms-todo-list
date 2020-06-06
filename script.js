// select the elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

// variables 
let myList, id;

// get item form localStorage
let data = localStorage.getItem("TODO");

if(data){
  myList = JSON.parse(data);  
  id = myList.length; // set id to the last one in the list
  loadList(myList);
} else {
  myList = [];
  id = 0;
}

// load items to the UI
function loadList(array) {
  array.forEach(item => addToDo(item.name, item.id, item.done, item.trash));
}

// clear localStorage 
clear.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});

// show todays day
const options = { weekday: 'long', month: 'short', day: 'numeric'};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('en-US', options);

// add to do item
function addToDo(toDo, id, done, trash) {

  if(trash) { return; }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `<li class="item">
                  <i class="far ${DONE}" job="complete" id="${id}"></i>
                  <span class="text ${LINE}">${toDo}</span>
                  <i class="far fa-trash-alt" job="delete" id="${id}"></i>
                </li>`;

  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
}

// add an item to the list when user press enter
document.addEventListener('keyup', (e) => {
  if(e.keyCode === 13) {
    const toDo = input.value;
    if(toDo) {
      addToDo(toDo, id, false, false);
      
      myList.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });

      // add item to localStorage
      localStorage.setItem("TODO", JSON.stringify(myList));
      id++;
    }
    input.value = "";    
  }
});

// complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
  myList[element.id].done = myList[element.id].done ? false : true;
}

// remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  myList[element.id].trash = true;
}

// target items created dynamically
list.addEventListener('click', (e) => {
  const element = e.target; // return the clicked element inside list
  const elementJob = e.target.attributes.job.value; // complete or delete
  
  if(elementJob === "complete") {
    completeToDo(element);
  } else if(elementJob === "delete") {
    removeToDo(element);
  }

  // add item to localStorage
  localStorage.setItem("TODO", JSON.stringify(myList)); 
});

