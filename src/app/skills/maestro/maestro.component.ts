import { Component, OnInit } from '@angular/core';
import { InformeTotal } from '../../core/interfaces/capacidades';
import { SkillsService } from 'src/app/core/services/skills.service';
import * as FileSaver from 'file-saver';
import { MenuItem } from 'primeng/api';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.scss']
})
export class MaestroComponent implements OnInit{
  load : boolean = false;
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

  rolesCol : string[] = [];
  gradesRoles : InformeTotal[];
  gradeRoleText : string;

  selectedExcel : string = '';
  visible: boolean = false;
  tableList = ['All Profiles','Engagement Managers','Architects','Business Analyst','Software Engineer','Industry Experts','Architects & SE Custom Apps Development','Architects & SE Integration & APIs','Pyramid Grade-Rol'];
  items: MenuItem[];

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

    this.items = [
      {label: "Export totales", icon: 'pi pi-external-link',command: () => this.exportExcelTotales()},
      {label: "Export detalle", icon: 'pi pi-external-link',command: () => this.showDialog()}
    ]
  }

  initEM() {
    this.skillsService.getTableDetail('Engagement Managers','t').subscribe(info =>{
      this.EMText = info[0].desc; });

    this.skillsService.getTableDetail('Engagement Managers','c').subscribe(info =>{
      this.EMCol = info.map(el => el.desc);
    });

    this.skillsService.getProfileTotals('Engagement Managers').subscribe(data => {
      this.EMData = data;
    });
  }

  initBA() {
    this.skillsService.getTableDetail('Business Analyst','t').subscribe(info =>{
      this.BAText = info[0].desc; });

    this.skillsService.getTableDetail('Business Analyst','c').subscribe(info =>{
      this.BACol = info.map(el => el.desc); });

    this.skillsService.getProfileTotals('Business Analyst').subscribe(data => {
      this.BAData = data;  });
  }

  initAR() {
    this.skillsService.getTableDetail('Architects','t').subscribe(info =>{
      this.ARText = info[0].desc; });
    this.skillsService.getTableDetail('Architects','c').subscribe(info =>{
      this.ARCol = info.map(el => el.desc);  });

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
      this.SECol = info.map(el => el.desc);  });

    this.skillsService.getProfileTotals('Software Engineer').subscribe(data => {
      this.SEData = data;  });
  }

  initIE() {
    this.skillsService.getTableDetail('Industry Experts','t').subscribe(info =>{
      this.IEText = info[0].desc; });

    this.skillsService.getTableDetail('Industry Experts','c').subscribe(info =>{
      this.IECol = info.map(el => el.desc);  });

    this.skillsService.getProfileTotals('Industry Experts').subscribe(data => {
      this.IEData = data;  });
  }

  initArSeDev() {
    this.skillsService.getTableDetail('Architects & SE Custom Apps Development','t').subscribe(info =>{
      this.ArSeDevText = info[0].desc; });

    this.skillsService.getTableDetail('Architects & SE Custom Apps Development','c').subscribe(info =>{
      this.ArSeDevCol = info.map(el => el.desc);  });

    this.skillsService.getProfileTotals('Architects & SE Custom Apps Development').subscribe(data => {
      this.ArSeDevData = data;  });
  }

  initArSeApi() {
    this.skillsService.getTableDetail('Architects & SE Integration & APIs','t').subscribe(info =>{
      this.ArSeApiText = info[0].desc; });

    this.skillsService.getTableDetail('Architects & SE Integration & APIs','c').subscribe(info =>{
      this.ArSeApiCol = info.map(el => el.desc);  });

    this.skillsService.getProfileTotals('Architects & SE Integration & APIs').subscribe(data => {
      this.ArSeApiData = data;  });
  }

  initPyramide() {
    this.skillsService.getTableDetail('Pyramid Grade-Rol','t').subscribe(info =>{
      this.gradeRoleText = info[0].desc; });

    this.skillsService.getTableDetail('Pyramid Grade-Rol','c').subscribe(info =>{
      this.rolesCol = info.map(el => el.desc);
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
      this.load = true;
    });
  }

  formatTable(data,cols) : any {
    let dataTable = [];
   data.forEach(row => {
      const line : Record<string, string> = {};
      line[cols[0]] = row.profile;
      row.totals.forEach((col,i) => {
         line[cols[i+1]] = col.toString();
      });
      dataTable.push(line);
    });
    return dataTable
  }

  exportExcelTotales() {
   let dataTable1 = this.formatTable(this.EMData,this.EMCol);
   let dataTable2 = this.formatTable(this.ARData,this.ARCol);
   let dataTable3 = this.formatTable(this.BAData,this.BACol);
   let dataTable4 = this.formatTable(this.SEData,this.SECol);
   let dataTable5 = this.formatTable(this.IEData,this.IECol);
   let dataTable6 = this.formatTable(this.ArSeDevData,this.ArSeDevCol);
   let dataTable7 = this.formatTable(this.ArSeApiData,this.ArSeApiCol);
   let dataTable8 = this.formatTable(this.gradesRoles,this.rolesCol);

    import("xlsx").then(xlsx => {
        const worksheet1 = xlsx.utils.json_to_sheet(dataTable1);
        const worksheet2 = xlsx.utils.json_to_sheet(dataTable2);
        const worksheet3 = xlsx.utils.json_to_sheet(dataTable3);
        const worksheet4 = xlsx.utils.json_to_sheet(dataTable4);
        const worksheet5 = xlsx.utils.json_to_sheet(dataTable5);
        const worksheet6 = xlsx.utils.json_to_sheet(dataTable6);
        const worksheet7 = xlsx.utils.json_to_sheet(dataTable7);
        const worksheet8 = xlsx.utils.json_to_sheet(dataTable8);

        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet1, 'Engagement Managers');
        xlsx.utils.book_append_sheet(workbook, worksheet2, 'Architects');
        xlsx.utils.book_append_sheet(workbook, worksheet3, 'Business Analyst');
        xlsx.utils.book_append_sheet(workbook, worksheet4, 'Software Engineer');
        xlsx.utils.book_append_sheet(workbook, worksheet5, 'Industry Experts');
        xlsx.utils.book_append_sheet(workbook, worksheet6, 'Custom Apps Development');
        xlsx.utils.book_append_sheet(workbook, worksheet7, 'Integration & APIs');
        xlsx.utils.book_append_sheet(workbook, worksheet8, 'Pyramid');
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Informes");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  downloadExcel() {
    if(this.tableList.includes(this.selectedExcel)) {
      const baseUrl : string = environment.server;
      console.log('basr ',baseUrl);
      window.open(`${baseUrl}/profile/profilelist/${this.selectedExcel}/excel`,"_self");
      this.closeDialog();
    }
  }

  exportar() {
    this.skillsService.sendToExport(this.selectedExcel).subscribe(
      result => {
        this.downloadFile(result, "application/ms-excel");
      }
    );
  }
  downloadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let a: any = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = this.selectedExcel + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    this.closeDialog();
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
    this.selectedExcel = '';
  }
}
