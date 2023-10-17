import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../../core/services/skills.service';
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit{
 dataCert : any;
 dataSector : any;
 dataCapacity : any;
 dataCloudCert: any;

 constructor(private skillsService: SkillsService) {}

 ngOnInit() {
  this.skillsService.getPersons().subscribe(data => {
      console.log('persons: ',data);  });


   this.dataCert = {
    labels : ['html5,javascript,css3','aws cloud','google cloud','Angular','oracle associate,java se','English'],
    datasets : [{
      data : [1,41,66,7,2,5],
      backgroundColor : ['blue','red','green','purple','orange','pink']
    }]
   };

   this.dataSector = {
    labels : ['API','Arquitect','Azure','cloud','idiomas','web'],
    datasets : [{
      data : [1,6,39,139,4,1],
      backgroundColor : ['blue','red','green','purple','orange','pink']
    }]
   };
   this.dataCapacity = {
      labels: ['with complex solutions', 'Agile & Product Centricity', ' Certified SAFE',
      'Certified EM1', 'Certified EM2'],
      datasets: [
          {
              label: 'Engagement Managers',
              backgroundColor: 'lightblue',
              data: [25, 73, 23, 32, 11]
          },
          {
              label: 'Others - (PMO, …)',
              backgroundColor: 'plum',
              data: [7, 14, 2, 0, 0]
          }
      ]
  };

  this.dataCloudCert = {
      labels: ['AWS', 'Azure', 'GCP',
      'Certified EM1', 'Certified EM2'],
      datasets: [
          {
              label: 'Level 1 - Entry',
              backgroundColor: 'cornflowerblue',
              data: [58, 124, 66]
          },
          {
              label: 'Level 2 - Advanced',
              backgroundColor: 'coral',
              data: [16,2,6]
          },
          {
              label: 'Level 3 - Professional',
              backgroundColor: 'hotpink',
              data: [5,3,7]
          }
      ]
  };
 }
}
