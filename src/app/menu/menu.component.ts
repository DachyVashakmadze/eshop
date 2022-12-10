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
      .subscribe(result => this.isMobile = result.matches);
  }

  ngAfterViewInit() {
    document.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isDropdownButton = target.matches('[data-dropdown-button]');
      if (!isDropdownButton && target.closest('[data-dropdown]') != null) {
        document.querySelector('body')?.classList.remove('no-scroll');
      }

      let currentDropdown: HTMLElement|null;
      if (isDropdownButton) {
        currentDropdown = target.closest('[data-dropdown]');
        currentDropdown?.classList.toggle('active');
      }

      let activeDropdowns = document.querySelectorAll('[data-dropdown].active');

      activeDropdowns.forEach(dropdown => {
        if(dropdown === currentDropdown) {
            return;
        }

        dropdown.classList.remove('active');
      })


      activeDropdowns = document.querySelectorAll('[data-dropdown].active');
      console.log(activeDropdowns);
      if(activeDropdowns.length > 0) {
        document.querySelector('body')?.classList.add('no-scroll');
      } else {
        document.querySelector('body')?.classList.remove('no-scroll');
      }

    });
  }

  closeMenu(event: Event, rootMenuItem = false) {
    const el = event.target as Element;
    const dropdown = el.closest('[data-dropdown]') as HTMLDivElement;
    dropdown.classList.remove('active');
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
