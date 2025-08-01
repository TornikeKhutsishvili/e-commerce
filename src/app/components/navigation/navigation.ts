import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, Renderer2, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { Toggle } from '../../services/toggle';
import { Search } from '../../services/search';
import { ProductService } from '../../services/ProductService';
import { Filter } from '../../services/filter';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterLink,
  ],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.scss']
})
export class Navigation {

  @Output() filterApplied = new EventEmitter<any[]>();
  products = signal<any[]>([]);

  private productService = inject(ProductService);
  private filterService = inject(Filter);
  private searchService = inject(Search);
  private themeService = inject(Toggle);
  private renderer = inject(Renderer2);

  isDarkMode = signal<boolean>(false);
  isMenuOpen = signal<boolean>(false);

  isblack = signal<string>('');
  islight = signal<string>('');

  sun = '☀';
  moon = '🌙';

  constructor(
  ) {
    this.isDarkMode.set(this.themeService.getSavedTheme() === 'dark');

    this.isblack.set('#343a40');
    this.islight.set('#f8f9fa');
  }

  ngOnInit(): void {
    this.updateNavbarTheme();

    this.productService.getProducts().subscribe((data) => {
      this.products.set(data);
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode.set(this.themeService.getSavedTheme() === 'dark');
    this.updateNavbarTheme();
  }

  updateNavbarTheme(): void {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      this.renderer.removeClass(navbar, 'navbar-light');
      this.renderer.removeClass(navbar, 'navbar-dark');

      if (this.isDarkMode()) {
        this.renderer.addClass(navbar, 'navbar-dark');
      } else {
        this.renderer.addClass(navbar, 'navbar-light');
      }
    }
  }

  // menu open-close
  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen);
  }

  // search
  onSearch(event: any) {
    const query = event.target.value.trim();
    this.searchService.updateSearchQuery(query);
  }

  // filter
  filterByPrice(event: any, products: any[]) {
    const value = event.target.value;

    if (!products || products.length === 0) return;

    let sortedProducts = [...products];

    if (value === 'low') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === 'high') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    // console.log('Sorted Products:', sortedProducts);
    this.filterService.setFilteredProducts(sortedProducts);
  }
}
