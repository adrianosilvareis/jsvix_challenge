import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TransactionType } from '../../interfaces/transaction-type.enum';
import { performTransaction } from '../../store/transaction.actions';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html'
})
export class DepositComponent implements OnInit{

  formGroup!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      depositorName: [''],
      price: ['']
    });
  }

  addDeposit() {
    this.store.dispatch(performTransaction({
      transaction: {
        type: TransactionType.deposit,
        description: `Deposited by ${this.formGroup.value.depositorName}`,
        amount: Number(this.formGroup.value.price),
      }
    }))

    this.formGroup.reset();
  }

}
