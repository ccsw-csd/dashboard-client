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
  file: File;
  isLoading: boolean;

  /**
   * Constructor: inicializa servicios necesarios para comunicación y manejo de datos en pantalla.
   *
   * @param capabilitiesService Servicio EvidenceService para envío de datos a backend
   * @param dialogRef DynamicDialogRef, referencia al diálogo de la ventana Upload
   * @param config DynamicDialogCongig, configuración del diálogo de la ventana Upload
   * @param snackbarService Servicio SnackbarService para muestra de notificaciones o avisos en pantalla
   */
  constructor(
    private capabilitiesService: CapabilitiesService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private snackbarService: SnackbarService
  ) {}

  /**
   * Inicializar componente: reset de deleteComments y ocultar animación de carga.
   */
  ngOnInit(): void {
    this.isLoading = false;
  }

  /**
   * Asignar el archivo subido a través de fileUpload a variable local file.
   *
   * @param event Evento recibido tras selección de archivo
   */
  onSelect(event: { currentFiles: File[] }) {
    this.file = event.currentFiles[0];
  }

  /**
   * Eliminar archivo seleccionado de variable local, y resetear valor deleteComments.
   */
  onRemove() {
    this.file = null;
  }

  /**
   * Enviar archivo seleccionado al backend a través de CapabilitiesService.
   *
   * Se habilita la animación de carga hasta recibir una respuesta de backend.
   * Se asume que se ha seleccionado un archivo, y que es de formato .xls o .xlsx.
   * Se muestra un error en pantalla en caso de recibir un archivo no válido o de producirse un fallo durante el envío.
   * Este método no se ejecutará si no se ha seleccionado un archivo (botón deshabilitado).
   */
  onImport() {
    let formData = new FormData();
    formData.append('file', this.file);
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

  /**
   * En caso de cancelar el proceso, cerrar el diálogo.
   */
  onCancel() {
    this.close(false);
  }

  /**
   * Cerrar diálogo.
   */
  close(isUpload: boolean) {
    this.dialogRef.close(isUpload);
  }
}
