import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Users } from '../../../models/users';
import { Membresia } from '../../../models/membresia';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MembresiaService } from '../../../services/membresia.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-creaeditausers',
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  templateUrl: './creaeditausers.component.html',
  styleUrl: './creaeditausers.component.css',
})
export class CreaeditausersComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  user: Users = new Users();
  listaMembresia: Membresia[] = [];
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private uS: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private mS: MembresiaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      username2: ['', Validators.required],
      password2: ['', Validators.required],
      enabled: [''],
      fregistro: [''],
      nombre: ['', Validators.required],
      apellidoP: ['', Validators.required],
      apellidoM: [''],
      fnacimiento: [''],
      correo: ['', [Validators.required, Validators.email]],
      membresia: [''],
    });
    this.mS.list().subscribe((data) => {
      this.listaMembresia = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.user.id = this.form.value.codigo;
      this.user.username = this.form.value.username2;
      this.user.password = this.form.value.password2;
      this.user.enabled = this.form.value.enabled;
      this.user.fregistro = this.form.value.fregistro;
      this.user.nombre = this.form.value.nombre;
      this.user.apellidoP = this.form.value.apellidoP;
      this.user.apellidoM = this.form.value.apellidoM;
      this.user.fnacimiento = this.form.value.fnacimiento;
      this.user.correo = this.form.value.correo;

      if (!this.user.membresia) {
        this.user.membresia = new Membresia();
      }
      this.user.membresia.idMembresia = this.form.value.membresia;

      if (this.edicion) {
        this.uS.update(this.user).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.user).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
      this.router.navigate(['usuario']);
    }
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          username2: new FormControl(data.username, Validators.required),
          password2: new FormControl(data.password, Validators.required),
          enabled: new FormControl(data.enabled),
          fregistro: new FormControl(data.fregistro),
          nombre: new FormControl(data.nombre, Validators.required),
          apellidoP: new FormControl(data.apellidoP, Validators.required),
          apellidoM: new FormControl(data.apellidoM),
          fnacimiento: new FormControl(data.fnacimiento),
          correo: new FormControl(data.correo, [
            Validators.required,
            Validators.email,
          ]),
          membresia: new FormControl(
            data.membresia ? data.membresia.idMembresia : null
          ),
        });
      });
    }
  }
}
