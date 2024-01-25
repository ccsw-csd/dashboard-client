import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Role, GradesRole, InformeTotal, ColumnDetails } from '../interfaces/Capabilities'
import { Report } from '../interfaces/Report';


@Injectable({
  providedIn: 'root'
})

export class SkillsService {

  private baseUrl: string = environment.server;

  private idReport: number;

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/role/config`);
  }
  getGradesRoles(idReport): Observable<GradesRole[]> {
    return this.http.get<GradesRole[]>(`${this.baseUrl}/grade-role/gradetotals`, { params: { idReport: idReport.toString() } });
  }

  getProfileTotals(profile, idReport): Observable<InformeTotal[]> {
    return this.http.get<InformeTotal[]>(`${this.baseUrl}/profile/profiletotals/${profile}`, { params: { idReport: idReport.toString() } });
  }

  getTableDetail(profile, infoType): Observable<ColumnDetails[]> {
    return this.http.get<ColumnDetails[]>(`${this.baseUrl}/literal/config/${profile}/${infoType}`);
  }

  sendToExport(selectedExcel, idReport): Observable<object> {
    let url = `${this.baseUrl}/profile/profilelist/${selectedExcel}/excel`;
    return this.http.get<object>(url, { params: { idReport: idReport.toString() }, responseType: 'blob' as 'json' });
  }

  getReportImportsAvailableYears(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/reportimports/years`);
  }
  getReportImportsVersionsByYear(year: string): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.baseUrl}/reportimports/all/${year}`);
  }

}
