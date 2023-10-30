import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './views/main/main.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class DashboardModule { }
