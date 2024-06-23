import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, RouterLink, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { Tpago } from '../../../models/tpago';
import { TpagoService } from '../../../services/tpago.service';

@Component({
  selector: 'app-creaeditatpago',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    NgIf,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './creaeditatpago.component.html',
  styleUrl: './creaeditatpago.component.css',
})
export class CreaeditatpagoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tipopago: Tpago = new Tpago();
  edicion: boolean = false;
  id: number = 0;
  mensaje: string = '';

  constructor(
    private tS: TpagoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      descripcion: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.tipopago.tipoPagoID = this.form.value.codigo;
      this.tipopago.descripcionTpago = this.form.value.descripcion;
      if (this.edicion) {
        this.tS.update(this.tipopago).subscribe(() => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      } else {
        this.tS.insert(this.tipopago).subscribe((data) => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      }
      this.router.navigate(['tpago']);
    }
  }

  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.tipoPagoID),
          descripcion: new FormControl(data.descripcionTpago),
        });
      });
    }
  }
}
