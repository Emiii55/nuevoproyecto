import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // Definimos colección para los productos de la web
  private productosCollection: AngularFirestoreCollection<Producto>

  constructor(private database: AngularFirestore) {
    this.productosCollection = database.collection('producto');
  }

  // CREAR productos
  crearProducto(producto: Producto){
    return new Promise(async(resolve, reject) => {
      try{
        // Creamos número identificativo para el producto en la base de datos
        const idProducto = this.database.createId();

        // Asignamos ID creado al atributo idProducto de la interfaz Producto
        producto.idProducto = idProducto;

        const resultado = await this.productosCollection.doc(idProducto).set(producto);

        resolve(resultado);
      } catch (error){
        reject(error);
      }
    })
  }

  // OBTENER productos
  obtenerProducto(){
    /*
    snapshotChanges => toma captura del estado de los datos
    pipe => tuberias que retornan un nuevo arreglo 
    map => "mapea" o recorre esa nueva informacion
    a => resguarda la nueva informacion y la envia como un documento
    */
    return this.productosCollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
  }
  // EDITAR productos
  modificarProducto(idProducto:string, nuevaData: Producto){
    /*accedemos a la colección "productos" de la base de datos, buscamos el ID del
    producto seleccionado y lo actualizamos con el método "update", enviando la nueva información
    */ 
    return this.database.collection('productos').doc(idProducto).update(nuevaData);
  }

  // ELIMINAR productos
  eliminarProducto(idProducto: string){
    return new Promise((resolve, reject) => {
      try {
        const respuesta = this.productosCollection.doc(idProducto).delete();

        resolve (respuesta);
      }
      catch(error){
        reject (error);
      }
    })
  }
}
