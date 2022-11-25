import { Component, ElementRef, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeableComponent } from '../common/theamable.component';
import { ThemingService } from '../services/theming.service';
import { Category } from '../category/category.model';
import { BaseCategoryService } from '../services/base-categoryservice';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends ThemeableComponent implements OnInit {
  isDarkMode!: boolean;
  categories!: Category[];

  constructor(
    private categoryService: BaseCategoryService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    protected override themingService: ThemingService
  ) {
    iconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/logo.svg'))
    super(themingService);
  }

  ngOnInit(): void {
    this.categoryService.getCategoriesNested().subscribe(cat => {
      this.categories = cat;
    });
  }

  closeMenu(event: Event, rootMenuItem = false) {
    const el = event.target as Element;

    let menuEl: HTMLDivElement | null | undefined;
    if (rootMenuItem) {
      menuEl = el.parentElement?.parentElement?.querySelector('.megaMenu');
    } else {
      menuEl = el.closest('.megaMenu') as HTMLDivElement;
    }

    if (menuEl) {
      menuEl.style.display = 'none';
      setTimeout(() => {
        if (menuEl) {
          menuEl.style.display = 'flex';
        }
      }, 0);
    }
  }

  getCategoryURL(id: number) {
    return `category/${id}`;
  }

  toggleMode() {
    this.themingService.toggleMode();
  }

  protected override applyTheme(theme: string): void {
    this.cssThemeClass = theme;
    this.isDarkMode = (theme === 'dark-theme');
  }
}
