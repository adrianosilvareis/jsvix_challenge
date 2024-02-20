import { Injectable } from '@angular/core';
import { Transaction } from '../interfaces/transaction.interface';
import { TransactionType } from '../interfaces/transaction-type.enum';
import { Observable, of } from 'rxjs';
import { JSChallengerDB } from '../db/jschallenger.db';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private readonly database: JSChallengerDB) { }

  getAll(): Observable<Transaction[]> {
    return of(this.database.list());
  }
}
