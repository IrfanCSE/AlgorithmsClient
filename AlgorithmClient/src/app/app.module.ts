import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TextComponent } from './components/text/text.component';
import { ImageComponent } from './components/image/image.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, TextComponent, ImageComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
