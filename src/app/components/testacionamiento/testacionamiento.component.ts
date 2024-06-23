import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartestacionamientoComponent } from './listartestacionamiento/listartestacionamiento.component';

@Component({
  selector: 'app-testacionamiento',
  standalone: true,
  imports: [RouterOutlet, ListartestacionamientoComponent],
  templateUrl: './testacionamiento.component.html',
  styleUrl: './testacionamiento.component.css',
})
export class TestacionamientoComponent {
  constructor(public route: ActivatedRoute) {}
}
