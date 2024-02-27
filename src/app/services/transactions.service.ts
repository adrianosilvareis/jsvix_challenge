import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { JSChallengerDB } from '../db/jschallenger.db';
import { TransactionProps } from '../interfaces/transaction-props.interface';
import { Transaction } from '../interfaces/transaction.interface';
import { performTransaction } from '../store/transaction.actions';
import { ChallengerService } from './challenger.service.ts';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(
    private readonly database: JSChallengerDB,
    private readonly store: Store,
    private readonly challenge: ChallengerService,
  ) { }

  getAll(): Observable<Transaction[]> {
    return of(this.database.list());
  }

  newTransaction(prop: TransactionProps) {
    const transaction = this.challenge.createTransaction(prop) as Transaction;

    const isDuplicated = this.challenge.checkDuplicate(transaction);

    if (isDuplicated) {
      const reversalTransaction = this.challenge.createReverseOperation(transaction) as Transaction;

      this.store.dispatch(performTransaction({ transaction: reversalTransaction }));
    }

    return of(this.database.add(transaction));
  }
}
