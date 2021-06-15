

import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from '../../services/myAlert.service';
import { Sonuc } from '../../models/Sonuc';
import { UyelerDialogComponent } from './../dialogs/uyeler-dialog/uyeler-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Uyeler } from 'src/app/models/Uyeler';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-uyeler',
  templateUrl: './uyeler.component.html',
  styleUrls: ['./uyeler.component.scss']
})
export class UyelerComponent implements OnInit {
  uyelerim: Uyeler[];
  displayedColumns = ['uyeNo', 'uyeAdsoyad', 'uyeDogTarih', 'uyeOyunSayisi', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<UyelerDialogComponent>;
  
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
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

  Ekle() {
    var yeniKayit: Uyeler = new Uyeler();
    this.dialogRef = this.matDialog.open(UyelerDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UyelerEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyelerListele();
          }
        });
      }
    });

  }

  Duzenle(kayit: Uyeler) {
    this.dialogRef = this.matDialog.open(UyelerDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.uyeNo = d.uyeNo;
        kayit.uyeAdsoyad = d.uyeAdsoyad;
        kayit.uyeDogTarih = d.uyeDogTarih;

        this.apiServis.UyelerDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
        });
      }
    });
  }

  Sil(kayit: Uyeler) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.uyeAdsoyad + " isimli üye silinecektir Onaylıyor musunuz?"

    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UyelerSil(kayit.uyeId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyelerListele();
          }
        });
      }
    });
  }
}

