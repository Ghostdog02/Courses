import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './angular-material.module';
import { PostsModule } from './posts/posts.module'; 

import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { App } from './app';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error/error.component';

import { authInterceptor } from './auth/auth-interceptor';
import { errorInterceptor } from './error-interceptor';

@NgModule({
  declarations: [
    App,
    HeaderComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AngularMaterialModule,
    PostsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
  ],
  bootstrap: [App],
})
export class AppModule {}
