import { Component, Input, OnInit } from '@angular/core';
import { InformeTotal } from 'src/app/core/interfaces/capacidades';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})
export class TableDetailComponent  implements OnInit{
  @Input() data : InformeTotal[];
  @Input() columnas : string[];
  @Input() color : string;
  @Input() colorClass : string;
  @Input() text : string;
  @Input() extraHeader : string;

  ngOnInit(){

  }
}
