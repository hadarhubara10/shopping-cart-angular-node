import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-cart-side-nav',
  templateUrl: './cart-side-nav.component.html',
  styleUrls: ['./cart-side-nav.component.scss'],
})
export class CartSideNavComponent implements OnInit {
  @Output() onDeleteClick = new EventEmitter<string>();
  @Output() onDeleteCartClick = new EventEmitter<string>();
  constructor(private myServer: ProductService, public dialog: MatDialog) {}
  showCart = true;
  @Input() resultTotal;
  @Input() cartArray;
  @Input() cartLength;

  changeShowCart() {
    this.showCart = !this.showCart;
  }

  DeleteClick(productID) {
    this.onDeleteClick.emit(productID);
  }
  DeleteCartClick() {
    this.onDeleteCartClick.emit();
  }

  ngOnInit(): void {
    console.log(this.resultTotal);
  }
  openDialog() {
    let dialogRef = this.dialog.open(ModalComponent);
    dialogRef.componentInstance.cartArray = this.cartArray;
  }
}
