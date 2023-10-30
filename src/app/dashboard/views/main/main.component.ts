import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(
    private router: Router
  ) { }
  goToChart() {
    this.router.navigateByUrl('/statistic');
  }

  goToList() {
    this.router.navigateByUrl('/persons');
  }

  goToMaestro() {
    this.router.navigateByUrl('/maestro');
  }
}
