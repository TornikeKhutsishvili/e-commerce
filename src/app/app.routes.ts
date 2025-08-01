import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: '',
    loadComponent: () => import('./components/home/home').then((m) => m.Home)
  },
  { path: 'product/:id',
    loadComponent: () => import('./components/products/product-details/product-details').then((m) => m.ProductDetails),
    data: {
      getPrerenderParams: () => {
        return [
          { id: '1' },
          { id: '2' },
          { id: '3' },
          { id: '4' },
          { id: '5' },
          { id: '6' },
          { id: '7' },
          { id: '8' },
          { id: '9' },
          { id: '10' },
          { id: '11' },
          { id: '12' },
          { id: '13' },
          { id: '14' },
          { id: '15' },
          { id: '16' },
          { id: '17' },
          { id: '18' },
          { id: '19' },
          { id: '20' },
          { id: '21' },
          { id: '22' },
          { id: '23' },
          { id: '24' },
          { id: '25' },
          { id: '26' },
          { id: '27' },
          { id: '28' },
          { id: '29' },
          { id: '30' }
        ];
      }
    }
  },
  { path: 'cart',
    loadComponent: () => import('./components/cart/cart').then((m) => m.Cart)
  },
  { path: 'checkout',
    loadComponent: () => import('./components/checkout/checkout').then((m) => m.Checkout)
  },
  { path: '**', redirectTo: '' }

];