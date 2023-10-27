import { Component, OnInit } from '@angular/core';
import { GradesRole } from '../../core/interfaces/capacidades';
import { SkillsService } from 'src/app/core/services/skills.service';
@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.scss']
})
export class MaestroComponent implements OnInit{
  rolesCol : string[];
  gradesRoles : GradesRole[];
  gradeRoleText : string;
  EMText : string;
  ARText : string;

  constructor(private skillsService: SkillsService) {}


  ngOnInit() {

    this.initPyramideData();

    this.EMText = "TOTAL #EM of the unit + specific focus on #EM with experience in Complex Solutions engagements + specific focus on #EM with effective Agile and Product Centric experience  + #certified EM"

    this.ARText = "TOTAL #Architects of the unit + specific focus on #Archi with experience in Complex Solutions architecture & roadmaps + specific focus on #Archi with effective Agile and Product Centric experience + #certified Architects";

  }

  initPyramideData() {
    this.gradeRoleText = "Grade #pyramid for the population";
    this.skillsService.getRoles().subscribe(data => {
      this.rolesCol = data.map(role => {
        return role.role;
      });
      this.rolesCol.unshift("Grade");
      this.rolesCol.push("Total");
    });

    this.skillsService.getGradesRoles().subscribe(data => {
      this.gradesRoles = data;
      let rolesSum = [0,0,0,0,0];
      this.gradesRoles.map(elem => {
        let lineSum : number = 0;
        elem.totals.forEach((nb,index) => {
          lineSum += nb;
          rolesSum[index] += nb;
        });
        rolesSum[elem.totals.length] += lineSum;
        elem.totals.push(lineSum);
        return elem;
      });
      this.gradesRoles.push({
        grade : "Sum",
        totals : rolesSum
      });
    });
  }
}
