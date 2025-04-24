export class Todo {
  constructor(titulo, duracion, fecha_limite, prioridad) {
    this.titulo = titulo
    this.duracion = duracion
    this.fecha_limite = fecha_limite
    this.prioridad = prioridad
    this.id = crypto.randomUUID()
  }
}

export class Project {
  constructor(nombre) {
    this.nombre = nombre  
    this.tareas = []
    this.id = crypto.randomUUID()
  }

  addTarea(todo) {
    this.tareas.push(todo)
  }
  removeTarea(todo) {
    this.tareas.filter(item => item !== todo);
  }
}
