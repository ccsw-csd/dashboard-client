import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Capability } from '../../capabilities/model/Capability';
import { Staffing } from '../../staffing/model/staffing.model';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-report-generator',
  templateUrl: './report-generator.component.html',
  styleUrls: ['./report-generator.component.scss'],
})
export class ReportGeneratorComponent implements OnInit {
  isLoading: boolean;
  capabilities: Capability[] = [];
  staffing: Staffing[] = [];
  certificates: string[];
  selectedCapability: Capability;
  selectedStaffing: Staffing;
  selectedCertificate: string;

  constructor(
    private reportService: ReportService,
    public dialogRef: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.reportService
      .getAllRoleImportsVersions()
      .subscribe((capabilities: Capability[]) => {
        this.capabilities = capabilities.sort((a, b) => b.id - a.id);
        this.selectedCapability = this.capabilities[0];
      });

    this.reportService
      .getAllStaffingImportsVersions()
      .subscribe((staffing: Staffing[]) => {
        this.staffing = staffing.sort((a, b) => b.id - a.id);
        this.selectedStaffing = this.staffing[0];
      });
  }

  onGenerate() {
    console.log('Generado');
  }

  onCancel() {
    this.close(false);
  }

  close(isUpload: boolean) {
    this.dialogRef.close(isUpload);
  }
}
