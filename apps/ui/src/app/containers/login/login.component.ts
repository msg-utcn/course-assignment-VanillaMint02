import { ChangeDetectionStrategy, Component, DoCheck } from '@angular/core';
import { AuthenticateModel } from '@course-project/data-models';
import { LoginService } from '@course-project/auth';

@Component({
  selector: 'course-project-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements DoCheck {
  constructor(private loginService: LoginService) {}

  public login(authenticate: AuthenticateModel): void {
    this.loginService.login(authenticate).subscribe((token) => {
      localStorage.setItem('access_token', token.access_token);
    });
  }

  ngDoCheck() {
    console.log('login check!');
  }
}
