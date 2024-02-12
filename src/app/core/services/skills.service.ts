import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  Role,
  GradesRole,
  InformeTotal,
  ColumnDetails,
} from '../interfaces/Capabilities';
import { Report } from '../interfaces/Report';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private readonly baseUrl: string = environment.server;

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/role/config`);
  }

  getGradesRoles(idReport: number): Observable<GradesRole[]> {
    const params = new HttpParams().set('idReport', idReport.toString());
    return this.http.get<GradesRole[]>(
      `${this.baseUrl}/grade-role/gradetotals`,
      { params }
    );
  }

  getProfileAndGradeTotals(idReport: number): Observable<ProfilesAndGrades[]> {
    const params = new HttpParams().set('idReport', idReport.toString());
    return this.http.get<ProfilesAndGrades[]>(
      `${this.baseUrl}/profile/informeRoles`,
      { params }
    );
  }

  getProfileTotals(
    profile: string,
    idReport: number
  ): Observable<InformeTotal[]> {
    const params = new HttpParams().set('idReport', idReport.toString());
    return this.http.get<InformeTotal[]>(
      `${this.baseUrl}/profile/profiletotals/${profile}`,
      { params }
    );
  }

  getTableDetail(
    profile: string,
    infoType: string
  ): Observable<ColumnDetails[]> {
    return this.http.get<ColumnDetails[]>(
      `${this.baseUrl}/literal/config/${profile}/${infoType}`
    );
  }

  sendToExport(selectedExcel: string, idReport: number): Observable<Blob> {
    const params = new HttpParams().set('idReport', idReport.toString());
    const url = `${this.baseUrl}/profile/profilelist/${selectedExcel}/excel`;
    return this.http.get(url, { params, responseType: 'blob' }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud de exportación:', error);
        return throwError(error);
      })
    );
  }

  getReportImportsAvailableYears(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/reportimports/years`);
  }

  getReportImportsVersionsByYear(year: string): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.baseUrl}/reportimports/all/${year}`);
  }

  getAllReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.baseUrl}/reportimports/all`);
  }

  updateReport(report: Report): Observable<Report> {
    const url = `${this.baseUrl}/reportimports/${report.id}`;
    return this.http.put<Report>(url, report);
  }
}
