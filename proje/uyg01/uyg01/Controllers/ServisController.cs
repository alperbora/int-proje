using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web.Http;
using uyg04.Models;
using uyg04.ViewModel;
namespace uyg04.Controllers
{
    public class ServisController : ApiController
    {
        DB03Entities db = new DB03Entities();
        SonucModel sonuc = new SonucModel();

        #region Oyun
        [HttpGet]
        [Route("api/oyunliste")]
        public List<OyunModel> OyunListe()
        {
            List<OyunModel> liste = db.Oyun.Select(x => new OyunModel()
            {
                oyunId = x.oyunId,
                oyunKodu = x.oyunKodu,
                oyunAdi = x.oyunAdi,
                oyunFiyat = x.oyunFiyat,
                oyunUyeSayisi = x.Kayit.Count()
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/oyunbyid/{oyunId}")]
        public OyunModel OyunById(string oyunId)
        {
            OyunModel kayit = db.Oyun.Where(s => s.oyunId == oyunId).Select(x => new OyunModel()
            {
                oyunId = x.oyunId,
                oyunKodu = x.oyunKodu,
                oyunAdi = x.oyunAdi,
                oyunFiyat = x.oyunFiyat,
                oyunUyeSayisi = x.Kayit.Count()
            }).SingleOrDefault();

            return kayit;
        }


        [HttpPost]
        [Route("api/oyunekle")]
        public SonucModel OyunEkle(OyunModel model)
        {
            if (db.Oyun.Count(s => s.oyunKodu == model.oyunKodu) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Oyun Kodu Kayıtlıdır!";
                return sonuc;
            }

            Oyun yeni = new Oyun();
            yeni.oyunId = Guid.NewGuid().ToString();
            yeni.oyunKodu = model.oyunKodu;
            yeni.oyunAdi = model.oyunAdi;
            yeni.oyunFiyat = model.oyunFiyat;
            db.Oyun.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Oyun Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/oyunduzenle")]
        public SonucModel OyunDuzenle(OyunModel model)
        {
            Oyun kayit = db.Oyun.Where(s => s.oyunId == model.oyunId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            kayit.oyunKodu = model.oyunKodu;
            kayit.oyunAdi = model.oyunAdi;
            kayit.oyunFiyat = model.oyunFiyat;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Oyun Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/oyunsil/{oyunId}")]
        public SonucModel OyunSil(string oyunId)
        {
            Oyun kayit = db.Oyun.Where(s => s.oyunId == oyunId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            if (db.Kayit.Count(s => s.kayitOyunId == oyunId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Oyuna Kayıtlı Üye Olduğu İçin Oyun Silinemez!";
                return sonuc;
            }


            db.Oyun.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Oyun Silindi";
            return sonuc;
        }
        #endregion

        #region Uyeler

        [HttpGet]
        [Route("api/uyelerliste")]
        public List<UyelerModel> UyelerListe()
        {
            List<UyelerModel> liste = db.Uyeler.Select(x => new UyelerModel()
            {
                uyeId = x.uyeId,
                uyeNo = x.uyeNo,
                uyeAdsoyad = x.uyeAdsoyad,
                uyeDogTarih = x.uyeDogTarih,
                uyeOyunSayisi = x.Kayit.Count()
            }).ToList();
            return liste;
        }


        [HttpGet]
        [Route("api/uyelerbyid/{uyeId}")]
        public UyelerModel UyelerById(string uyeId)
        {
            UyelerModel kayit = db.Uyeler.Where(s => s.uyeId == uyeId).Select(x => new UyelerModel()
            {
                uyeId = x.uyeId,
                uyeNo = x.uyeNo,
                uyeAdsoyad = x.uyeAdsoyad,
                uyeDogTarih = x.uyeDogTarih,
                uyeOyunSayisi = x.Kayit.Count()
            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/uyelerekle")]
        public SonucModel UyelerEkle(UyelerModel model)
        {
            if (db.Uyeler.Count(s => s.uyeNo == model.uyeNo) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Üye Numarası Kayıtlıdır!";
                return sonuc;
            }

            Uyeler yeni = new Uyeler();
            yeni.uyeId = Guid.NewGuid().ToString();
            yeni.uyeNo = model.uyeNo;
            yeni.uyeAdsoyad = model.uyeAdsoyad;
            yeni.uyeDogTarih = model.uyeDogTarih;
            db.Uyeler.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Eklendi";
            return sonuc;
        }


        [HttpPut]
        [Route("api/uyelerduzenle")]
        public SonucModel UyelerDuzenle(UyelerModel model)
        {
            Uyeler kayit = db.Uyeler.Where(s => s.uyeId == model.uyeId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            kayit.uyeNo = model.uyeNo;
            kayit.uyeAdsoyad = model.uyeAdsoyad;
            kayit.uyeDogTarih = model.uyeDogTarih;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/uyelersil/{uyeId}")]
        public SonucModel UyelerSil(string uyeId)
        {
            Uyeler kayit = db.Uyeler.Where(s => s.uyeId == uyeId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            if (db.Kayit.Count(s => s.kayitUyeId == uyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üyenin Üzerinde Oyun Kaydı Olduğu İçin Üye Silinemez!";
                return sonuc;
            }

            db.Uyeler.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Silindi";
            return sonuc;
        }

        

        #endregion

        #region Kayit

        [HttpGet]
        [Route("api/uyeleroyunliste/{uyeId}")]
        public List<KayitModel> UyelerOyunListe(string uyeId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitUyeId == uyeId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitOyunId = x.kayitOyunId,
                kayitUyeId = x.kayitUyeId,

            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.uyeBilgi = UyelerById(kayit.kayitUyeId);
                kayit.oyunBilgi = OyunById(kayit.kayitOyunId);
            }
            return liste;
        }

        [HttpGet]
        [Route("api/oyunuyelerliste/{oyunId}")]
        public List<KayitModel> OyunUyelerListe(string oyunId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitOyunId == oyunId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitOyunId = x.kayitOyunId,
                kayitUyeId = x.kayitUyeId,

            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.uyeBilgi = UyelerById(kayit.kayitUyeId);
                kayit.oyunBilgi = OyunById(kayit.kayitOyunId);
            }
            return liste;
        }

        [HttpPost]
        [Route("api/kayitekle")]
        public SonucModel KayitEkle(KayitModel model)
        {
            if (db.Kayit.Count(s => s.kayitOyunId == model.kayitOyunId && s.kayitUyeId == model.kayitUyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "İlgili Üye Oyune Önceden Kayıtlıdır!";
                return sonuc;
            }

            Kayit yeni = new Kayit();
            yeni.kayitId = Guid.NewGuid().ToString();
            yeni.kayitUyeId = model.kayitUyeId;
            yeni.kayitOyunId = model.kayitOyunId;
            db.Kayit.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Oyun Kaydı Eklendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kayitsil/{kayitId}")]
        public SonucModel KayitSil(string kayitId)
        {
            Kayit kayit = db.Kayit.Where(s => s.kayitId == kayitId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            db.Kayit.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Oyun Kaydı Silindi";
            return sonuc;
        }
        #endregion


    }
}
