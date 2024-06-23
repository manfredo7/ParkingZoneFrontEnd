import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartpagoComponent } from './listartpago/listartpago.component';

@Component({
  selector: 'app-tpago',
  standalone: true,
  imports: [RouterOutlet, ListartpagoComponent],
  templateUrl: './tpago.component.html',
  styleUrl: './tpago.component.css',
})
export class TpagoComponent {
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {}
}
