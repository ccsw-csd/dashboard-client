import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffingListComponent } from './staffing/staffing-list/staffing-list.component';
import { CapabilitiesListComponent } from './capabilities/capabilities-list/capabilities-list.component';



@NgModule({
  declarations: [
    StaffingListComponent,
    CapabilitiesListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CatalogModule { }
