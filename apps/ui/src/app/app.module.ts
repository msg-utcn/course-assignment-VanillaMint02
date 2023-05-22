import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TokenInterceptor } from '@course-project/auth';
import { AuthModule, authRoutes } from './auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: 'auth',
        children: authRoutes,
      },
      {
        path: 'questions',
        loadChildren: () =>
          import('@course-project/questions').then(
            (module) => module.QuestionsModule
          ),
      },
    ]),
    AuthModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
