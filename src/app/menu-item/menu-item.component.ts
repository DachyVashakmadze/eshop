import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';
import { Category } from '../category/category.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input() items!: Category[];
  @ViewChild('childMenu') public childMenu!: MatMenuPanel;

  constructor() { }

  ngOnInit(): void {
  }

}
