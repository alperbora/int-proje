import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Uyeler } from 'src/app/models/Uyeler';

@Component({
  selector: 'app-uyeler-dialog',
  templateUrl: './uyeler-dialog.component.html',
  styleUrls: ['./uyeler-dialog.component.css']
})
export class UyelerDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  frm: FormGroup;
  yeniKayit: Uyeler;
  constructor(
    public matDialog: MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef: MatDialogRef<UyelerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Üyeler Ekle";
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Üyeler Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {

  }
  FormOlustur() {
    return this.frmBuild.group({
      uyeNo: [this.yeniKayit.uyeNo],
      uyeAdsoyad: [this.yeniKayit.uyeAdsoyad],
      uyeDogTarih: [this.yeniKayit.uyeDogTarih],
    });
  }
}
