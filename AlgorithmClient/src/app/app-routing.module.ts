import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ImageComponent } from './components/image/image.component';
import { TextComponent } from './components/text/text.component';

const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'text',component: TextComponent},
  {path: 'image',component: ImageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
