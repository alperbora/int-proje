import { MyAlertService } from '../../services/myAlert.service';
import { Sonuc } from '../../models/Sonuc';
import { Kayit } from '../../models/kayit';
import { Oyun } from './../../models/Oyun';
import { ApiService } from '../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Uyeler } from 'src/app/models/Uyeler';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { UyesecDialogComponent } from '../dialogs/uyesec-dialog/uyesec-dialog.component';

@Component({
  selector: 'app-uyelistele',
  templateUrl: './uyelistele.component.html',
  styleUrls: ['./uyelistele.component.css']
})
export class UyelisteleComponent implements OnInit {
  oyunId: string;
  secOyun: Oyun;
  kayitlar: Kayit[];
  displayedColumns = ['uyeNo', 'uyeAdsoyad', 'uyeDogTarih', 'uyeOyunSayisi', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<UyesecDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.oyunId = p.oyunId;
      this.OyunById();
      this.KayitListele();
    });
  }
  KayitListele() {
    this.apiServis.OyunUyelerListe(this.oyunId).subscribe((d: Kayit[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  OyunById() {
    this.apiServis.OyunById(this.oyunId).subscribe((d: Oyun) => {
      this.secOyun = d;
    });
  }

  Ekle() {
    this.dialogRef = this.matDialog.open(UyesecDialogComponent, {
      width: '800px'
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        var kayit: Kayit = new Kayit();
        kayit.kayitUyeId = d.uyeId;
        kayit.kayitOyunId = this.oyunId;

        this.apiServis.KayitEkle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        });
      }
    });
  }

  Sil(kayit: Kayit) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.uyeBilgi.uyeAdsoyad + " isimli üye oyundan çıkarılacaktır Onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KayitSil(kayit.kayitId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        });
      }
    });
  }
}
