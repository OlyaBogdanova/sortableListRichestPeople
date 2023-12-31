const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

const listItems = [];
let dragStartIndex;

function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .forEach((person, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
    <span class='number'>${index + 1}</span>
    <div class='draggable' draggable='true'>
    <p class='person-name'>${person.value}</p>
    <i class="fa-solid fa-grip-lines"></i>
    </div>
    `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });
  addEventListeners();
}

createList();

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}
function dragEnter() {
  this.classList.add("over");
}
function dragLeave() {
  this.classList.remove("over");
}

function swapItems(startIdx, endIdx) {
  const itemOne = listItems[startIdx].querySelector(".draggable");
  const itemTwo = listItems[endIdx].querySelector(".draggable");
  listItems[startIdx].appendChild(itemTwo);
  listItems[endIdx].appendChild(itemOne);
}
function checkOrder(){
  listItems.forEach((listItem, index)=>{
    const personName=listItem.querySelector('.draggable').innerText.trim()
    if(personName!==richestPeople[index]){
      listItem.classList.add('wrong')

    } else{
      listItem.classList.remove('wrong')
      listItem.classList.add('right')
    }
  })
}
check.addEventListener('click', checkOrder)
