import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AsideComponent } from './components/aside/aside.component';
import { ContainerComponent } from './components/container/container.component';
import { Error404Component } from './components/error404/error404.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaginateComponent } from './components/paginate/paginate.component';
import { EntityComponent } from './components/forms/entity/entity.component';
import {HttpClientModule} from '@angular/common/http';
import { FormatNamePipe } from './pipes/format-name.pipe';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { FormsModule} from '@angular/forms';
import { FormatTagPipe } from './pipes/format-tag.pipe';
import { FormatValuePipe } from './pipes/format-value.pipe';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideComponent,
    ContainerComponent,
    Error404Component,
    LoadingComponent,
    ModalComponent,
    PaginateComponent,
    EntityComponent,
    FormatNamePipe,
    SearchFormComponent,
    FormatTagPipe,
    FormatValuePipe,
    ImagePreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
