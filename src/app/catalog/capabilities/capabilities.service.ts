import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Capability } from 'src/app/core/interfaces/Capability';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CapabilitiesService {
  private baseUrl: string = environment.server;

  constructor(private http: HttpClient) {}

  getAllRoleImportsVersions(): Observable<Capability[]> {
    return this.http.get<Capability[]>(`${this.baseUrl}/roleimports/all`);
  }

  uploadCapability(formData: FormData): Observable<FormData>{
    console.log('Archivo capabilities subido');
    return;
  }
}
