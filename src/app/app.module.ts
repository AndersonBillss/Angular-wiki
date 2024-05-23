import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './navbar/search-box/search-box.component';
import { StandardButtonComponent } from './standard-button/standard-button.component';
import { PageComponent } from './page/page.component';
import { HeaderComponent } from './page/elements/header/header.component';
import { ParagraphComponent } from './page/elements/paragraph/paragraph.component';
import { ContentEditableDirective } from './directives/ContentEditableDirective';
import { RouterModule } from '@angular/router';
import { EditToolbarComponent } from './edit-toolbar/edit-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SearchBoxComponent,
    StandardButtonComponent,
    PageComponent,
    HeaderComponent,
    ParagraphComponent,
    ContentEditableDirective,
    EditToolbarComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
