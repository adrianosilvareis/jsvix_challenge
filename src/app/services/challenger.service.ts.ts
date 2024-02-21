import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { JSChallengerDB } from '../db/jschallenger.db';
import { TransactionProps } from '../interfaces/transaction-props.interface';
import { Transaction } from '../interfaces/transaction.interface';

const PERFORM_REVERSE_TIME = 2000;
const INITIAL_HASH_KEY = 'JSVIX';

@Injectable({
  providedIn: 'root'
})
export class ChallengerService {

  constructor(
    private readonly database: JSChallengerDB,
    private readonly store: Store,
  ) { }

  newTransaction(prop: TransactionProps) {
    // criar hash usando a hash anterior como key
    // gerar um registro
  }

  private checkDuplicate(currentItem: Transaction) {
  }

  private performReverseOperation(currentItem: Transaction) {
  }
}
