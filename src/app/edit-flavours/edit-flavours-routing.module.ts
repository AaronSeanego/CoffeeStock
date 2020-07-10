import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFlavoursPage } from './edit-flavours.page';

const routes: Routes = [
  {
    path: '',
    component: EditFlavoursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFlavoursPageRoutingModule {}
