import { Component, Input } from '@angular/core';
import { ThemeableComponent } from 'src/app/common/theamable.component';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent extends ThemeableComponent {
  @Input() text: string = '';
}
