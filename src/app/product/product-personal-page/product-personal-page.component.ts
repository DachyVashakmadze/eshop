import { Component, HostBinding, OnInit } from '@angular/core';
import { BaseProductService } from '../../services/base-product.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Product } from '../products.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { ThemingService } from 'src/app/services/theming.service';
import { ThemeableComponent } from 'src/app/common/theamable.component';
import { BreadcumbService } from 'src/app/services/breadcumb.service';
import { Breadcrumb } from 'src/app/breadcrumb/breadcrumb.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-personal-page',
  templateUrl: './product-personal-page.component.html',
  styleUrls: ['./product-personal-page.component.scss']
})
export class ProductPersonalPageComponent extends ThemeableComponent implements OnInit {
  panelOpenState = false;
  product!: Product;
  constructor(
    private service: BaseProductService,
    private breadcrumbService: BreadcumbService,
    private categoryService: CategoryService,
    private responseive: BreakpointObserver,
    private route: ActivatedRoute,
    private router: Router,
    protected override themingService: ThemingService
  ) {
    super(themingService);
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params["id"]
      this.service.getProductById(id).subscribe(p => {
        if (!p) {
          this.router.navigate(["urlNotFound"], { skipLocationChange: true })
        } else {
          this.product = p;
          // ბრედკრამბის მიბმა
          // აქ არის ბრედკრამბის ობიექტების მასივი კატეგორიის ჩათვლით.
          this.categoryService.getBreadcrumbItemsForCategory(p.categoryId).subscribe(breadcrumbItems => {
            /* აქ ვქმნით ბრედკრამბის item-ს, რომელიც უშუალოდ პროდუქტს შეესაბამება. 
             url-ს აქ ცარიელს ვტოვებთ, შეგვეძლო 'product/' + p.id დაგვეწერა, მაგრამ ლინკი მაინც იქნება disabled 
             და შესაბამისად ზედმეტი შრომა იქნება, თან მერე რეფაქტორის გაკეთებაც მოგვიწევდა, 'product' hardcoded რომ არ იყოს
            */
            let productPreadcrumb: Breadcrumb = {
              title: p.title,
              url: ''
            };

            // კატეგორიების ბრედკრამბს უნდა მივამატოთ პროდუქტის ბრედკრამბი
            breadcrumbItems = [...breadcrumbItems, productPreadcrumb];

            // საბოლოოდ ვიძახებთ breadcrumbService-ის setItems() მეთოდს, რომელიც მოახდენს breadcrumb-ის ცვლილებას
            this.breadcrumbService.setItems(breadcrumbItems);
          });
        }
      });
    })
  }

  getGoogleSearchURL(value: string): string {
    return "https://www.google.com/search?q=" + value;
  }
}
