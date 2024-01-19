import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffingListComponent } from './staffing/staffing-list/staffing-list.component';
import { CapabilitiesListComponent } from './capabilities/capabilities-list/capabilities-list.component';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { PaginatorModule } from 'primeng/paginator';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  declarations: [
    CapabilitiesListComponent,
    StaffingListComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    AutoCompleteModule,
    ListboxModule,
    TableModule,
    ToastModule,
    DynamicDialogModule,
    ButtonModule,
    TooltipModule,
    ConfirmDialogModule,
    PaginatorModule,
    InputTextModule,
    TooltipModule,
    ToastModule,
    TabViewModule,
    InputSwitchModule,
    ScrollPanelModule,
  ]
})
export class CatalogModule { }
