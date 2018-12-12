import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Observable, of } from 'rxjs';
import { filter, debounceTime  } from 'rxjs/operators';
import { VentaService } from '../services/venta.service';
import { ProductosService } from '../services/productos.service';
import { Producto } from '../models/producto';
import { ItemVenta } from '../models/itemVenta';
@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})

export class BuscadorComponent implements OnInit {
  @Output() valueChange = new EventEmitter();
  busqueda = '';
  inputFilter = '';
  comboItems: any;
  showCombo = false;
  filteredItems: Producto[] =  [];
  i: number;
  listaVenta: ItemVenta[] = [];
  counter = 0;
  valueChanged() { // You can give any function name
    this.counter = this.counter + 1;
    this.valueChange.emit(this.counter);
}

  myFn() {
    console.log(`buscando palabra ${this.busqueda}`);

  }
  onKey() {
    // filtra cuando se teclean 3 o mas teclas
    this.filteredItems = [];
    console.log(this.filteredItems);
    if (this.filteredItems !== [] && this.busqueda.length >= 1 ) {
    this.showCombo = !this.showCombo;
    this.inputFilter = this.busqueda;
    console.log(this.inputFilter);
    this.filterObs(this.inputFilter);
    console.log(this.filteredItems);
  } else {
    this.showCombo = false;
  }
  }
  addingWithEnter() {
    this.showCombo = false;
    console.log(`agregando con enter ${this.busqueda}`);
    this.inputFilter = this.busqueda;
   // this.filterObs(this.inputFilter);
    this.addToVenta(this.filteredItems[0]);
    console.log(`agregando con enter ${this.inputFilter}`);



  }
  constructor(private prodService: ProductosService, private ventService: VentaService) {

  }
  ngOnInit() {
    this.i = 0;
   // this.getProds();
   // console.log(this.comboItems);
    this.subsToVenta();


  }
  getProds(): void {
    this.prodService.getProds()
      .subscribe(productos => this.comboItems = productos);
    // console.log(this.comboItems);
  }
  getFilter(value: any): void {
    const aux = of(this.comboItems);
    const ex = aux.pipe(filter(producto => producto.name.includes(value)));
    const subscribe = ex.subscribe(val => console.log(`${val.name}`));

  }
  filterObs(value: any): void {
    // llamar a getfiltered
    this.prodService.getFiltered(value)
    .subscribe(filtered => this.filteredItems.push(filtered));

  }
  subsToVenta(): void {
    this.ventService.getProds()
      .subscribe(productos => this.listaVenta = productos);
      console.log(this.listaVenta);
  }
  addToVenta(item: any): void {
    this.ventService.addItem(item);
    this.busqueda = '';
    this.valueChange.emit('getprice');
  }

}
