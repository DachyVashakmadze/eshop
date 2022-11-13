import { Component, HostBinding, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemingService } from '../services/theming.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @HostBinding('class') cssThemeClass!: string;

  constructor(private iconRegistry: MatIconRegistry, 
    private sanitizer: DomSanitizer,
    private themingService: ThemingService
    ) { 
    iconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/logo.svg'))

    this.themingService.theme.subscribe(theme => this.cssThemeClass = theme);
  }

  ngOnInit(): void {
  }

}
