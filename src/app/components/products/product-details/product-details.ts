import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../services/product';
import { Cart } from '../../../services/cart';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss']
})
export class ProductDetails {

  product = signal<any>('');

  protected route = inject(ActivatedRoute);
  protected productService = inject(Product);
  protected router = inject(Router);
  protected cartService = inject(Cart);

  constructor() {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((data) => {
        this.product = data;
      });
    }
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    alert('Product added to cart! 🛒');
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
