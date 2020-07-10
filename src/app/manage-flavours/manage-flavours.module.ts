import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageFlavoursPageRoutingModule } from './manage-flavours-routing.module';

import { ManageFlavoursPage } from './manage-flavours.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ManageFlavoursPageRoutingModule
  ],
  declarations: [ManageFlavoursPage]
})
export class ManageFlavoursPageModule {}
