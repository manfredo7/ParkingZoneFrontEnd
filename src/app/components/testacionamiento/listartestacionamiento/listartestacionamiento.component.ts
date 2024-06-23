import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Testacionamiento } from '../../../models/testacionamiento';
import { TestacionamientoService } from '../../../services/testacionamiento.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listartestacionamiento',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './listartestacionamiento.component.html',
  styleUrl: './listartestacionamiento.component.css',
})
export class ListartestacionamientoComponent implements OnInit {
  displayedColumns: string[] = [
    'codigo',
    'descripcion',
    'medida',
    'accion01',
    'accion02',
  ];

  dataSource: MatTableDataSource<Testacionamiento> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private teS: TestacionamientoService) {}
  ngOnInit(): void {
    this.teS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.teS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.teS.eliminar(id).subscribe((data) => {
      this.teS.list().subscribe((data) => {
        this.teS.setList(data);
      });
    });
  }
}
