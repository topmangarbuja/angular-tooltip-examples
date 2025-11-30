import {Component, signal} from '@angular/core';
import {TooltipDirective} from './tooltip/tooltip.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    TooltipDirective
  ],
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Basic custom tooltip example using angular cdk');
}
