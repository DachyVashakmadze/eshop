import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoBoxComponent } from './info-box/info-box.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    InfoBoxComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    InfoBoxComponent
  ]
})
export class SharedModule { }
