import { Component, OnInit } from '@angular/core';
import { ThemeableComponent } from '../common/theamable.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends ThemeableComponent implements OnInit {

  ngOnInit(): void {
  }

}
