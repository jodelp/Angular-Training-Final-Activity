import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-training-final-activity';

  public constructor(private _serviceTitle: Title) {}

  public setTitle(newTitle: string) {
    this._serviceTitle.getTitle();
  }
}
