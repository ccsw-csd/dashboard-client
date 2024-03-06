import { Component } from '@angular/core';
import { StaffingService } from '../staffing.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-staffing-upload',
  templateUrl: './staffing-upload.component.html',
  styleUrls: ['./staffing-upload.component.scss'],
})
export class StaffingUploadComponent {
  staffingFile: File;
  isLoading: boolean;

  constructor(
    private staffingService: StaffingService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
  }

  onSelect(event: { currentFiles: File[] }) {
    this.staffingFile = event.currentFiles[0];
  }

  onRemove() {
    this.staffingFile = null;
  }

  onImport() {
    if (!this.staffingFile) {
      this.snackbarService.error('Por favor seleccione un archivo.');
      return;
    }
    let formData = new FormData();
    formData.append('staffingFile', this.staffingFile);
    this.isLoading = true;
    this.staffingService.uploadStaffing(formData).subscribe({
      next: (result) => {
        if (result)
          this.snackbarService.showMessage(
            'Archivo subido correctamente. ' + result
          );
        else this.snackbarService.showMessage('Archivo subido correctamente.');
        this.isLoading = false;
        this.close(true);
      },
      error: (error) => {
        this.snackbarService.error(error);
        this.isLoading = false;
      },
    });
  }

  onCancel() {
    this.close(false);
  }

  close(isUpload: boolean) {
    this.dialogRef.close(isUpload);
  }
}
