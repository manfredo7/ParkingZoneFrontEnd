import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Pagoq1Component } from './pagoq1/pagoq1.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet, Pagoq1Component],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css',
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
