import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductModel } from '../../models/product-model';

@Component({
  selector: 'app-carusel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './carusel.html',
  styleUrls: ['./carusel.scss']
})
export class Carusel {

  @Input() products: ProductModel[] = [];
  currentIndex = signal(0);

  constructor() {}

  nextSlide() {
    this.currentIndex.set((this.currentIndex() + 1) % this.products.length);
  }

  prevSlide() {
    this.currentIndex.set(
      (this.currentIndex() - 1 + this.products.length) % this.products.length
    );
  }

  currentProduct: Signal<ProductModel | null> = computed(() =>
    this.products.length > 0 ? this.products[this.currentIndex()] : null
  );

  ngOnInit() {
    // console.log(this.products);
  }

}