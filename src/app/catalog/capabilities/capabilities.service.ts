import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Capability } from './model/Capability';
import { capabilities_mock } from './model/mock-capabilities';


@Injectable({
  providedIn: 'root'
})
export class CapabilitiesService {

  private capabilities: Capability[] = capabilities_mock;

  constructor() { }

  getCapabilities(): Observable<Capability[]> {
    return of(this.capabilities);
  }
}