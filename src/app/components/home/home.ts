import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from '../../services/product';
import { Filter } from '../../services/filter';
import { Cart } from '../../services/cart';
import { Search } from '../../services/search';
import { RouterLink } from '@angular/router';
import { Carusel } from '../carusel/carusel';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NgxPaginationModule,
    Carusel,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {

  filteredProducts = signal<any[]>([]);
  products = signal<any[]>([]);
  protected filterSubscription: Subscription | null = null; // check error
  protected productService = inject(Product);
  protected filterService = inject(Filter);
  protected cartService = inject(Cart);
  protected searchService = inject(Search);

  cartItemCount = signal<number>(0);
  page = signal<number>(1);
  itemsPerPage = signal<number>(6);
  caruselProducts = signal<Product[]>([]);

  constructor() {}

  ngOnInit() {

    // filtered products
    this.productService.getProducts().subscribe((data) => {
      this.products.set(data);
      // console.log('HomeComponent received all products:', this.products);

      // Check if there are already filtered products in the service
      this.filteredProducts.set(this.filterService.getFilteredProducts());
      // console.log('HomeComponent received filtered products:', this.filteredProducts);

      // If no filtered products, set all products to filtered
      if (!this.filteredProducts.length) {
        this.filteredProducts.set([...this.products()]);
      }

      // Subscribe to filtered products updates from the service
      this.filterSubscription = this.filterService.filteredProducts$.subscribe((filtered) => {
        this.filteredProducts.set(filtered);
        // console.log('Filtered products updated:', this.filteredProducts);
      });
    });



    // search
    this.searchService.searchQuery$.subscribe(query => {
      this.filteredProducts.set(this.products().filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()))
      );
    });


    // carusel
    this.productService.getProductCarusel()
      .subscribe((data) => {
        this.caruselProducts.set(data);
    });
  }



  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

  // Example of how to apply a filter or change data
  applyPriceFilter(price: number) {
    const filtered = this.filterService.filterByPrice(this.products(), price);
    this.filterService.setFilteredProducts(filtered);  // Set filtered products in the service
  }


  // cart
  addToCart(product: any): void {
    this.cartService.addToCart(product); // add product in cart
    this.cartItemCount.set(this.cartService.getCartItems().length);
  }

}
