import { AfterViewInit, Component, Input } from '@angular/core';

declare var paypal: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})

export class CheckoutComponent implements AfterViewInit {
  @Input() total: number = 0; 
showSuccessPopup = false;
payerName = '';

ngAfterViewInit() {
  paypal.Buttons({
    createOrder: (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [{ amount: { value: this.total.toFixed(2) } }]
      });
    },
    onApprove: (data: any, actions: any) => {
      return actions.order.capture().then((details: any) => {
        this.payerName = details.payer.name.given_name;
        this.showSuccessPopup = true; // показываем попап
      });
    }
  }).render('#paypal-button-container');
}

}
