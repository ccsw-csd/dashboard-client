import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Staffing } from './model/staffing.model';

@Injectable({
  providedIn: 'root',
})
export class StaffingService {
  private baseUrl: string = environment.server;

  constructor(private http: HttpClient) {}

  getAllStaffingImportsVersions(): Observable<Staffing[]> {
    return this.http.get<Staffing[]>(`${this.baseUrl}/staffingimports/all`);
  }

  uploadStaffing(formData: FormData): Observable<String> {
    console.log('Archivo staffing subido');
    return this.http.post<String>(
      environment.server + '/import/data',
      formData
    );
  }
}
