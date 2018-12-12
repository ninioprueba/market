import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductosService } from '../services/productos.service';
import { VentaService } from '../services/venta.service';
import { ItemVenta } from '../models/itemVenta';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})

export class VentasComponent implements OnInit {


  venta: ItemVenta[];
  productos: Producto[];
  precioTotal: number;

  displayPrice(msg) {
    console.log(msg);
    this.obtenerPrecio();
}
  constructor(private prodService: ProductosService, private ventService: VentaService) { }


  ngOnInit() {
    this.getStock();
    this.getVentList();
    this.obtenerPrecio();

    }
  onChange(cant: string, toMod ) {
      console.log(cant);
      console.log(`this is the prod id modified: ${toMod}`);
      const index = this.venta.findIndex((item) => item.id_prod === toMod);
      console.log(`this is the index modified: ${index}`);
      this.recalcularPrecio(index, cant);
      this.obtenerPrecio();
    }
  getStock(): void {
    this.prodService.getProds()
      .subscribe(productos => this.productos = productos);
    console.log('stock getted');
  }
  getVentList(): void {
    this.ventService.getProds()
      .subscribe(items => this.venta = items);
    console.log('venta getted');
  }
  deleteItem(toDelete: number): void {
    const index = this.venta.findIndex((item) => item.id_prod === toDelete);
    this.venta.splice(index, 1);
    console.log(`item ${index} deleted`);
    this.obtenerPrecio();

  }
  obtenerPrecio(): void {
    this.ventService.getPrice()
    .subscribe(precio => this.precioTotal = precio);
  }
  recalcularPrecio(index, cant) {
    this.ventService.setMonto(index, cant);
  }
  finalizarVenta(): void {
    console.log(this.venta);
    this.prodService.modifyStock(this.venta);
    this.ventService.finishSell();
   this.obtenerPrecio();

  }


}


