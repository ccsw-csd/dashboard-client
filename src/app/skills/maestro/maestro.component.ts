import { Component, OnInit, Version } from '@angular/core';
import {
  ColumnDetails,
  GradesRole,
  InformeTotal,
  ProfilesAndGrades,
} from '../../core/interfaces/Capabilities';
import { SkillsService } from 'src/app/core/services/skills.service';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/core/services/auth.service';
import { Report } from '../../core/interfaces/Report';
import { Screenshot } from 'src/app/core/interfaces/Screenshot';

@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.scss'],
})
export class MaestroComponent implements OnInit {
  load: boolean = false;
  EMText: string;
  EMCol: string[] = [];
  EMData: InformeTotal[];

  BAText: string;
  BACol: string[] = [];
  BAData: InformeTotal[];

  ARText: string;
  ARCol: string[] = [];
  ARData: InformeTotal[];

  SEText: string;
  SECol: string[] = [];
  SEData: InformeTotal[];

  IEText: string;
  IECol: string[] = [];
  IEData: InformeTotal[];

  ArSeDevText: string;
  ArSeDevCol: string[] = [];
  ArSeDevData: InformeTotal[];

  ArSeApiText: string;
  ArSeApiCol: string[] = [];
  ArSeApiData: InformeTotal[];

  rolesCol: string[] = [];
  gradesRoles: InformeTotal[];
  gradeRoleText: string;

  selectedExcel: string = '';
  visible: boolean = false;
  tableList = [
    'All Profiles',
    'Engagement Managers',
    'Architects',
    'Business Analyst',
    'Software Engineer',
    'Industry Experts',
    'Architects & SE Custom Apps Development',
    'Architects & SE Integration & APIs',
    'Pyramid Grade-Rol',
  ];

  items: MenuItem[];

  userName: string;

  idReport: number;
  selectedReportName: string;
  titleScreenshotChip: number;
  selectedReportNameModificationDate: Date;
  selectedReportNameUserName: string;

  reportYears: string[];
  reportVersions: Report[];

  screenshotsOptions: Screenshot[] = [
    { name: 'Sí' },
    { name: 'No' },
    { name: 'Todas' },
  ];
  screenshotValue: string;
  selectedScreenshotOption: Screenshot;

  screenshotEnabled: boolean;
  hasScreenshotChanged: boolean;
  comentarios: string;

  selectedScreenshot: Screenshot;
  selectedReportYear: string;
  selectedReportVersion: Report;

  disableYearDrop: boolean = true;
  disableVersionDrop: boolean = true;
  disableButtonSearch: boolean = true;

  allProfilesAndGrades: ProfilesAndGrades[];
  dataGradesRoles: GradesRole[];
  literals: ColumnDetails[];

  constructor(
    private skillsService: SkillsService,
    public authService: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadAllLiterals();

    this.items = [
      {
        label: 'Export totales',
        icon: 'pi pi-external-link',
        command: () => this.exportExcelTotales(),
      },
      {
        label: 'Export detalle',
        icon: 'pi pi-external-link',
        command: () => this.showDialog(),
      },
    ];

    this.loadAllReports();

    this.userName = this.authService.userInfoSSO.displayName;
  }

  loadAllReports() {
    this.skillsService.getAllReports().subscribe(
      (data) => {
        console.log('Todos los informes:', data);

        const lastReport = this.getLastReport(data);

        console.log('Última versión del informe:', lastReport);

        if (lastReport) {
          this.idReport = lastReport.id;
          this.selectedReportName = lastReport.descripcion;
          this.titleScreenshotChip = lastReport.screenshot;
          this.selectedReportNameModificationDate =
            lastReport.fechaModificacion;
          this.selectedReportNameUserName = lastReport.usuario;

          this.screenshotEnabled = lastReport.screenshot !== 0;
          this.comentarios = lastReport.comentarios || '';

          this.loadProfileAndGradesData(this.idReport);

          this.initEM();
          this.initBA();
          this.initAR();
          this.initSE();
          this.initIE();
          this.initArSeDev();
          this.initArSeApi();
          this.initPyramide();

          this.selectedReportVersion = lastReport;
          console.log(this.selectedReportVersion);
        }
      },
      (error) => {
        console.error('Error al obtener todos los informes', error);
      }
    );
  }

  getLastReport(reports: Report[]): Report | undefined {
    return reports.reduce(
      (latest, report) => (latest && latest.id > report.id ? latest : report),
      undefined
    );
  }

  loadReportVersionsByYear(
    selectedReportYear: string,
    selectedScreenshotOption: Screenshot
  ) {
    const year = selectedReportYear;
    const screenshot = selectedScreenshotOption;
    if (this.selectedScreenshot.name === 'No') {
      this.screenshotValue = '0';
    } else if (this.selectedScreenshot.name === 'Sí') {
      this.screenshotValue = '1';
    } else if (this.selectedScreenshot.name === 'Todas') {
      this.screenshotValue = 'all';
    }

    this.skillsService
      .getReportByScreenshotAndYear(year, this.screenshotValue)
      .subscribe(
        (data) => {
          console.log('Versiones disponibles:', data);
          this.reportVersions = data;
        },
        (error) => {
          console.error(
            'Error al obtener las versiones de reportImports',
            error
          );
        }
      );
  }

  loadReportYears(screenshotValue: string) {
    this.skillsService.getYearsByScreenshot(screenshotValue).subscribe(
      (data) => {
        console.log('Años disponibles:', data);
        this.reportYears = data;
      },
      (error) => {
        console.error('Error al obtener los años de reportImports', error);
      }
    );
  }

  onScreenshotChange() {
    if (this.selectedScreenshot.name === 'No') {
      this.screenshotValue = '0';
    } else if (this.selectedScreenshot.name === 'Sí') {
      this.screenshotValue = '1';
    } else if (this.selectedScreenshot.name === 'Todas') {
      this.screenshotValue = '';
    }
    console.log('Valor de screenshot:', this.screenshotValue);
    this.loadReportYears(this.screenshotValue.toString());
    this.selectedReportYear = '';
    this.selectedReportVersion = null;
    this.disableVersionDrop = true;
    this.disableYearDrop = false;
  }

  onYearChange() {
    console.log('Año seleccionado:', this.selectedReportYear);
    this.loadReportVersionsByYear(
      this.selectedReportYear,
      this.selectedScreenshotOption
    );
    this.disableVersionDrop = false;
  }

  onVersionChange() {
    this.idReport = this.selectedReportVersion.id;
    console.log('Versión seleccionada:', this.selectedReportVersion);
    this.disableButtonSearch = false;
  }

  reloadComponent() {
    if (this.selectedReportVersion) {
      this.load = false;

      this.disableButtonSearch = true;

      console.log(
        'Componente recargado con idReport:',
        this.selectedReportVersion.id
      );

      this.idReport = this.selectedReportVersion.id;
      this.selectedReportName = this.selectedReportVersion.descripcion;
      this.titleScreenshotChip = this.selectedReportVersion.screenshot;
      this.selectedReportNameModificationDate =
        this.selectedReportVersion.fechaModificacion;
      this.selectedReportNameUserName = this.selectedReportVersion.usuario;

      this.loadProfileAndGradesData(this.idReport);

      this.initEM();
      this.initBA();
      this.initAR();
      this.initSE();
      this.initIE();
      this.initArSeDev();
      this.initArSeApi();
      this.initPyramide();

      this.screenshotEnabled = this.selectedReportVersion.screenshot !== 0;
      this.comentarios = this.selectedReportVersion.comentarios || '';
    }
  }

  toggleScreenshot() {
    if (this.selectedReportVersion) {
      this.selectedReportVersion.screenshot = this.screenshotEnabled ? 1 : 0;
      this.hasScreenshotChanged = !this.hasScreenshotChanged;
      console.log(this.selectedReportVersion.screenshot);
      console.log(this.hasScreenshotChanged);
    }
  }

  updateReport() {
    if (this.hasScreenshotChanged) {
      this.selectedReportVersion.screenshot = this.screenshotEnabled ? 1 : 0;
      this.selectedReportVersion.comentarios = this.comentarios;
      this.selectedReportVersion.usuario = this.userName;
    }

    this.skillsService.updateReport(this.selectedReportVersion).subscribe(
      (updatedReport) => {
        console.log('Informe actualizado');
      },
      (error) => {
        console.error('Error al actualizar el informe', error);
      }
    );

    this.hasScreenshotChanged = false;
  }

  confirmUpdateReport(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Quiere guardar los cambios?',
      header: 'Confirmación',
      icon: 'pi pi-question-circle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      acceptButtonStyleClass:
        'p-button p-button-success p-button-outlined mx-2',
      rejectButtonStyleClass: 'p-button p-button-danger p-button-outlined mx-2',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Se han guardado los cambios',
        });
        this.updateReport();
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'No se han guardado los cambios',
          life: 3000,
        });
      },
    });
  }

  loadAllLiterals(): void {
    this.skillsService.getAllLiterals().subscribe(
      (data: ColumnDetails[]) => {
        this.literals = data;
        console.log('Cargados literales');
        console.log(this.literals);
      },
      (error) => {
        console.error('Error al obtener los literales:', error);
      }
    );
  }

  loadProfileAndGradesData(idReport): void {
    this.skillsService.getProfileAndGradeTotals(idReport).subscribe(
      (data: ProfilesAndGrades[]) => {
        this.allProfilesAndGrades = data;
        this.EMData = this.allProfilesAndGrades['engagementManagers'];
        this.BAData = this.allProfilesAndGrades['businessAnalyst'];
        this.ARData = this.allProfilesAndGrades['architects'];
        let sum = [0, 0, 0];
        this.ARData.forEach((el) => {
          el.totals.forEach((t, i) => {
            sum[i] += t;
          });
        });
        this.ARData.push({
          profile: 'Total',
          totals: sum,
        });
        this.SEData = this.allProfilesAndGrades['softwareEngineer'];
        this.IEData = this.allProfilesAndGrades['industryExperts'];
        this.ArSeDevData = this.allProfilesAndGrades['architectsCustomApps'];
        this.ArSeApiData = this.allProfilesAndGrades['architectsIntegration'];
        console.log(
          'Datos para la versión ' + idReport + ':',
          this.allProfilesAndGrades
        );

        this.dataGradesRoles = this.allProfilesAndGrades['gradeTotal'];
        let rolesSum = [0, 0, 0, 0, 0];
        this.gradesRoles = this.dataGradesRoles.map((elem) => {
          let lineSum: number = 0;
          elem.totals.forEach((nb, index) => {
            lineSum += nb;
            rolesSum[index] += nb;
          });
          rolesSum[elem.totals.length] += lineSum;
          elem.totals.push(lineSum);
          return { profile: elem.grade, totals: elem.totals };
        });
        this.gradesRoles.push({
          profile: 'Sum',
          totals: rolesSum,
        });
        this.load = true;
      },
      (error) => {
        console.error(
          'Error al obtener los datos para la versión ' + idReport + ':',
          error
        );
      }
    );
  }

  initEM() {
    const emLiterals = this.literals.filter(
      (literal) => literal.type === 'Engagement Managers'
    );
    const emTextLiteral = emLiterals.find((literal) => literal.subtype === 't');
    if (emTextLiteral) {
      this.EMText = emTextLiteral.desc;
    }

    const emColLiterals = emLiterals.filter(
      (literal) => literal.subtype === 'c'
    );
    if (emColLiterals.length > 0) {
      this.EMCol = emColLiterals.map((literal) => literal.desc);
    }

    /* this.skillsService
      .getTableDetail('Engagement Managers', 't')
      .subscribe((info) => {
        this.EMText = info[0].desc;
      });

    this.skillsService
      .getTableDetail('Engagement Managers', 'c')
      .subscribe((info) => {
        this.EMCol = info.map((el) => el.desc);
      }); */

    /* this.skillsService
      .getProfileTotals('Engagement Managers', this.idReport)
      .subscribe((data) => {
        this.EMData = data;
      }); */
  }

  initBA() {
    const emLiterals = this.literals.filter(
      (literal) => literal.type === 'Business Analyst'
    );
    const emTextLiteral = emLiterals.find((literal) => literal.subtype === 't');
    if (emTextLiteral) {
      this.BAText = emTextLiteral.desc;
    }

    const emColLiterals = emLiterals.filter(
      (literal) => literal.subtype === 'c'
    );
    if (emColLiterals.length > 0) {
      this.BACol = emColLiterals.map((literal) => literal.desc);
    }

    /* this.skillsService
      .getTableDetail('Business Analyst', 't')
      .subscribe((info) => {
        this.BAText = info[0].desc;
      });

    this.skillsService
      .getTableDetail('Business Analyst', 'c')
      .subscribe((info) => {
        this.BACol = info.map((el) => el.desc);
      }); */

    /* this.skillsService
      .getProfileTotals('Business Analyst', this.idReport)
      .subscribe((data) => {
        this.BAData = data;
      }); */
  }

  initAR() {
    const emLiterals = this.literals.filter(
      (literal) => literal.type === 'Architects'
    );
    const emTextLiteral = emLiterals.find((literal) => literal.subtype === 't');
    if (emTextLiteral) {
      this.ARText = emTextLiteral.desc;
    }

    const emColLiterals = emLiterals.filter(
      (literal) => literal.subtype === 'c'
    );
    if (emColLiterals.length > 0) {
      this.ARCol = emColLiterals.map((literal) => literal.desc);
    }

    /* this.skillsService.getTableDetail('Architects', 't').subscribe((info) => {
      this.ARText = info[0].desc;
    });
    this.skillsService.getTableDetail('Architects', 'c').subscribe((info) => {
      this.ARCol = info.map((el) => el.desc);
    }); */

    /* this.skillsService
      .getProfileTotals('Architects', this.idReport)
      .subscribe((data) => {
        this.ARData = data;
        let sum = [0, 0, 0];
        this.ARData.forEach((el) => {
          el.totals.forEach((t, i) => {
            sum[i] += t;
          });
        });
        this.ARData.push({
          profile: 'Total',
          totals: sum,
        });
      }); */
  }

  initSE() {
    const emLiterals = this.literals.filter(
      (literal) => literal.type === 'Software Engineer'
    );
    const emTextLiteral = emLiterals.find((literal) => literal.subtype === 't');
    if (emTextLiteral) {
      this.SEText = emTextLiteral.desc;
    }

    const emColLiterals = emLiterals.filter(
      (literal) => literal.subtype === 'c'
    );
    if (emColLiterals.length > 0) {
      this.SECol = emColLiterals.map((literal) => literal.desc);
    }

    /*  this.skillsService
      .getTableDetail('Software Engineer', 't')
      .subscribe((info) => {
        this.SEText = info[0].desc;
      });

    this.skillsService
      .getTableDetail('Software Engineer', 'c')
      .subscribe((info) => {
        this.SECol = info.map((el) => el.desc);
      }); */

    /* this.skillsService
      .getProfileTotals('Software Engineer', this.idReport)
      .subscribe((data) => {
        this.SEData = data;
      }); */
  }

  initIE() {
    const emLiterals = this.literals.filter(
      (literal) => literal.type === 'Industry Experts'
    );
    const emTextLiteral = emLiterals.find((literal) => literal.subtype === 't');
    if (emTextLiteral) {
      this.IEText = emTextLiteral.desc;
    }

    const emColLiterals = emLiterals.filter(
      (literal) => literal.subtype === 'c'
    );
    if (emColLiterals.length > 0) {
      this.IECol = emColLiterals.map((literal) => literal.desc);
    }

    /* this.skillsService
      .getTableDetail('Industry Experts', 't')
      .subscribe((info) => {
        this.IEText = info[0].desc;
      });

    this.skillsService
      .getTableDetail('Industry Experts', 'c')
      .subscribe((info) => {
        this.IECol = info.map((el) => el.desc);
      }); */

    /* this.skillsService
      .getProfileTotals('Industry Experts', this.idReport)
      .subscribe((data) => {
        this.IEData = data;
      }); */
  }

  initArSeDev() {
    const emLiterals = this.literals.filter(
      (literal) => literal.type === 'Architects & SE Custom Apps Development'
    );
    const emTextLiteral = emLiterals.find((literal) => literal.subtype === 't');
    if (emTextLiteral) {
      this.ArSeDevText = emTextLiteral.desc;
    }

    const emColLiterals = emLiterals.filter(
      (literal) => literal.subtype === 'c'
    );
    if (emColLiterals.length > 0) {
      this.ArSeDevCol = emColLiterals.map((literal) => literal.desc);
    }

    /* this.skillsService
      .getTableDetail('Architects & SE Custom Apps Development', 't')
      .subscribe((info) => {
        this.ArSeDevText = info[0].desc;
      });

    this.skillsService
      .getTableDetail('Architects & SE Custom Apps Development', 'c')
      .subscribe((info) => {
        this.ArSeDevCol = info.map((el) => el.desc);
      }); */

    /* this.skillsService
      .getProfileTotals(
        'Architects & SE Custom Apps Development',
        this.idReport
      )
      .subscribe((data) => {
        this.ArSeDevData = data;
      }); */
  }

  initArSeApi() {
    const emLiterals = this.literals.filter(
      (literal) => literal.type === 'Architects & SE Integration & APIs'
    );
    const emTextLiteral = emLiterals.find((literal) => literal.subtype === 't');
    if (emTextLiteral) {
      this.ArSeApiText = emTextLiteral.desc;
    }

    const emColLiterals = emLiterals.filter(
      (literal) => literal.subtype === 'c'
    );
    if (emColLiterals.length > 0) {
      this.ArSeApiCol = emColLiterals.map((literal) => literal.desc);
    }
    /* this.skillsService
      .getTableDetail('Architects & SE Integration & APIs', 't')
      .subscribe((info) => {
        this.ArSeApiText = info[0].desc;
      });

    this.skillsService
      .getTableDetail('Architects & SE Integration & APIs', 'c')
      .subscribe((info) => {
        this.ArSeApiCol = info.map((el) => el.desc);
      }); */

    /* this.skillsService
      .getProfileTotals('Architects & SE Integration & APIs', this.idReport)
      .subscribe((data) => {
        this.ArSeApiData = data;
      }); */
  }

  initPyramide() {
    const gradeRoleLiterals = this.literals.filter(
      (literal) => literal.type === 'Pyramid Grade-Rol'
    );

    const gradeRoleTextLiteral = gradeRoleLiterals.find(
      (literal) => literal.subtype === 't'
    );
    if (gradeRoleTextLiteral) {
      this.gradeRoleText = gradeRoleTextLiteral.desc;
    }

    const gradeRoleColLiterals = gradeRoleLiterals.filter(
      (literal) => literal.subtype === 'c'
    );
    if (gradeRoleColLiterals.length > 0) {
      this.rolesCol = gradeRoleColLiterals.map((literal) => literal.desc);
      this.rolesCol.unshift('Grade');
      this.rolesCol.push('Total');
    }

    /* this.skillsService
      .getTableDetail('Pyramid Grade-Rol', 't')
      .subscribe((info) => {
        this.gradeRoleText = info[0].desc;
      });

    this.skillsService
      .getTableDetail('Pyramid Grade-Rol', 'c')
      .subscribe((info) => {
        this.rolesCol = info.map((el) => el.desc);
        this.rolesCol.unshift('Grade');
        this.rolesCol.push('Total');
      }); */

    /* this.skillsService.getGradesRoles(this.idReport).subscribe((data) => {
      let rolesSum = [0, 0, 0, 0, 0];
      this.gradesRoles = data.map((elem) => {
        let lineSum: number = 0;
        elem.totals.forEach((nb, index) => {
          lineSum += nb;
          rolesSum[index] += nb;
        });
        rolesSum[elem.totals.length] += lineSum;
        elem.totals.push(lineSum);
        return { profile: elem.grade, totals: elem.totals };
      });
      this.gradesRoles.push({
        profile: 'Sum',
        totals: rolesSum,
      });
      this.load = true;
    }); */
  }

  formatTable(data, cols): any {
    let dataTable = [];
    data.forEach((row) => {
      const line: Record<string, string> = {};
      line[cols[0]] = row.profile;
      row.totals.forEach((col, i) => {
        line[cols[i + 1]] = col.toString();
      });
      dataTable.push(line);
    });
    return dataTable;
  }

  exportExcelTotales() {
    let dataTable1 = this.formatTable(this.EMData, this.EMCol);
    let dataTable2 = this.formatTable(this.ARData, this.ARCol);
    let dataTable3 = this.formatTable(this.BAData, this.BACol);
    let dataTable4 = this.formatTable(this.SEData, this.SECol);
    let dataTable5 = this.formatTable(this.IEData, this.IECol);
    let dataTable6 = this.formatTable(this.ArSeDevData, this.ArSeDevCol);
    let dataTable7 = this.formatTable(this.ArSeApiData, this.ArSeApiCol);
    let dataTable8 = this.formatTable(this.gradesRoles, this.rolesCol);

    import('xlsx').then((xlsx) => {
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
      xlsx.utils.book_append_sheet(
        workbook,
        worksheet6,
        'Custom Apps Development'
      );
      xlsx.utils.book_append_sheet(workbook, worksheet7, 'Integration & APIs');
      xlsx.utils.book_append_sheet(workbook, worksheet8, 'Pyramid');
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'Informes');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  downloadExcel() {
    if (this.tableList.includes(this.selectedExcel)) {
      const baseUrl: string = environment.server;
      console.log('basr ', baseUrl);
      window.open(
        `${baseUrl}/profile/profilelist/${this.selectedExcel}/excel`,
        '_self'
      );
      this.closeDialog();
    }
  }

  exportExcel() {
    this.skillsService
      .sendToExport(this.selectedExcel, this.idReport)
      .subscribe((result) => {
        this.downloadFile(result, 'application/ms-excel');
      });
  }

  downloadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let a: any = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
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
