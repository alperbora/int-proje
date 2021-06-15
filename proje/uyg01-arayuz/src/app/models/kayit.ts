import { Oyun } from './Oyun';
import { Uyeler } from 'src/app/models/Uyeler';
export class Kayit {
    kayitId: string;
    kayitOyunId: string;
    kayitUyeId: string;
    uyeBilgi: Uyeler;
    oyunBilgi: Oyun;
}