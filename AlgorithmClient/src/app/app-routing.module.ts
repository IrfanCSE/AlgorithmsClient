import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TextComponent } from './components/text/text.component';

const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'text',component: TextComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
