import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Report } from 'src/app/catalog/report/model/Report';
import { environment } from 'src/environments/environment';
import { Capability } from '../capabilities/model/Capability';
import { Staffing } from '../staffing/model/staffing.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private baseUrl: string = environment.server;

  constructor(private http: HttpClient) {}

  getAllReportVersions(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.baseUrl}/reportimports/all`);
  }

  getAllRoleImportsVersions(): Observable<Capability[]> {
    return this.http.get<Capability[]>(`${this.baseUrl}/roleimports/all`);
  }

  getAllStaffingImportsVersions(): Observable<Staffing[]> {
    return this.http.get<Staffing[]>(`${this.baseUrl}/staffingimports/all`);
  }
}
