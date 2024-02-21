import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { performTransaction } from '../../store/transaction.actions';
import { TransactionType } from '../../interfaces/transaction-type.enum';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-card-purchase',
  templateUrl: './card-purchase.component.html'
})
export class CardPurchaseComponent implements OnInit{

formGroup!: FormGroup;

constructor(
  private readonly formBuilder: FormBuilder,
  private readonly store: Store,
  ) {}

ngOnInit(): void {
  this.formGroup = this.formBuilder.group({
    storeName: [''],
    description: [''],
    price: ['']
  });
}

  addPurchase() {
    this.store.dispatch(performTransaction({
      transaction: {
        type: TransactionType.credit,
        description: `${this.formGroup.value.storeName} - ${this.formGroup.value.description}`,
        amount: Number(this.formGroup.value.price),
      }
    }))

    this.formGroup.reset();
  }
}
