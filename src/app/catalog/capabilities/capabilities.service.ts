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

  getRoleImportsVersionsByYear(year: number): Observable<Capability[]> {
    return this.http.get<Capability[]>(
      `${this.baseUrl}/roleimports/all/${year}`
    );
  }

  getRolesAvailableYears(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/roleimports/years`);
  }
}
