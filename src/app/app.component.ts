import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { BaseProductService } from './services/base-product.service';
import { ThemingService } from './services/theming.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eshop';
  // ამის საშუალებით შესაძლებელია მარტივად app-root HTML ელემენტს მივანიჭოთ კონკრეტული კლასი
  @HostBinding('class') cssThemeClass!: string;

  constructor(public service: BaseProductService, public themingService: ThemingService) { }

  ngOnInit(): void {
    /* აქ ხდება დაკვირვება აპლიკაციის როგორც მიმდინარე თემაზე, ასევე ამ თემის ცვლილებაზე.
     this.themingService.theme არის subject, რაც იმას ნიშნავს, რომ როდესაც .subscribe-ს გამოვიძახებთ,
     აუცილებლად მივიღებთ პირველ რიგში აქტიურ თემას. და თუ ეს აქტიური თემა შეიცვალა, მაგ ცვლილებასაც გავიგებთ.
     აქტიური თემის ცვლილებას ThemingService აფიქსირებს და ყველა დამკვირვებელს - Observer-ს აგებინებს ამის შესახებ
     */
    this.themingService.theme.subscribe(theme => this.cssThemeClass = theme);

    // Todo remove: this code is just to demonstrate that service is working
    this.service.getProductList().subscribe(productList => console.log(productList));
    this.service.getProductById(2).subscribe(product => console.log(product));
  }
}
