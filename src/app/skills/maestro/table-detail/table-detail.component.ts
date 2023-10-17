import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})
export class TableDetailComponent  implements OnInit{
  @Input() data : any;
  @Input() columnas : string[];
  @Input() color : string;
  @Input() colorClass : string;
  @Input() text : string;
  @Input() total : boolean;
  totales: string[] = [];

  ngOnInit(){
    console.log('totales',this.total);
    if(this.total) {
      let total = 0;
      let totalComplex = 0;
      let totalAgile = 0;
      this.data.forEach(el => {
        total += el[1];
        totalComplex += el[2];
        totalAgile += el[3];
      });
      this.totales = ['TOTAL',total.toString(),totalComplex.toString(),totalAgile.toString(),'','','','','','']
    }
  }
}
