import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { AboutComponent } from './components/about/about.component';
import { IntroComponent } from './components/intro/intro.component';

const routes: Routes = [
  {
    path: 'home',
    component: IntroComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '',
    component: IntroComponent
  },
  {
    path: '**',
    component: IntroComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
