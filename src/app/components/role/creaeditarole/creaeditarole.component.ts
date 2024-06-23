import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Role } from '../../../models/role';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';

import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-creaeditarole',
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
  templateUrl: './creaeditarole.component.html',
  styleUrl: './creaeditarole.component.css',
})
export class CreaeditaroleComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  role: Role = new Role();
  listaUser: Users[] = [];
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private uS: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private rS: RoleService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      role: [''],
      user: [''],
    });
    this.uS.list().subscribe((data) => {
      this.listaUser = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.role.id = this.form.value.codigo;
      this.role.rol = this.form.value.role;
      this.role.user.id = this.form.value.user;

      if (this.edicion) {
        this.rS.update(this.role).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.role).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['role']);
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          role: new FormControl(data.rol),
          user: new FormControl(data.user.id),
        });
      });
    }
  }
}
