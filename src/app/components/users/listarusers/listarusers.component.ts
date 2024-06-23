import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgIf } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarusers',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    NgIf,
    CommonModule,
    MatPaginatorModule,
  ],
  templateUrl: './listarusers.component.html',
  styleUrl: './listarusers.component.css',
})
export class ListarusersComponent implements OnInit {
  displayedColumns: string[] = [
    'username',
    'nombre',
    'apellidoP',
    'apellidoM',
    'correo',
    'detalles',
    'accion01',
    'accion02',
  ];
  dataSource: MatTableDataSource<Users> = new MatTableDataSource();
  expandedElement: Users | null = null;

  constructor(private uS: UsersService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.uS.eliminar(id).subscribe(() => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
}
