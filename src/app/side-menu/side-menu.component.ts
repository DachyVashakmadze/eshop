import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from '../category/category.model';
import { ThemeableComponent } from '../common/theamable.component';
import { CategoryService } from '../services/category.service';
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
    private categoryService: CategoryService,
    protected override themingService: ThemingService
  ) {
    super(themingService);
  }

  ngOnInit(): void {
    this.categoryService.categories.subscribe(cats => this.categories = cats);
  }

  getCategoryURL(id: number) {
    return `category/${id}`;
  }


  toggleSidenav() {
    this.sidenavToggle.emit();
  }
}
