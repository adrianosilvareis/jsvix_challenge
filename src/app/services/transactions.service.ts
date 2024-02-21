import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SHA256 } from 'crypto-js';
import { Observable, map, of, take, timer } from 'rxjs';
import { JSChallengerDB } from '../db/jschallenger.db';
import { TransactionProps } from '../interfaces/transaction-props.interface';
import { TransactionType } from '../interfaces/transaction-type.enum';
import { Transaction } from '../interfaces/transaction.interface';
import { performTransaction } from '../store/transaction.actions';
import { ChallengerService } from './challenger.service.ts';

const PERFORM_REVERSE_TIME = 2000;
const INITIAL_HASH_KEY = 'JSVIX';

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
      timer(PERFORM_REVERSE_TIME).pipe(
        take(1),
        map(this.performReverseOperation(currentItem))
      ).subscribe();
    }
  }

  private performReverseOperation(currentItem: Transaction) {
    return () => {
      const reversalTransaction: TransactionProps = {
        type: currentItem.type === TransactionType.credit ? TransactionType.deposit : TransactionType.credit,
        amount: currentItem.amount,
        description: `Reverse Operation: ${currentItem.description}`
      };
      this.store.dispatch(performTransaction({ transaction: reversalTransaction }));
    }
  }

  private lastHash() {
    return this.database.lastItem()?.id ?? INITIAL_HASH_KEY;
  }

  private newHash(lastHash: string): string {
    return SHA256(lastHash).toString();
  }
}
