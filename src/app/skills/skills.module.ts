import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticComponent } from './statistic/statistic.component';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    StatisticComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    ButtonModule
  ]
})
export class SkillsModule { }
