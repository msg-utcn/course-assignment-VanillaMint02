import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'course-project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements DoCheck {
  title = 'ui';

  print() {
    console.log('in app print');
  }

  ngDoCheck() {
    console.log('app check!');
  }
}
