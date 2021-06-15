import { UyelisteleComponent } from './components/uyelistele/uyelistele.component';
import { OyunlisteleComponent } from './components/oyunlistele/oyunlistele.component';
import { OyunComponent } from './components/oyun/oyun.component';
import { UyelerComponent } from './components/uyeler/uyeler.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'uyeler',
    component: UyelerComponent
  },
  {
    path: 'oyun',
    component: OyunComponent
  },
  {
    path: 'oyunlistele/:uyeId',
    component: OyunlisteleComponent
  },
  {
    path: 'uyelistele/:oyunId',
    component: UyelisteleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
