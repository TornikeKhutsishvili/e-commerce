import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/ProductService';
import { CartService } from '../../../services/CartService';

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

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private router = inject(Router);
  private cartService = inject(CartService);

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
