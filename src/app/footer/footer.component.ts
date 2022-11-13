import { Component, HostBinding, OnInit } from '@angular/core';
import { ThemingService } from '../services/theming.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @HostBinding('class') cssThemeClass!: string;

  constructor(private themingService: ThemingService) {
    this.themingService.theme.subscribe(theme => this.cssThemeClass = theme);
   }

  ngOnInit(): void {
  }

}
