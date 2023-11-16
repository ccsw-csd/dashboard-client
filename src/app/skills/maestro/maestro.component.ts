import { Component, OnInit } from '@angular/core';
import { InformeTotal } from '../../core/interfaces/capacidades';
import { SkillsService } from 'src/app/core/services/skills.service';

@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.scss']
})
export class MaestroComponent implements OnInit{
  EMText : string;
  EMCol : string[] = [];
  EMData : InformeTotal[];

  BAText : string;
  BACol : string[] = [];
  BAData : InformeTotal[];

  ARText : string;
  ARCol : string[] = [];
  ARData : InformeTotal[];

  SEText : string;
  SECol : string[] = [];
  SEData : InformeTotal[];

  IEText : string;
  IECol : string[] = [];
  IEData : InformeTotal[];

  ArSeDevText : string;
  ArSeDevCol : string[] = [];
  ArSeDevData : InformeTotal[];

  ArSeApiText : string;
  ArSeApiCol : string[] = [];
  ArSeApiData : InformeTotal[];

  rolesCol : string[];
  gradesRoles : InformeTotal[];
  gradeRoleText : string;

  constructor(private skillsService: SkillsService) {}

  ngOnInit() {
    this.initEM();
    this.initBA();
    this.initAR();
    this.initSE();
    this.initIE();
    this.initArSeDev();
    this.initArSeApi();
    this.initPyramide();

  }

  initEM() {
    this.skillsService.getTableDetail('Engagement Managers','t').subscribe(info =>{
      this.EMText = info[0].desc; });
    this.skillsService.getTableDetail('Engagement Managers','c').subscribe(info =>{
      info.forEach(elem => {
        this.EMCol.push(elem.desc);
      });
    });
    this.skillsService.getProfileTotals('Engagement Managers').subscribe(data => {
      this.EMData = data;
    });
  }

  initBA() {
    this.skillsService.getTableDetail('Business Analyst','t').subscribe(info =>{
      this.BAText = info[0].desc; });
    this.skillsService.getTableDetail('Business Analyst','c').subscribe(info =>{
      info.forEach(elem => {
        this.BACol.push(elem.desc);
      });
    });
    this.skillsService.getProfileTotals('Business Analyst').subscribe(data => {
      this.BAData = data;
    });
  }

  initAR() {
    this.skillsService.getTableDetail('Architects','t').subscribe(info =>{
      this.ARText = info[0].desc; });
    this.skillsService.getTableDetail('Architects','c').subscribe(info =>{
      info.forEach(elem => {
        this.ARCol.push(elem.desc);
      });
    });
    this.skillsService.getProfileTotals('Architects').subscribe(data => {
      this.ARData = data;
      let sum = [0,0,0];
      this.ARData.forEach(el => {
        el.totals.forEach((t,i) => {
          sum[i] += t;
        });
      });
      this.ARData.push({
        profile : 'Total',
        totals : sum
      });
    })
  }

  initSE() {
    this.skillsService.getTableDetail('Software Engineer','t').subscribe(info =>{
      this.SEText = info[0].desc; });
    this.skillsService.getTableDetail('Software Engineer','c').subscribe(info =>{
      info.forEach(elem => {
        this.SECol.push(elem.desc);
      });
    });
    this.skillsService.getProfileTotals('Software Engineer').subscribe(data => {
      this.SEData = data;
    });
  }

  initIE() {
    this.skillsService.getTableDetail('Industry Experts','t').subscribe(info =>{
      this.IEText = info[0].desc; });
    this.skillsService.getTableDetail('Industry Experts','c').subscribe(info =>{
      info.forEach(elem => {
        this.IECol.push(elem.desc);
      });
    });
    this.skillsService.getProfileTotals('Industry Experts').subscribe(data => {
      this.IEData = data;
    });
  }

  initArSeDev() {
    this.skillsService.getTableDetail('Architects & SE Custom Apps Development','t').subscribe(info =>{
      this.ArSeDevText = info[0].desc; });
    this.skillsService.getTableDetail('Architects & SE Custom Apps Development','c').subscribe(info =>{
      info.forEach(elem => {
        this.ArSeDevCol.push(elem.desc);
      });
    });
    this.skillsService.getProfileTotals('Architects & SE Custom Apps Development').subscribe(data => {
      this.ArSeDevData = data;
    });
  }

  initArSeApi() {
    this.skillsService.getTableDetail('Architects & SE Integration & APIs','t').subscribe(info =>{
      this.ArSeApiText = info[0].desc; });
    this.skillsService.getTableDetail('Architects & SE Integration & APIs','c').subscribe(info =>{
      info.forEach(elem => {
        this.ArSeApiCol.push(elem.desc);
      });
    });
    this.skillsService.getProfileTotals('Architects & SE Integration & APIs').subscribe(data => {
      this.ArSeApiData = data;
    });
  }

  initPyramide() {
    this.skillsService.getTableDetail('Pyramid Grade-Rol','t').subscribe(info =>{
      this.gradeRoleText = info[0].desc; });
    this.skillsService.getRoles().subscribe(data => {
      this.rolesCol = data.map(role => {
        return role.role;
      });
      this.rolesCol.unshift("Grade");
      this.rolesCol.push("Total");
    });

    this.skillsService.getGradesRoles().subscribe(data => {
      let rolesSum = [0,0,0,0,0];
      this.gradesRoles = data.map(elem => {
        let lineSum : number = 0;
        elem.totals.forEach((nb,index) => {
          lineSum += nb;
          rolesSum[index] += nb;
        });
        rolesSum[elem.totals.length] += lineSum;
        elem.totals.push(lineSum);
        return { profile : elem.grade, totals: elem.totals };
      });
      this.gradesRoles.push({
        profile : "Sum",
        totals : rolesSum
      });
    });
  }
}
