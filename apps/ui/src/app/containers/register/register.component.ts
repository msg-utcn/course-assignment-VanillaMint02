import { ChangeDetectionStrategy, Component, DoCheck } from '@angular/core';
import { RegisterModel } from '@course-project/data-models';
import { RegisterService } from '@course-project/auth';

@Component({
  selector: 'course-project-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements DoCheck {
  constructor(private authService: RegisterService) {}
  public register(register: RegisterModel) {
    this.authService.register(register).subscribe();
  }

  ngDoCheck() {
    console.log('Register checked');
  }
}
