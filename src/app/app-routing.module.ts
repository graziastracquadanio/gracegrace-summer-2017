import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { AboutComponent } from './components/about/about.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { IntroComponent } from './components/intro/intro.component';
import { LoginComponent } from './components/blog/login/login.component';
import { ManagerComponent } from './components/blog/manager/manager.component';
import { PostEditorComponent } from './components/blog/post-editor/post-editor.component';
import { StuffComponent } from './components/stuff/stuff.component';

const routes: Routes = [
  {
    path: 'home',
    component: IntroComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'cv',
    component: CurriculumComponent,
  },
  {
    path: 'stuff',
    component: StuffComponent,
  },
  // blog
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'post-add',
    component: PostEditorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'post-edit/:id',
    component: PostEditorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
