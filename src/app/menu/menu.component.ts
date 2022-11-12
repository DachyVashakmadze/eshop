import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/logo.svg'))
  }

  ngOnInit(): void {
  }

}
