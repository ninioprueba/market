import { Injectable } from '@angular/core';
import { filter, debounceTime } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
import { Producto } from '../models/producto';
import { ProductosList } from '../MockStock';
import { ItemVenta } from '../models/itemVenta';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  booleantru: true;
toFilter: string;
filteredProds: Producto[];
  constructor() { }
  setToFilter(value) {
    this.toFilter = value;
  }
  getProds(): Observable<Producto[]> {


    return of(ProductosList);
  }
  getOneById(id): Observable<Producto> {

    const fullList = from(ProductosList);
    const exa = fullList.pipe(filter(producto => producto.id_prod === id));
    const subscribe = exa.subscribe();
    return exa;
  }

  getFiltered(tof: any): Observable<Producto> {
    if (!isNaN(Number(tof))) {
      console.log('filtering number');
      const fullListn = from(ProductosList);
    const exampn = fullListn.pipe(filter(producto => producto.id_prod.toString().includes(tof)));
    const subscriben = exampn.subscribe(function (x) {console.log(x);
    });
    return exampn;
    }
    const fullList = from(ProductosList);
    const examp = fullList.pipe(filter(producto => producto.nombre.includes(tof)));
    const subscribe = examp.subscribe(function (x) {console.log(x);
    });
    return examp;

  }
  getLenght (): number {
    return ProductosList.length;
  }
  hasItem (id: number): Observable<Producto> {
    const list = from(ProductosList);
    const obs = list.pipe(filter(prod => prod.id_prod === id));
    console.log(obs);
    obs.subscribe(prod => console.log(prod) );
    return obs;
  }
  addItem (toAdd: Producto) {
    if (ProductosList.includes(toAdd)/* this.booleantru = true */) {
      console.log('has item, adding to Stock');
      const index = ProductosList.findIndex((item) => item.id_prod === toAdd.id_prod);
      ProductosList[index].stock += toAdd.stock;
      console.log(ProductosList[index].stock);
    } else {
      console.log('adding new item');
      ProductosList.push(toAdd);
    }

    console.log(toAdd);
    console.log(ProductosList);
  }
  // esto iria en el back?
  modifyStock (list: ItemVenta[]) {
    list.forEach( (item) => { console.log(item.id_prod);
      const index = ProductosList.findIndex((ele) => ele.id_prod === item.id_prod);
      console.log(ProductosList[index]);
      ProductosList[index].stock -= item.cant; });
  }
}

