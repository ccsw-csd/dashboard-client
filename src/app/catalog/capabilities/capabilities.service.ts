import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Capability } from 'src/app/core/interfaces/Capability';
// import { capabilities_mock } from 'src/app/core/interfaces/mock-capabilities';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CapabilitiesService {

  private baseUrl: string = environment.server;
  // private capabilities: Capability[] = capabilities_mock;

  constructor(private http: HttpClient) { }

  /* getCapabilities(): Observable<Capability[]> {
    return of(this.capabilities);
  } */

  getRoleImportsVersionsByYear(year: number): Observable<Capability[]> {
    return this.http.get<Capability[]>(`${this.baseUrl}/roleimports/all/${year}`);
  }

  getRolesAvailableYears(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/roleimports/years`);
  }

}