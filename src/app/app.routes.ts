import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: '',
    loadComponent: () => import('./components/home/home').then((m) => m.Home)
  },
  { path: 'product/:id',
    loadComponent: () => import('./components/products/product-details/product-details').then((m) => m.ProductDetails)
  },
  { path: 'cart',
    loadComponent: () => import('./components/cart/cart').then((m) => m.Cart)
  },
  { path: 'checkout',
    loadComponent: () => import('./components/checkout/checkout').then((m) => m.Checkout)
  },
  { path: '**', redirectTo: '' }

];