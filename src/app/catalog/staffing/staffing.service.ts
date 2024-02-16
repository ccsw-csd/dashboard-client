import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Staffing } from './model/staffing.model';

@Injectable({
  providedIn: 'root'
})
export class StaffingService {

  private baseUrl: string = environment.server;

  constructor(private http: HttpClient) { }

  getStaffingleImportsVersionsByYear(year: number): Observable<Staffing[]> {
    return this.http.get<Staffing[]>(`${this.baseUrl}/staffingimports/all/${year}`);
  }

  getStaffingAvailableYears(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/staffingimports/years`);
  }
  getAllStaffingImportsVersions(): Observable<Staffing[]> {
    return this.http.get<Staffing[]>(`${this.baseUrl}/staffingimports/all`);
  }
}
