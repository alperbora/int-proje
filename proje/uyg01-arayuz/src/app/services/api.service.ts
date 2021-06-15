
import { Kayit } from './../models/kayit';
import { Oyun } from './../models/Oyun';
import { Uyeler } from './../models/Uyeler';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://localhost:14309/api/";
  siteUrl = "http://localhost:14309/";
  constructor(
    public http: HttpClient
  ) { }

  UyelerListe() {
    return this.http.get(this.apiUrl + "uyelerliste");
  }
  UyelerById(uyeId: string) {
    return this.http.get(this.apiUrl + "uyelerbyid/" + uyeId);
  }
  UyelerEkle(uye: Uyeler) {
    return this.http.post(this.apiUrl + "uyelerekle", uye);
  }
  UyelerDuzenle(uye: Uyeler) {
    return this.http.put(this.apiUrl + "uyelerduzenle", uye);
  }
  UyelerSil(uyeId: string) {
    return this.http.delete(this.apiUrl + "uyelersil/" + uyeId);
  }
  
  OyunListe() {
    return this.http.get(this.apiUrl + "oyunliste");
  }
  OyunById(oyunId: string) {
    return this.http.get(this.apiUrl + "oyunbyid/" + oyunId);
  }
  OyunEkle(oyun: Oyun) {
    return this.http.post(this.apiUrl + "oyunekle", oyun);
  }
  OyunDuzenle(oyun: Oyun) {
    return this.http.put(this.apiUrl + "oyunduzenle", oyun);
  }
  OyunSil(oyunId: string) {
    return this.http.delete(this.apiUrl + "oyunsil/" + oyunId);
  }

  UyelerOyunListe(uyeId: string) {
    return this.http.get(this.apiUrl + "uyeleroyunliste/" + uyeId);
  }
  OyunUyelerListe(oyunId: string) {
    return this.http.get(this.apiUrl + "oyunuyelerliste/" + oyunId);
  }
  KayitEkle(kayit: Kayit) {
    return this.http.post(this.apiUrl + "kayitekle", kayit);
  }
  KayitSil(kayitId: string) {
    return this.http.delete(this.apiUrl + "kayitsil/" + kayitId);
  }
}
