import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./../app.component.scss']
})
export class NavbarComponent {
  items: MegaMenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Category',
        icon: 'pi pi-fw pi-users',
        routerLink: '/category'
      },
      {
        label: 'Product',
        icon: 'pi pi-shopping-cart',
        routerLink: '/product'
      }
    ];
  }
}
