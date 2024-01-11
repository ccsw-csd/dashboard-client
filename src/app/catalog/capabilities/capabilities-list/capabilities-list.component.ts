import { Component, OnInit } from '@angular/core';
import { CapabilitiesService } from '../capabilities.service';
import { Capability } from '../model/Capability';
import { SortEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-capabilities-list',
  templateUrl: './capabilities-list.component.html',
  styleUrls: ['./capabilities-list.component.scss'],
  providers: [DialogService]
})
export class CapabilitiesListComponent implements OnInit {

  capabilities: Capability[];
  tableWidth: string = 'calc(100vw - 55px)';
  defaultFilters: any = {};
  selectedColumnNames: any[];
  columnNames: any[] = [
    { header: 'Descripción', composeField: 'Descripcion', field: 'Descripcion', filterType: 'input' },
    { header: 'Tipo de Interfaz', composeField: 'id_tipo_interfaz', field: 'id_tipo_interfaz', filterType: 'input' },
    { header: 'Nº de Registros', composeField: 'num_Registros', field: 'num_Registros', filterType: 'input' },
    { header: 'Título', composeField: 'nombre_Fichero', field: 'nombre_Fichero', filterType: 'input' },
    { header: 'Comentarios', composeField: 'Comentarios', field: 'Comentarios', filterType: 'input' },
    { header: 'Fecha', composeField: 'Fecha', field: 'Fecha', filterType: 'input' }, // Corregí el campo 'Fecha'
    { header: 'Versión', composeField: 'id_version_staffing', field: 'id_version_staffing', filterType: 'input' }
  ];

  constructor(private capabilitiesService: CapabilitiesService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.capabilitiesService.getCapabilities().subscribe(
      capabilities => {
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
}
