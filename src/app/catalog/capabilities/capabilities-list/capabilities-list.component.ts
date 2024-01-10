import { Component } from '@angular/core';
import { CapabilitiesService } from '../capabilities.service';
import { Capability } from '../model/Capability';

@Component({
  selector: 'app-capabilities-list',
  templateUrl: './capabilities-list.component.html',
  styleUrls: ['./capabilities-list.component.scss']
})
export class CapabilitiesListComponent {

  capabilities: Capability[];

  constructor(private capabilitiesService: CapabilitiesService) { }

  ngOnInit() {
    this.capabilitiesService.getCapabilities().subscribe(
      capabilities => this.capabilities = capabilities
    )
  }

}
