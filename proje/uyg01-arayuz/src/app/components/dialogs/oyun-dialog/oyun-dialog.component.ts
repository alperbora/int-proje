import { Oyun } from './../../../models/Oyun';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-oyun-dialog',
  templateUrl: './oyun-dialog.component.html',
  styleUrls: ['./oyun-dialog.component.css']
})
export class OyunDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  frm: FormGroup;
  yeniKayit: Oyun;
  constructor(
    public matDialog: MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef: MatDialogRef<OyunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Oyun Ekle";
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Oyun Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {

  }
  FormOlustur() {
    return this.frmBuild.group({
      oyunKodu: [this.yeniKayit.oyunKodu],
      oyunAdi: [this.yeniKayit.oyunAdi],
      oyunFiyat: [this.yeniKayit.oyunFiyat],
    });
  }

}
