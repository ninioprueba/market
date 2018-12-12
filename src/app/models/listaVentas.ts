import { ItemVenta } from '../models/itemVenta';
export class Venta {
    constructor(
        public id_venta: number,
        public monto: number,
        public vendedor: number,
        public fecha: string,
        public items: JSON[]
    ) {
        console.log(items);
    }


}
export const VentasFinalizadas: Venta[] = [];

