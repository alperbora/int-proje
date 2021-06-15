
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Uyeler } from 'src/app/models/Uyeler';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

import { UyelerDialogComponent } from '../uyeler-dialog/uyeler-dialog.component';

@Component({
  selector: 'app-uyesec-dialog',
  templateUrl: './uyesec-dialog.component.html',
  styleUrls: ['./uyesec-dialog.component.css']
})
export class UyesecDialogComponent implements OnInit {

  uyelerim: Uyeler[];

  displayedColumns = ['uyeNo', 'uyeAdsoyad', 'uyeDogTarih', 'uyeOyunSayisi', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public dialogRef: MatDialogRef<UyelerDialogComponent>
  ) { }

  ngOnInit() {
    this.UyelerListele();
  }
  UyelerListele() {
    this.apiServis.UyelerListe().subscribe((d: Uyeler[]) => {
      this.uyelerim = d;
      this.dataSource = new MatTableDataSource(this.uyelerim);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Filtrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();

    }
  }
  UyelerSec(uye: Uyeler) {
    this.dialogRef.close(uye);
  }
}
