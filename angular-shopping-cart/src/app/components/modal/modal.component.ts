import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  cartArray: any[];
  constructor(private myServer: UserDetailsService) {}

  ngOnInit(): void {}
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    // lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$'),
      Validators.required,
    ]),
  });
  createUser() {
    let mail = this.form.controls.email.value;
    let phone = this.form.controls.phoneNumber.value;
    let name = this.form.controls.name.value;
    let body = { userName: name, phone: phone, mail: mail };

    this.myServer.createUser(body).subscribe((res) => {
      console.log(res);
      console.log(this.cartArray);
      let productsCartID = [];
      this.cartArray.forEach((product) => {
        productsCartID.push(product.productID);
      });
      console.log(productsCartID);

      let userID = res.user._id;
      this.myServer.createOrder(userID, productsCartID).subscribe((res) => {
        console.log('Order End!!!', res);
      });
    });
  }
}
