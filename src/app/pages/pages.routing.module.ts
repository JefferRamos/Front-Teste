import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConteinerComponent } from './conteiner/conteiner.component';
import { MovimentacaoComponent } from './movimentacao/movimentacao.component';

const routes: Routes = [
  {path: 'conteiner', component: ConteinerComponent},
  {path: 'movimentacao', component: MovimentacaoComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
