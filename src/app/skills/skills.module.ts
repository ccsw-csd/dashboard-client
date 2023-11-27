import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticComponent } from './statistic/statistic.component';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { MaestroComponent } from './maestro/maestro.component';
import { TableDetailComponent } from './maestro/table-detail/table-detail.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MenuModule } from 'primeng/menu';
@NgModule({
  declarations: [
    StatisticComponent,
    PersonsListComponent,
    MaestroComponent,
    TableDetailComponent,
  ],
  imports: [
    CommonModule,
    ChartModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    FormsModule,
    DialogModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    RadioButtonModule,
    MenuModule
  ]
})
export class SkillsModule { }
