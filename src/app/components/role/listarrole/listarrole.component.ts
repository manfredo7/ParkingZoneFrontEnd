import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Role } from '../../../models/role';
import { RoleService } from '../../../services/role.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarrole',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    CommonModule,
    MatPaginatorModule,
  ],
  templateUrl: './listarrole.component.html',
  styleUrls: ['./listarrole.component.css'],
})
export class ListarroleComponent implements OnInit {
  displayedColumns: string[] = ['rol', 'usuario', 'accion01', 'accion02'];
  dataSource: MatTableDataSource<Role> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rS: RoleService) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });

    this.rS.getList().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.rS.eliminar(id).subscribe(() => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}
