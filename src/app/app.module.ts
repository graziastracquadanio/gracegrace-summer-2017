import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';
import { NgModule } from '@angular/core';

import { FIREBASE_CONFIG } from './app.config';

import { ColorService, MenuService } from './services';

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
import { BlogComponent } from './components/blog/blog.component';

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
    BlogComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(FIREBASE_CONFIG, 'gracegrace'),
    AngularFireDatabaseModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    InlineSVGModule,
    MarkdownToHtmlModule.forRoot(),
  ],
  providers: [ColorService, MenuService],
  bootstrap: [AppComponent],
})
export class AppModule {}
