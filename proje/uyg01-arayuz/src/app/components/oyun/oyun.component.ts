import { Sonuc } from '../../models/Sonuc';
import { OyunDialogComponent } from './../dialogs/oyun-dialog/oyun-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MyAlertService } from '../../services/myAlert.service';
import { ApiService } from '../../services/api.service';
import { Oyun } from './../../models/Oyun';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-oyun',
  templateUrl: './oyun.component.html',
  styleUrls: ['./oyun.component.scss']
})
export class OyunComponent implements OnInit {
  oyunlar: Oyun[];
  dataSource: any;
  displayedColumns = ['oyunKodu', 'oyunAdi', 'oyunFiyat', 'oyunUyeSayisi', 'detay'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<OyunDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.OyunListele();
  }
  OyunListele() {
    this.apiServis.OyunListe().subscribe((d: Oyun[]) => {
      this.oyunlar = d;
      this.dataSource = new MatTableDataSource(d);
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
    var yeniKayit: Oyun = new Oyun();
    this.dialogRef = this.matDialog.open(OyunDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.OyunEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.OyunListele();
          }
        });


      }
    });
  }
  Duzenle(kayit: Oyun) {
    this.dialogRef = this.matDialog.open(OyunDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.oyunId = kayit.oyunId;
        this.apiServis.OyunDuzenle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.OyunListele();
          }
        });
      }
    });
  }
  Sil(kayit: Oyun) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.oyunAdi + " isimli oyun silinecektir Onaylıyor musunuz?"
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.OyunSil(kayit.oyunId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.OyunListele();
          }
        });
      }
    });
  }
}
