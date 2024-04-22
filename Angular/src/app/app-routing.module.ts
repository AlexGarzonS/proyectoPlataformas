import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewProductComponent} from './components/view-product/view-product.component'
import {AddProductComponent} from './components/add-product/add-product.component'
import {PantallaInicialComponent} from './components/pantalla-inicial/pantalla-inicial.component'

const routes: Routes = [{path:'mostrarProductos', component:ViewProductComponent},
  {path:'agregarproducto', component:AddProductComponent},{path:'',component:PantallaInicialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
