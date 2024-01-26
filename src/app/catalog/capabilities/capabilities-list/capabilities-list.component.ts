import { Component, OnInit } from '@angular/core';
import { CapabilitiesService } from '../capabilities.service';
import { SortEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Capability } from 'src/app/core/interfaces/Capability';

@Component({
  selector: 'app-capabilities-list',
  templateUrl: './capabilities-list.component.html',
  styleUrls: ['./capabilities-list.component.scss'],
  providers: [DialogService]
})
export class CapabilitiesListComponent implements OnInit {

  capabilities: Capability[];
  tableWidth: string;
  defaultFilters: any = {};
  selectedColumnNames: any[];
  years: number[];
  selectedYear: number;
  columnNames: any[] = [
    { header: 'Descripción', composeField: 'descripcion', field: 'descripcion', filterType: 'input' },
    { header: 'Tipo Interfaz', composeField: 'idTipoInterfaz', field: 'idTipoInterfaz', filterType: 'input' },
    { header: 'NºRegistros', composeField: 'numRegistros', field: 'numRegistros', filterType: 'input' },
    { header: 'Título', composeField: 'nombreFichero', field: 'nombreFichero', filterType: 'input' },
    { header: 'Usuario', composeField: 'usuario', field: 'usuario', filterType: 'input' },
    { header: 'Fecha', composeField: 'fechaImportacion', field: 'fechaImportacion', filterType: 'input' },
    { header: 'Versión', composeField: 'id', field: 'id', filterType: 'input' }
  ];

  constructor(private capabilitiesService: CapabilitiesService) { }

  ngOnInit() {

    this.capabilitiesService.getRolesAvailableYears().subscribe(
      years => {
        console.log(years);
        this.years = years;

        if (this.years && this.years.length > 0) {
          this.selectedYear = this.years[0];
          this.loadData(this.selectedYear);
        }
      }
    );

  }

  loadData(selectedYear) {
    this.capabilitiesService.getRoleImportsVersionsByYear(selectedYear).subscribe(
      capabilities => {
        console.log(capabilities);
        this.capabilities = capabilities;
        this.setDefaultFilters();
      }
    );
  }

  setDefaultFilters() {
    this.defaultFilters = {};

    this.columnNames.forEach((column) => {
      if (column.filterType === 'input') {
        this.defaultFilters[column.composeField] = { value: '' };
      }
    });
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
      else if (Array.isArray(value1) && Array.isArray(value2)) {
        result = value1.sort((a, b) => a.name.localeCompare(b.name)).map((t) => t.name).join(', ').localeCompare(value2.sort((a, b) => a.name.localeCompare(b.name)).map((t) => t.name).join(', '));
      }
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }

  saveSelected(columnNames: any[]) {
    localStorage.setItem('capabilities', JSON.stringify(this.columnNames.map(e => e.header)));
  }

  onColReorder(event): void {
    this.saveSelected(this.columnNames);
  }

  onYearChange() {
    this.loadData(this.selectedYear);
  }

  resizeTable() {
    if (document.getElementById('p-slideMenu')) {
      this.tableWidth = 'calc(100vw - 255px)';
    } else {
      this.tableWidth = 'calc(100vw - 55px)';
    }
  }
}
