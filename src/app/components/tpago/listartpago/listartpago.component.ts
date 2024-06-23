import { Component, OnInit, ViewChild } from '@angular/core';
import { Tpago } from '../../../models/tpago';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TpagoService } from '../../../services/tpago.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listartpago',
  standalone: true,
  imports: [
    MatTableModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './listartpago.component.html',
  styleUrl: './listartpago.component.css',
})
export class ListartpagoComponent implements OnInit {
  displayedColumns: string[] = [
    'codigo',
    'descripcion',
    'accion01',
    'accion02',
  ];

  dataSource: MatTableDataSource<Tpago> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tS: TpagoService) {}
  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.tS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.tS.eliminar(id).subscribe((data) => {
      this.tS.list().subscribe((data) => {
        this.tS.setList(data);
      });
    });
  }
}
