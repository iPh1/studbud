//Define constants
const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".status");
let draggableTodo = null;

//Dragabble functions
todos.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart);
  todo.addEventListener("dragend", dragEnd);
});

function dragStart() {
  draggableTodo = this;
  setTimeout(() => {
    this.style.display = "none";
  }, 0);
  console.log("dragStart");
}

function dragEnd() {
  draggableTodo = null;
  setTimeout(() => {
    this.style.display = "block";
  }, 0);
  console.log("dragEnd");
}

all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
}

function dragEnter() {
  this.style.border = "1px dashed #ccc";
  console.log("dragEnter");
}

function dragLeave() {
  this.style.border = "none";
  console.log("dragLeave");
}

function dragDrop() {
  this.style.border = "none";
  this.appendChild(draggableTodo);
  console.log("dropped");
}

//Create tasks on board
const todoSubmit = document.getElementById("todo-submit");

todoSubmit.addEventListener("click", createTodo);

function createTodo() {
    const todoDiv = document.createElement("div");
    const inputValue = document.getElementById("todo-input").value;
    const textElement = document.createTextNode(inputValue);

    todoDiv.appendChild(textElement);
    todoDiv.classList.add("todo");
    todoDiv.setAttribute("draggable", "true");

    const span = document.createElement("span");
    const spanText = document.createTextNode("\u00D7");
    span.classList.add("close");
    span.appendChild(spanText);

    todoDiv.appendChild(span);

    no_status.appendChild(todoDiv);

    span.addEventListener("click", () => {
        span.parentElement.style.display = "none";
    });

    todoDiv.addEventListener("dragstart", dragStart);
    todoDiv.addEventListener("dragend", dragEnd);

    document.getElementById("todo-input").value = "";
    todo_form.classList.remove("active");
    overlay.classList.remove("active");

}


