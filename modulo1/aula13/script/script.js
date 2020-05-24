let globalNames = ["um", "dois", "três"];
let inputName = null;
let isEditing = false;
let currentIndex = null;

window.addEventListener("load", () => {
  inputName = document.querySelector("#inputName");

  preventFormSubmit();
  activateInput();
  render();

});



function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmit);
}

function activateInput() {
  function insertName(newname) {
    //globalNames.push(newname);
    globalNames = [...globalNames, newname];
  }
  function updateName(newname) {
    globalNames[currentIndex] = newname;
  }
  function handleTyping(event) {
    var hasText = !!event.target.value && event.target.value.trim() !== "";
    if (!hasText) {
      clearInput();
      return;
    }

    if (event.key === "Enter") {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }

      render();
      isEditing = false;
      clearInput();
    }
  }
  inputName.addEventListener("keyup", handleTyping);
  inputName.focus();
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      //globalNames.splice(index, 1);
      //globalNames = globalNames.filter((name, i) => {
      // if (i === index) {
      //   return false;
      // }
      // return true;
      // return i !== index;
      //})
      globalNames = globalNames.filter((_, i) => i !== index);

      render();
    }
    var button = document.createElement("button");
    button.textContent = "x";
    button.classList.add("deleteButton");

    button.addEventListener("click", deleteName);

    return button;
  }
  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    var span = document.createElement("span");
    span.classList.add("clickable");
    span.textContent = name;
    span.addEventListener("click", editItem);

    return span;
  }
  var divNames = document.querySelector("#names");
  divNames.innerHTML = "";

  //criar o ul
  var ul = document.createElement("ul");
  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement("li");
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();

  //fazer n Li's, conforme tamanho do vetor globalNames
}

// function clearInput() {
//   inputName.value = "";
//   inputName.focus();
// }

const clearInput = () => {
  inputName.value = "";
  inputName.focus();
}