import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthenticationModule, authRoutes } from './authentication.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './containers/register/register.component';
import { RegisterFormComponent } from './presentational/register-form/register-form.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    RouterModule.forRoot([
      {
        path: 'auth',
        children: authRoutes,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
