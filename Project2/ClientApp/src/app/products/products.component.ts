import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class FetchProductComponent {
  public products: Product[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Product[]>('https://localhost:7215/api/products').subscribe(result => {
      this.products = result;
    }, error => console.error(error));
  }
}

interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number
  category: string
}
