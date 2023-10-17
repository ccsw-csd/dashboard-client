import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.scss']
})
export class MaestroComponent implements OnInit{
  EM :any[] = [];
  EMColumn: string[] = [];
  EMText: string = "";

  AR : any[] = [];
  ARColumn: string[] = [];
  ARText : string = "";


  ngOnInit() {
    this.EMColumn = ['Engagement Managers','TOTAL','with complex solutions(*) experience',
        'Agile & Product Centricity','Certified SAFE','Certified EM1','Certified EM2','Certified EM3','Certified EM4']

    this.EM = [
      ['Engagement Managers(**)',1,0,1,'FICHERO FORMACION INTERNA',
      'FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA',
      'FICHERO FORMACION INTERNA'],
      ['Others (***) - (PMO, …)',1,4,5,'FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA',
      'FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA']
    ];

    this.EMText = "TOTAL #EM of the unit + specific focus on #EM with experience in Complex Solutions engagements + specific focus on #EM with effective Agile and Product Centric experience  + #certified EM"

    this.ARColumn = ['Architects','TOTAL','with complex solutions(*) experience',
          'Agile & Product Centricity','Certified SAFE','Certified TOGAF','Certified L1',
          'Certified L2','Certified L3','Certified L4']

    this.AR = [['Enterprise Architects',2,0,2,'FICHERO FORMACION INTERNA',
    'FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA'],
    ['Business Architects',0,4,4,'FICHERO FORMACION INTERNA',
    'FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA'],
    ['Solution Architects(1)',2,0,2,'FICHERO FORMACION INTERNA',
    'FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA'],
    ['Integration Architects(2)',0,4,4,'FICHERO FORMACION INTERNA',
    'FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA','FICHERO FORMACION INTERNA']
    ]

    this.ARText = "TOTAL #Architects of the unit + specific focus on #Archi with experience in Complex Solutions architecture & roadmaps + specific focus on #Archi with effective Agile and Product Centric experience + #certified Architects";

  }

}
