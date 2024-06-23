import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarusersComponent } from './listarusers/listarusers.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterOutlet, ListarusersComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  constructor(public route: ActivatedRoute) {}
}
