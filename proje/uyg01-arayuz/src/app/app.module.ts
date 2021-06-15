import { UyesecDialogComponent } from './components/dialogs/uyesec-dialog/uyesec-dialog.component';
import { UyelisteleComponent } from './components/uyelistele/uyelistele.component';
import { OyunDialogComponent } from './components/dialogs/oyun-dialog/oyun-dialog.component';

import { OyunlisteleComponent } from './components/oyunlistele/oyunlistele.component';
import { UyelerDialogComponent } from './components/dialogs/uyeler-dialog/uyeler-dialog.component';
import { OyunComponent } from './components/oyun/oyun.component';
import { UyelerComponent } from './components/uyeler/uyeler.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    UyelerComponent,
    OyunComponent,
    OyunlisteleComponent,
    UyelisteleComponent,

    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyelerDialogComponent,
    
    OyunDialogComponent,
    UyesecDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyelerDialogComponent,
    
    OyunDialogComponent,
    UyesecDialogComponent
  ],
  providers: [MyAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
