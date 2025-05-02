import './css/style.css';
import { Todo } from './modules/todo';
import { Project } from './modules/todo';

const root = document.getElementById("root");
const btnCrearProjecto = document.getElementById("btnCrearProjecto")
const projectForm = document.getElementById("projectForm");
const taskform = document.getElementById("todoForm");
const btncloseProjectForm = document.getElementById("closeProjectForm")
const overlay = document.querySelector(".overlay")
const todoFormCloseBtn = document.querySelector("#closeTodoForm");

// (\(\         (\(\            (\(\
// ( -.-)       ( -.-)          ( -.-)
// o_(")(")     o_(")(")        o_(")(")


let projects = [];
let projectoAsociado; //esto es una flag para asociar el formulario de la tarea al projecto correspondiente

window.onload = function() {
  loadProjects(); // Load projects from localStorage
  renderProjects();
}
// (\(\         (\(\            (\(\
// ( -.-)       ( -.-)          ( -.-)
// o_(")(")     o_(")(")        o_(")(")

function renderProjects() {
  root.innerHTML = "";
  projects.forEach((projecto) => {
    const project = document.createElement("section");
    project.classList.add("project")
    project.innerHTML = `
      <h2>${projecto.nombre}</h2>
    <button class="projectRemoveBtn" data-id="${projecto.id}">X</button>
      <button data-id="${projecto.id}" class="createTaskBtn">Add Task</button>
      `
    if (projecto.tareas.length >= 1) {
      const todoContainer = document.createElement("section")
      todoContainer.classList.add("todoContainer")
      project.appendChild(todoContainer)

      projecto.tareas.forEach(item => {
        const todoCard = document.createElement("article")
        todoCard.classList.add("todo")
        todoCard.innerHTML = `
        <ul>
          <li>${item.titulo}</li>
          <li>${item.duracion}</li>
          <li>${item.fecha_limite}</li>
          <li>${item.prioridad}</li>
        </ul> 
        <button class="todoRemoveBtn" data-id="${item.id}">X</button>`;

        todoContainer.appendChild(todoCard)
      })

    }

    root.appendChild(project);

  })
  projectRemoveBtnAttachFunctionality()
  todoRemoveBtnAttachFunctionality()
  projectAddTaskBtnAttachFunctionality()
}


function projectAddTaskBtnAttachFunctionality() {
  const addTaskBtnList = document.querySelectorAll(".createTaskBtn");
  addTaskBtnList.forEach(btn => {
    btn.addEventListener("click", () => {
      overlay.classList.remove("hidden");
      taskform.classList.remove("hidden")

      projectoAsociado = btn.getAttribute("data-id")
    })
  })
}
function projectRemoveBtnAttachFunctionality() {
  const projectRemoveBtnList = document.querySelectorAll(".projectRemoveBtn")
  projectRemoveBtnList.forEach(button => {
    button.addEventListener("click", () => {
      const projectID = button.getAttribute("data-id")
      projects = projects.filter((projecto) => projecto.id !== projectID)
      renderProjects()
      saveProjects()
    })
  })
}

function todoRemoveBtnAttachFunctionality() {
  const listTodoRemoveBtn = document.querySelectorAll(".todoRemoveBtn")
  listTodoRemoveBtn.forEach(btn => {
    btn.addEventListener("click", () => {
      const todoID = btn.getAttribute("data-id")
      projects.forEach(projecto => {
        projecto.tareas = projecto.tareas.filter((item) => item.id !== todoID)
      })
      renderProjects()
      saveProjects()
    })
  })
}
btnCrearProjecto.addEventListener("click", () => {
  projectForm.classList.remove("hidden");
  overlay.classList.remove("hidden")

})

btncloseProjectForm.addEventListener("click", () => {
  projectForm.classList.add("hidden");
  overlay.classList.add("hidden")
})

todoFormCloseBtn.addEventListener("click", () => {
  taskform.classList.add("hidden");
  overlay.classList.add("hidden")
})

todoFormCloseBtn.addEventListener("click", () => {
  taskform.classList.add("hidden");
  overlay.classList.add("hidden")
})

projectForm.addEventListener("submit", (event) => {
  event.preventDefault()

  const name = document.getElementById("nombre").value

  projects.push(new Project(name))
  projectForm.classList.add("hidden")
  overlay.classList.add("hidden")

  renderProjects();
  saveProjects();



})

taskform.addEventListener("submit", (event) => {
  event.preventDefault();

  const titulo = document.getElementById("titulo").value
  const duracion = document.getElementById("duracion").value
  const fecha = document.getElementById("fecha").value
  const prioridad = document.getElementById("prioridad").value


  const projecto = projects.find(projecto => projecto.id === projectoAsociado);
  const task = new Todo(titulo, duracion, fecha, prioridad)

  projecto.addTarea(task);

  event.target.reset(); // resetea los valores

  taskform.classList.add("hidden")
  overlay.classList.add("hidden")

  renderProjects();
  saveProjects();

})
// Save projects to localStorage
function saveProjects() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

// Load projects from localStorage
function loadProjects() {
  const storedProjects = localStorage.getItem('projects');
  if (storedProjects) {
    projects = JSON.parse(storedProjects);
  }
}
