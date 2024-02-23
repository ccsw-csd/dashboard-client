import { Component } from '@angular/core';
import { CapabilitiesService } from '../capabilities.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-capabilities-upload',
  templateUrl: './capabilities-upload.component.html',
  styleUrls: ['./capabilities-upload.component.scss'],
})
export class CapabilitiesUploadComponent {
  capabilityFile: File;
  isLoading: boolean;

  constructor(
    private capabilitiesService: CapabilitiesService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
  }

  onSelect(event: { currentFiles: File[] }) {
    const selectedFile = event.currentFiles[0];
    const fileName = selectedFile.name.toLowerCase();
    const pattern = /^20241103_roles\.[a-zA-Z0-9]+$/;
    if (!pattern.test(fileName)) {
      this.capabilityFile = null;
      this.snackbarService.error(
        'El nombre del archivo no cumple con el formato esperado.'
      );
    } else {
      this.capabilityFile = selectedFile;
    }
  }

  onRemove() {
    this.capabilityFile = null;
  }

  onImport() {
    if (!this.capabilityFile) {
      this.snackbarService.error('Por favor seleccione un archivo.');
      return;
    }
    let formData = new FormData();
    formData.append('capabilityFile', this.capabilityFile);
    this.isLoading = true;
    this.capabilitiesService.uploadCapability(formData).subscribe({
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
