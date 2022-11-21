import { Component, HostBinding, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeableComponent } from '../common/theamable.component';
import { ThemingService } from '../services/theming.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends ThemeableComponent implements OnInit {
  isDarkMode: boolean = false;

  constructor(private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    protected override themingService: ThemingService
  ) {
    iconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/logo.svg'))
    super(themingService);
  }

  ngOnInit(): void {
  }

  toggleMode() {
    this.themingService.toggleMode();
  }

  toggleMenu(event: MouseEvent) {
    const el = event.target as Element;
    el.classList.toggle('active');
  }

  protected override applyTheme(theme: string): void {
    this.cssThemeClass = theme;

    this.isDarkMode = theme === 'dark-theme';
  }
}
