import { Injectable } from '@angular/core';
import { Transaction } from '../interfaces/transaction.interface';
import { Observable, of } from 'rxjs';
import { JSChallengerDB } from '../db/jschallenger.db';
import { SHA256 } from 'crypto-js';
import { TransactionProps } from '../interfaces/transaction-props.interface';
import { Store } from '@ngrx/store';
import { performTransaction } from '../store/transaction.actions';
import { TransactionType } from '../interfaces/transaction-type.enum';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(
    private readonly database: JSChallengerDB,
    private readonly store: Store,
  ) { }

  getAll(): Observable<Transaction[]> {
    return of(this.database.list());
  }

  newTransaction(prop: TransactionProps) {
    const transaction = {
      id: this.newHash(this.lastHash()),
      date: new Date(),
      type: prop.type,
      description: prop.description,
      amount: prop.amount
    };

    this.checkDuplicate(transaction);

    return of(this.database.add(transaction));
  }

  private checkDuplicate(currentItem: Transaction) {
    const lastItem = this.database.lastItem();

    if (!lastItem) {
      return
    }

    if (lastItem.description === currentItem.description && lastItem.amount === currentItem.amount) {
      setTimeout(() => {
        const reversalTransaction: TransactionProps = {
          type: currentItem.type === TransactionType.credit ? TransactionType.deposit : TransactionType.credit,
          amount: currentItem.amount,
          description: `Reverse Operation: ${currentItem.description}`
        }
        this.store.dispatch(performTransaction({ transaction: reversalTransaction }))
      }, 2000);
    }
  }

  private lastHash() {
    return this.database.lastItem()?.id ?? 'JSVIX';
  }

  private newHash(lastHash: string): string {
    return SHA256(lastHash).toString();
  }
}
