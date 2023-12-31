import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Role,GradesRole,InformeTotal,ColumnDetails } from '../interfaces/capacidades'
@Injectable({
  providedIn: 'root'
})

export class SkillsService {
  private baseUrl : string = environment.server;
  constructor(private http: HttpClient) { }

  getRoles():Observable<Role[]> {
    return this.http.get<Role[]>(`${ this.baseUrl }/role/config`);
  }
  getGradesRoles():Observable<GradesRole[]> {
    return this.http.get<GradesRole[]>(`${ this.baseUrl }/grade-role/gradetotals`);
  }

  getProfileTotals(profile):Observable<InformeTotal[]> {
    return this.http.get<InformeTotal[]>(`${ this.baseUrl }/profile/profiletotals/${profile}`);
  }

  getTableDetail(profile,infoType):Observable<ColumnDetails[]> {
    return this.http.get<ColumnDetails[]>(`${ this.baseUrl }/literal/config/${profile}/${infoType}`);
  }

  sendToExport(selectedExcel): Observable<object>{
    let url = `${this.baseUrl}/profile/profilelist/${selectedExcel}/excel`;
    return this.http.get<object>(url, { responseType: 'blob' as 'json' });
  }

}
