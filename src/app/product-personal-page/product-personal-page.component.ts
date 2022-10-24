import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-personal-page',
  templateUrl: './product-personal-page.component.html',
  styleUrls: ['./product-personal-page.component.css']
})
export class ProductPersonalPageComponent implements OnInit {
  productId!: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.productId = params['id']);
  }

}
