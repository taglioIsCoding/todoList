console.log("start");
console.log();

const textInput = document.getElementById("textInput");
const buttonInput = document.getElementById("buttonInput")
const tagUL = document.querySelector("ul");

if(typeof(Storage) !== "undefined"){
    getNodes();
}

function addElementToList(string) {
  let date = getCurrentDate();
  createNote(string, date);
}

function getCurrentDate() {
  let d = Date(Date.now());
  d = d.toString();
  d = d.substring(0, 24);
  return d;
}

function refreshClose() {
  var close = document.getElementsByClassName("close");
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = event => {
      let div = close[i].parentNode;
      div.parentNode.removeChild(div);
      refreshClose();
      refershCheck();
      updateJSON();
    }
  }
}

function refershCheck() {
  var list = document.querySelectorAll('li');
  for (let i = 0; i < list.length; i++) {
    list[i].onclick = event => {
      list[i].classList.toggle('checked');
    }
  }
}

buttonInput.onclick = event => {
  if (textInput.value != "") {
    addElementToList(textInput.value);
    textInput.value = "";
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    addElementToList(textInput.value)
    textInput.value = "";
  }
})

function getNodes() {
  obj = JSON.parse(window.localStorage.src);

  let lung = window.localStorage.numero;
  for(let i=0; i<lung; i++){
      regenNote(obj.toDo[i].task);
  }
}

function updateJSON() {
  let text = '{"toDo":[';
  let currentNode;
  const tagsLI = document.querySelectorAll("li");
  for (let i = 0; i < tagsLI.length; i++) {
    if (tagsLI.length - 1 == i)
      currentNode = '{"task":"' + tagsLI[i].innerHTML + '"}';
    else currentNode = '{"task":"' + tagsLI[i].innerHTML + '"},';
    currentNode = currentNode.replace('<a class="close"> ✖ </a>', "");
    text += currentNode;
  }
  text += ']}'
  window.localStorage.src = text;
  window.localStorage.numero = tagsLI.length;
}

function createListfromJSON() {
  document.getElementById("demo").innerHTML =
    obj.employees[1].firstName + " " + obj.employees[1].lastName;
}

function createNote(name, d) {
  let newElement = document.createElement("li");
  let finalString = name + " (" + d + ")  ";
  newElement.innerHTML = finalString;
  tagUL.appendChild(newElement);
  let elemento = document.createElement("a");
  let del = document.createTextNode(" ✖ ");
  elemento.className = "close";
  elemento.appendChild(del);
  newElement.appendChild(elemento);
  updateJSON();
  refreshClose();
  refershCheck();
}

function regenNote(name) {
    let newElement = document.createElement("li");
    newElement.innerHTML = name;
    tagUL.appendChild(newElement);
    let elemento = document.createElement("a");
    let del = document.createTextNode(" ✖ ");
    elemento.className = "close";
    elemento.appendChild(del);
    newElement.appendChild(elemento);
    refreshClose();
    refershCheck();
  }