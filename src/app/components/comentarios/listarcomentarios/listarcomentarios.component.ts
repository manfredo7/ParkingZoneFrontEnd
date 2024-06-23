import { Component, OnInit, ViewChild } from '@angular/core';
import { Comentarios } from '../../../models/comentarios';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ComentariosService } from '../../../services/comentarios.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarcomentarios',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    CommonModule,
    MatPaginatorModule,
  ],
  templateUrl: './listarcomentarios.component.html',
  styleUrl: './listarcomentarios.component.css',
})
export class ListarcomentariosComponent implements OnInit {
  displayedColumns: string[] = [
    'estacionamiento',
    'puntuacion',
    'accion01',
    'accion02',
  ];
  dataSource: MatTableDataSource<Comentarios> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: ComentariosService) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });

    this.cS.getList().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.cS.eliminar(id).subscribe(() => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
}
