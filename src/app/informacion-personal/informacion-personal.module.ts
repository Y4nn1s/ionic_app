import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InformacionPersonalPage } from './informacion-personal.page';

import { InformacionPersonalPageRoutingModule } from './informacion-personal-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    InformacionPersonalPageRoutingModule
  ],
  declarations: [InformacionPersonalPage]
})
export class InformacionPersonalPageModule {}
