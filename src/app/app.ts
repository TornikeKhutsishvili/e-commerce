import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Navigation } from './components/navigation/navigation';
import { Search } from './services/search';
import { Filter } from './services/filter';
import { Product } from './services/product';

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

items: any[] = [];
  filteredItems: any[] = [];
  priceFilter: number = 0; // Price filter
  filteredProducts: any[] = []; // Filtered products
  allProducts: any[] = []; // All product

  constructor(
    private filterService: Filter,
    private searchService: Search,
    private productService: Product
  ){}


  ngOnInit() {
    this.productService.getProducts().subscribe((data:any) => {
      this.items = data;
      this.filteredItems = data;
      this.allProducts = data;
      this.filteredProducts = [...this.allProducts]; // Initial value
    });
    this.filterService.filteredProducts$.subscribe((products) => {
      this.filteredProducts = products;
      // console.log('Filtered Products:', products); // Log to check the products
    });
  }

  onSearch(event: any) {
    const query = event.target.value;
    this.filteredItems = this.searchService.search(query, this.items);
    this.applyFilters(); // Apply filters
  }

  onFilterChange(event: any) {
    this.priceFilter = event.target.value;
    this.applyFilters(); // Apply filters by price
  }

  applyFilters() {
    let filtered = this.items;

    // Use price filter
    if (this.priceFilter > 0) {
      filtered = this.filterService.filterByPrice(filtered, this.priceFilter);
    }

    /// Filter by search keyword
    this.filteredItems = filtered;
  }



  applyFilter(filteredProducts: any[]) {
    // console.log("AppComponent received filtered products:", filteredProducts);
    this.filteredProducts = filteredProducts;
    this.filterService.setFilteredProducts(filteredProducts); // Save data in the service
  }
}
