import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Capability } from 'src/app/catalog/capabilities/model/Capability';
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

  uploadCapability(formData: FormData): Observable<String> {
    console.log('Archivo roles subido');
    return this.http.post<String>(
      environment.server + '/import/data',
      formData
    );
  }
}
