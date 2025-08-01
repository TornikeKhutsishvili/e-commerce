import { CommonModule } from '@angular/common';
import { Component, inject, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/CartService';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss']
})
export class Checkout {

  paymentMethod = signal<string>('Cash on Delivery');
  cartItems = signal<any[]>([]);
  totalPrice = signal<number>(0);

  private cartService = inject(CartService);

  user: {
    name: Signal<string>;
    email: Signal<string>;
    address: Signal<string>;
    paymentMethod: Signal<string>;
  } = {
    name: signal(''),
    email: signal(''),
    address: signal(''),
    paymentMethod: signal('Credit Card')
  };


  // Form fields
  cardNumber = signal<string>('');
  expiryDate = signal<string>('');
  cvv = signal<string>('');
  paypalEmail = signal<string>('');

  constructor() {}

  ngOnInit(): void {
    this.cartItems.set(this.cartService.getCartItems() || []);
    // console.log(this.cartItems);
    this.calculateTotalPrice();


    // Handle the checkout form submission here
    // console.log('Order submitted with payment method:', this.paymentMethod);
    // console.log('Card Number:', this.cardNumber);
    // console.log('Expiry Date:', this.expiryDate);
    // console.log('CVV:', this.cvv);
    // console.log('PayPal Email:', this.paypalEmail);
  }

  // Complete the checkout process
  completeCheckout(): void {
    // Here you can add the payment system or other checkout logic
    alert('Checkout Completed!');
    // Empty the cart
    this.cartService.clearCart();
    alert(`Checkout completed for ${this.user.name}`);
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems().reduce((acc, item) => {
      return acc + (item?.price * item?.quantity || 0);
    }, 0);
  }

  // Handle payment method selection change
  onPaymentMethodChange(): void {
    // Additional logic for handling form submission, if needed.
    console.log('Selected Payment Method:', this.paymentMethod);
  }

  // Form submission handler
  onSubmit(): void {
    // Handle the checkout form submission here
    console.log('Order submitted with payment method:', this.paymentMethod);
  }

  // Format the card number as the user types
  formatCardNumber(): void {
    // Remove all non-digit characters
    let formattedCardNumber = this.cardNumber().replace(/\D/g, '');

    // Split the digits into groups of 4 and join with '-'
    if (formattedCardNumber.length > 4) {
      formattedCardNumber = formattedCardNumber.replace(/(\d{4})(?=\d)/g, '$1-');
    }

    // Update the cardNumber with formatted value
    this.cardNumber.set(formattedCardNumber);
  }

}
