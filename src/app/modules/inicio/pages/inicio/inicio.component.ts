import { Component } from '@angular/core';
//importamos interfaz
import { Animal } from 'src/app/models/animal';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  //propiedad publica (tipo array)
  public info: Animal[];

  constructor() {
    this.info = [
      {
        especie: "tonto",
        edad: 0,
        genero: "macho",
        imagen: "https://www.eltesorodelajumentud.info/labradrs.jpg",
        alt: "imagen de perrito"
      }
    ]
  }
}
