import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeableComponent } from '../common/theamable.component';
import { ThemingService } from '../services/theming.service';
import { Category } from '../category/category.model';
import { BaseCategoryService } from '../services/base-categoryservice';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends ThemeableComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter();
  
  breakpointObserverDestroyed = new Subject<void>();
  isMobile = false;

  isDarkMode!: boolean;
  categories!: Category[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private categoryService: BaseCategoryService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    protected override themingService: ThemingService
  ) {
    iconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/logo.svg'))
    super(themingService);
  }

  ngOnDestroy(): void {
    this.breakpointObserverDestroyed.next();
    this.breakpointObserverDestroyed.complete();
  }
  ngOnInit(): void {
    this.categoryService.getCategoriesNested().subscribe(cat => {
      this.categories = cat;
    });

    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
      ])
      .pipe(takeUntil(this.breakpointObserverDestroyed))
      .subscribe(result => {
        console.log("INSIDE OBSERVER");
        console.log(result);
        this.isMobile = result.matches;
        // for (const query of Object.keys(result.breakpoints)) {
        //   if (result.breakpoints[query]) {
        //     this.isMobile = true;
        //     return;
        //   }
        // }
        // this.isMobile = false;
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

  toggleSidenav() {
    this.sidenavToggle.emit();
  }

  protected override applyTheme(theme: string): void {
    this.cssThemeClass = theme;
    this.isDarkMode = (theme === 'dark-theme');
  }
}
