import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(private myServer: ProductService) {}
  category = 'Phone';
  categoryArray: any[];
  cartArray: any[];
  resultTotal: number = 0;
  cartLength: number = 0;
  ngOnInit(): void {
    this.getProductList();
    this.getCart();
  }

  ChangeCategory(cat: any): void {
    this.category = cat;
    this.getProductList();
  }
  getProductList(): void {
    this.myServer.getAllProduct().subscribe((res) => {
      console.log(res.products);
      this.categoryArray = res.products;
    });
  }
  addToCart(product: any) {
    const prodInCart = this.cartArray.find(
      (productCart) => product._id == productCart.productID
    );
    if (!prodInCart) {
      this.myServer.createProductCart(product._id).subscribe((res) => {
        console.log(res);
        this.getCart();
      });
    } else {
      this.myServer.patchProduct(product._id, true).subscribe((res) => {
        console.log(res);
        this.getCart();
      });
    }
  }
  getCart() {
    this.myServer.getAllCart().subscribe((res) => {
      console.log(res);
      this.cartArray = res.products;
      this.getTotalCart();
      this.cartLength = this.cartArray.length;
    });
  }
  deleteProductOnCart(productID) {
    const prodInCart = this.cartArray.find(
      (productCart) => productID == productCart.productID
    );
    if (!prodInCart || prodInCart.quantity == 1) {
      this.myServer.deleteProduct(productID).subscribe((res) => {
        console.log(res);
        this.getCart();
      });
    } else {
      this.myServer.patchProduct(productID, false).subscribe((res) => {
        console.log(res);
        this.getCart();
      });
    }
  }

  getTotalCart() {
    let result = 0;
    this.cartArray.forEach((product) => {
      result += product.price * product.quantity;
    });
    this.resultTotal = result;
  }
  deleteAllCart() {
    this.myServer.deleteAllCart().subscribe((res) => {
      console.log(res);
      this.getCart();
    });
  }
}
