import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { EstacionamientoService } from '../../../services/estacionamiento.service';
import { Estacionamiento } from '../../../models/estacionamiento';
import { NgIf } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarestacionamiento',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    NgIf,
    MatPaginatorModule,
  ],
  templateUrl: './listarestacionamiento.component.html',
  styleUrl: './listarestacionamiento.component.css',
})
export class ListarestacionamientoComponent implements OnInit {
  displayedColumns: string[] = [
    'nombre',
    'direccion',
    'capacidad',
    'hoperativo',
    'detalles',
    'accion01',
    'accion02',
  ];

  dataSource: MatTableDataSource<Estacionamiento> = new MatTableDataSource();
  expandedElement: Estacionamiento | null = null;

  constructor(private eS: EstacionamientoService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.eS.eliminar(id).subscribe((data) => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);
      });
    });
  }
}
