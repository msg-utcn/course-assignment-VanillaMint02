import { ChangeDetectionStrategy, Component, DoCheck } from '@angular/core';
import { RegisterModel } from '../../data-models/register.model';
import { AuthService } from '../../services/auth.service';
import { AuthenticateModel } from '../../data-models/authenticate.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'course-project-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements DoCheck {
  constructor(private authService: AuthService) {}
  public register(register: RegisterModel) {
    this.authService.register(register).subscribe();
  }

  ngDoCheck() {
    console.log('Register checked');
  }
}
