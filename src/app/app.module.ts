import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';
import { NgModule } from '@angular/core';

import { FIREBASE_CONFIG } from './app.config';

import { AuthService, ColorService, MenuService } from './services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { IntroComponent } from './components/intro/intro.component';
import { TrianglifyDirective } from './directives/trianglify.directive';
import { MenuComponent } from './components/menu/menu.component';
import { TypewritingDirective } from './directives/typewriting.directive';
import { StuffComponent } from './components/stuff/stuff.component';
import { ReadingsComponent } from './components/readings/readings.component';
import { ContentComponent } from './components/content/content.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { ListComponent } from './components/blog/list/list.component';
import { PostComponent } from './components/blog/post/post.component';
import { PostEditComponent } from './components/blog/post-edit/post-edit.component';
import { LoginComponent } from './components/blog/login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        IntroComponent,
        TrianglifyDirective,
        MenuComponent,
        TypewritingDirective,
        StuffComponent,
        ReadingsComponent,
        ContentComponent,
        SettingsComponent,
        CurriculumComponent,
        ListComponent,
        PostComponent,
        PostEditComponent,
        LoginComponent,
    ],
    imports: [
        AngularFireModule.initializeApp(FIREBASE_CONFIG, 'gracegrace'),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        InlineSVGModule,
        MarkdownToHtmlModule.forRoot(),
    ],
    providers: [AuthGuard, AuthService, ColorService, MenuService],
    bootstrap: [AppComponent],
})
export class AppModule {}
