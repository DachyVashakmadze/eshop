import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from '../category/category.model';
import { ThemeableComponent } from '../common/theamable.component';
import { BaseCategoryService } from '../services/base-categoryservice';
import { ThemingService } from '../services/theming.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent extends ThemeableComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter();
  categories!: Category[];

  constructor(
    private categoryService: BaseCategoryService,
    protected override themingService: ThemingService
  ) {
    super(themingService);
  }

  ngOnInit(): void {
    this.categoryService.getCategoriesNested().subscribe(cats => this.categories = cats);
  }

  getCategoryURL(id: number) {
    return `category/${id}`;
  }


  toggleSidenav() {
    this.sidenavToggle.emit();
  }
}
