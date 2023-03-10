import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Tarea } from '../tarea';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tareaEditando: Tarea;
  arrayColeccionTareas: any = [{
    id: "",
    data: {} as Tarea
  }]

  constructor(private firestoreService: FirestoreService) {
    //Crea una tarea vacia el empezar
    this.tareaEditando = {} as Tarea;
    this.obtenerListaTareas()
  }

  clicBotonInsertar() {
    this.firestoreService.insertar("tareas", this.tareaEditando).then(
      () => {
        console.log("Tarea creada correctamente")
        this.tareaEditando = {} as Tarea;
      }, (error) => {
        console.error(error);
    });
  }

  obtenerListaTareas() {
    this.firestoreService.consultar("tareas").subscribe((resultadoConsultaTareas) => {
      this.arrayColeccionTareas = []
      resultadoConsultaTareas.forEach((datosTarea: any) => {
        this.arrayColeccionTareas.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data
        })
      })
    })
  }
}
