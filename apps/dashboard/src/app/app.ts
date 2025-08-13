import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedUiModule } from './shared-ui.module';

@Component({
  imports: [RouterModule, SharedUiModule],
  selector: 'ng-mf-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {
  protected title = 'dashboard';
}
