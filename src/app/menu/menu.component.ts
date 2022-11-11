import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatMenuTrigger } from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';
import { Category } from '../category/category.model';
import { BaseCategoryService } from '../services/base-categoryservice';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  categories!: Category[];

  constructor(
    private categoryService: BaseCategoryService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/logo.svg'))
  }

  ngOnInit(): void {
    this.categoryService.getCategoriesNested().subscribe(cat => {
      this.categories = cat;
      console.log(this.categories);
    });
  }

}
