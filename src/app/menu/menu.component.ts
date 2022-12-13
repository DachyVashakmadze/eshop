import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, LOCALE_ID, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeableComponent } from '../common/theamable.component';
import { ThemingService } from '../services/theming.service';
import { Category } from '../category/category.model';
import { BaseCategoryService } from '../services/base-categoryservice';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { startWith, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends ThemeableComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter();

  breakpointObserverDestroyed = new Subject<void>();
  isMobile = false;
  flagIconClass = '';
  flagMap = new Map<string, string>()
    .set("ka", 'fi-ge')
    .set("en", "fi-gb");

  isDarkMode!: boolean;
  categories!: Category[];

  logoUrl = 'assets/images/logo.svg';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private categoryService: BaseCategoryService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    protected override themingService: ThemingService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    iconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/logo.svg'))
    super(themingService);
  }

  ngOnDestroy(): void {
    this.breakpointObserverDestroyed.next();
    this.breakpointObserverDestroyed.complete();
  }
  ngOnInit(): void {
    this.categoryService.getCategoriesNested().subscribe((cat: Category[]) => {
      console.log('cats received in menu');
      this.categories = cat;
    });

    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
      ])
      .pipe(takeUntil(this.breakpointObserverDestroyed))
      .subscribe((result: { matches: boolean; }) => this.isMobile = result.matches);

      this.flagIconClass = this.flagMap.has(this.locale) ? (this.flagMap.get(this.locale) as string) : '';
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

  changeLanguage(event: MouseEvent, lang: string) {
    event.preventDefault();
    const newUrl = window.location.href.replace(/\/..\//, `/${lang}/`);
    window.location.href = newUrl;
  }

  protected override applyTheme(theme: string): void {
    this.cssThemeClass = theme;
    this.isDarkMode = (theme === 'dark-theme');
  }
}
