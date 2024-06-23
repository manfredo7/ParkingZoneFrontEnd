import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pago } from '../../../models/pago';
import { PagoService } from '../../../services/pago.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarpago',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    CommonModule,
    MatPaginatorModule,
  ],
  templateUrl: './listarpago.component.html',
  styleUrl: './listarpago.component.css',
})
export class ListarpagoComponent implements OnInit {
  displayedColumns: string[] = [
    'monto',
    'fechahora',
    'detalles',
    'accion01',
    'accion02',
  ];

  dataSource: MatTableDataSource<Pago> = new MatTableDataSource();
  expandedElement: Pago | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pS: PagoService) {}

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.pS.eliminar(id).subscribe(() => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }
}
