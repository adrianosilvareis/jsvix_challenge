import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromTransaction from '../../store/transaction.selectors';
import { Transaction } from '../../interfaces/transaction.interface';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html'
})
export class StatementComponent implements OnInit {
  transactions: Transaction[] = [];

  transaction$ = this.store.select(fromTransaction.selectTransactions);
  balance$ = this.store.select(fromTransaction.selectBalance);
  loading$ = this.store.select(fromTransaction.selectLoading);

  constructor(private readonly store: Store<fromTransaction.AppState>) {}

  ngOnInit(): void {
    this.transaction$.subscribe((t) => this.transactions = t);
  }
}
