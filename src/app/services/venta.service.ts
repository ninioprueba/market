import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ItemVenta } from '../models/itemVenta';
import { VentaList } from '../venta-list';
import { VentasFinalizadas, Venta } from '../models/listaVentas';
import { DatePipe } from '@angular/common';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  totalPrice: number;
  constructor(private datePipe: DatePipe) {
  }
  getProds(): Observable<ItemVenta[]> {


    return of(VentaList);
  }
  getPrice(): Observable<number> {
    this.calcularPrecio();
    return of(this.totalPrice);
  }
  convertToSellItem(toConvert: Producto, cant: number): ItemVenta {
    const item = new ItemVenta(toConvert.id_prod, toConvert.nombre, toConvert.precio, cant, cant * toConvert.precio);
    return item;
  }
  addItem(toAdd: any) {
    // armar la transicion de un tipo producto a un tipo itemventa
    if (VentaList.filter(e => e.nombre === toAdd.nombre).length > 0) {
      console.log('has item, adding one');
      const index = VentaList.findIndex((item) => item.id_prod === toAdd.id_prod);
      VentaList[index].cant++;
      VentaList[index].monto = VentaList[index].precio_unit * VentaList[index].cant;
    } else {
      toAdd.cant = 1;
      const sellItem = this.convertToSellItem(toAdd, toAdd.cant);
      console.log(sellItem);
      VentaList.push(sellItem);
    }
    this.calcularPrecio();
   // console.log(this.calcularPrecio());
    console.log(VentaList);
  }
  setMonto(index, newcant) {
  VentaList[index].monto = VentaList[index].precio_unit * newcant;
  }
  calcularPrecio(): Observable<number> {
    console.log(VentaList.length);
    this.totalPrice = 0;
    for (const item of VentaList) {
      this.totalPrice = this.totalPrice + item.monto;
    }
    console.log(this.totalPrice);
    return of(this.totalPrice);
  }
  emptySell () {
    VentaList.splice(0 , VentaList.length);
  }

  finishSell() {
    // ventalist no se imprime correctamente
    // this.calcularPrecio();
      const items = JSON.parse(JSON.stringify(VentaList));
      const date = new Date();
      const formatedDate = this.datePipe.transform(date, 'yyyy-MM-dd, HH:mm');
      const venta = new Venta(12, this.totalPrice, 2, formatedDate, items);
      VentasFinalizadas.push(venta);
      console.log(VentasFinalizadas);
      this.totalPrice = 0;
      this.emptySell();
  }
}
