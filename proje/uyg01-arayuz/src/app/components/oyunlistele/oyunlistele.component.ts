import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from '../../models/Sonuc';
import { Oyun } from './../../models/Oyun';
import { Uyeler } from 'src/app/models/Uyeler';
import { Kayit } from '../../models/kayit';
import { MyAlertService } from '../../services/myAlert.service';
import { ApiService } from '../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-oyunlistele',
  templateUrl: './oyunlistele.component.html',
  styleUrls: ['./oyunlistele.component.css']
})
export class OyunlisteleComponent implements OnInit {
  kayitlar: Kayit[];
  oyunlar: Oyun[];
  secUyeler: Uyeler;
  uyeId: string;
  oyunId: string = "";
  displayedColumns = ['oyunKodu', 'oyunAdi', 'oyunFiyat', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
    public route: ActivatedRoute,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p) {
        this.uyeId = p.uyeId;
        this.UyelerGetir();
        this.KayitListele();
        this.OyunListele();
      }
    });
  }

  UyelerGetir() {
    this.apiServis.UyelerById(this.uyeId).subscribe((d: Uyeler) => {
      this.secUyeler = d;
    });
  }
  KayitListele() {
    this.apiServis.UyelerOyunListe(this.uyeId).subscribe((d: Kayit[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  OyunListele() {
    this.apiServis.OyunListe().subscribe((d: Oyun[]) => {
      this.oyunlar = d;
    });
  }
  OyunSec(oyunId: string) {
    this.oyunId = oyunId;
  }
  Kaydet() {
    if (this.oyunId == "") {
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "Oyun Seçiniz";
      this.alert.AlertUygula(s);

      return false;
    }

    var kayit: Kayit = new Kayit();
    kayit.kayitOyunId = this.oyunId;
    kayit.kayitUyeId = this.uyeId;

    this.apiServis.KayitEkle(kayit).subscribe((s: Sonuc) => {
      this.alert.AlertUygula(s);
      if (s.islem) {
        this.KayitListele();
      }
    });

  }

  Sil(kayit: Kayit) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.oyunBilgi.oyunAdi + " Oyuni Silinecektir Onaylıyor musunuz?";
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
