import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stock: Producto[];
  filtro: string;
  filteredStock: Producto[];
  showForm = false;
  newProd: Producto;
  id_prod = 0;
  nombre = '';
  precio = 0;
  id_proovedor = 0;
  newStock = 0;

  constructor(private prodService: ProductosService) {
  this.getProds();
  }

  ngOnInit() {
    // error!!! averiguar como incializar !
    // hacer constructor para item !! y para todos los models
    this.filteredStock = [];
    this.newProd = new Producto(0, '', 0, 0, 0);
  }
  getProds(): void {
    this.prodService.getProds()
      .subscribe(productos => this.stock = productos);
    console.log(this.stock);
  }
  deleteItem(toDelete: number): void {
    const index = this.stock.findIndex((item) => item.id_prod === toDelete);
    this.stock.splice(index, 1);
    console.log(`item ${index} deleted`);

  }
  filterOnKey(): void {
    this.filteredStock = [];
    console.log(this.filtro);
    this.prodService.getFiltered(this.filtro).subscribe(filtered => this.filteredStock.push(filtered));
    console.log(this.filteredStock);
    this.stock = this.filteredStock;
  }
  probar() {
    console.log(this.filtro);
  }
  filterProd() {
    // anda mal
    console.log('works');
    if (this.id_prod !== 0 && this.id_prod <= this.prodService.getLenght()) {
    this.prodService.getOneById(this.id_prod)
    .subscribe(producto => {
      this.id_prod = producto.id_prod;
      this.nombre = producto.nombre;
      this.precio = producto.precio;
      this.id_proovedor = producto.id_proovedor;
      this.newStock = 0; });

    } else {

      console.log('codigo de producto inexistente, asumiendo que se agrega nuevo producto');
      this.resetForm();
    }
  }
  addItemForm() {
    this.showForm = true;
    console.log(this.showForm);

  }
  addItem() {
    // agregar validacion
    // agregar si no existe y sumar stock si existe
    this.prodService.hasItem(this.id_prod).subscribe(prod => console.log(prod));
    // toAdd = new Producto(this.id_prod, this.nombre, this.id_proovedor, this.precio, this.newStock);
    // console.log(JSON.parse(JSON.stringify(toAdd)));
    // this.prodService.addItem(JSON.parse(JSON.stringify(toAdd)));
  }
  resetForm(): void {
    this.nombre = '';
    this.precio = 0;
    this.id_proovedor = 0;
    this.newStock = 0;
  }
  cancelButton(): void {
    this.showForm = false;
    this.id_prod = 0;
    this.nombre = '';
    this.precio = 0;
    this.id_proovedor = 0;
    this.newStock = 0;
  }
}

