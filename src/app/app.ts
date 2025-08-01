import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Navigation } from './components/navigation/navigation';
import { Search } from './services/search';
import { Filter } from './services/filter';
import { ProductService } from './services/ProductService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    FormsModule,
    CommonModule,
    Navigation,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {

  protected title = 'E-commerce';

  items: WritableSignal<any[]> = signal([]);
  filteredItems = signal<any[]>([]);
  priceFilter = signal<number>(0); // Price filter
  filteredProducts = signal<any[]>([]); // Filtered products
  allProducts = signal<any[]>([]); // All product

  private filterService = inject(Filter);
  private searchService = inject(Search);
  private productService = inject(ProductService);

  constructor(){}

  ngOnInit() {
    this.productService.getProducts().subscribe((data:any) => {
      this.items.set(data);
      this.filteredItems.set(data);
      this.allProducts.set(data);
      this.filteredProducts.set([...this.allProducts()]); // Initial value
    });
    this.filterService.filteredProducts$.subscribe((products) => {
      this.filteredProducts.set(products);
      // console.log('Filtered Products:', products); // Log to check the products
    });
  }

  onSearch(event: any) {
    const query = event.target.value;
    this.filteredItems.set(this.searchService.search(query, this.items()));
    this.applyFilters(); // Apply filters
  }

  onFilterChange(event: any) {
    this.priceFilter = event.target.value;
    this.applyFilters(); // Apply filters by price
  }

  applyFilters() {
    let filtered = this.items();

    // Use price filter
    if (this.priceFilter() > 0) {
      filtered = this.filterService.filterByPrice(filtered, this.priceFilter());
    }

    /// Filter by search keyword
    this.filteredItems.set(filtered);
  }



  applyFilter(filteredProducts: any[]) {
    // console.log("AppComponent received filtered products:", filteredProducts);
    this.filteredProducts.set(filteredProducts);
    this.filterService.setFilteredProducts(filteredProducts); // Save data in the service
  }


}
