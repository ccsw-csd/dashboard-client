import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SkillsService {
  private baseUrl : string = environment.server;
  constructor(private http: HttpClient) { }

  getPersons():Observable<any[]> {
    return this.http.get<any[]>(`${ this.baseUrl }/person`);
  }

}
