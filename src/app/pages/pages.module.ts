import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routing.module';

import { ConteinerComponent } from './conteiner/conteiner.component';
import { MovimentacaoComponent } from './movimentacao/movimentacao.component';
import { DialogComponent } from '../components/dialog/dialog.component';
import { HeaderComponent } from '../components/header/header.component';

@NgModule({
  declarations: [ConteinerComponent, MovimentacaoComponent, HeaderComponent],
  imports: [SharedModule, PagesRoutingModule],
  exports: [ConteinerComponent],
  entryComponents: [DialogComponent]
})

export class PagesModule {}
