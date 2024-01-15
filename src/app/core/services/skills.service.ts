import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Role, GradesRole, InformeTotal, ColumnDetails } from '../interfaces/capacidades'
import { Capability } from '../interfaces/Capability';


@Injectable({
  providedIn: 'root'
})

export class SkillsService {

  private baseUrl: string = environment.server;
  idImport: number;

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/role/config`);
  }
  getGradesRoles(idImport): Observable<GradesRole[]> {
    return this.http.get<GradesRole[]>(`${this.baseUrl}/grade-role/gradetotals`, { params: { idImport: idImport.toString() } });
  }

  getProfileTotals(profile, idImport): Observable<InformeTotal[]> {
    return this.http.get<InformeTotal[]>(`${this.baseUrl}/profile/profiletotals/${profile}`, { params: { idImport: idImport.toString() } });
  }

  getTableDetail(profile, infoType): Observable<ColumnDetails[]> {
    return this.http.get<ColumnDetails[]>(`${this.baseUrl}/literal/config/${profile}/${infoType}`);
  }

  sendToExport(selectedExcel, idImport): Observable<object> {
    let url = `${this.baseUrl}/profile/profilelist/${selectedExcel}/excel`;
    return this.http.get<object>(url, { params: { idImport: idImport.toString() }, responseType: 'blob' as 'json' });
  }

  getRoleImportsAvailableYears(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/roleimports/years`);
  }

  getRoleImportsVersionsByYear(year: string): Observable<Capability[]> {
    return this.http.get<Capability[]>(`${this.baseUrl}/roleimports/all/${year}`);
  }

  getStaffingAvailableYears(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/staffingimports/years`);
  }

  getStaffingVersionsByYear(year: string): Observable<Capability[]> {
    return this.http.get<Capability[]>(`${this.baseUrl}/staffingimports/all/${year}`);
  }
  
}
