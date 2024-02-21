import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { loadTransactionError, loadTransactionSuccess, loadTransactions, performTransaction, performTransactionError, performTransactionSuccess } from './transaction.actions';
import { TransactionsService } from '../services/transactions.service';

@Injectable()
export class TransactionEffects {

  loadTransactions$ = createEffect(() => this.actions$.pipe(
    ofType(loadTransactions),
    exhaustMap(() => this.transactionsService.getAll()
      .pipe(
        map(transactions => loadTransactionSuccess({ transactions })),
        catchError(() => of(loadTransactionError({ error: 'Error on load transactions' })))
      ))
    )
  );

  performTransactions$ = createEffect(() => this.actions$.pipe(
    ofType(performTransaction),
    exhaustMap(({ transaction }) => {
      return this.transactionsService.newTransaction(transaction)
      .pipe(
        map(transaction => performTransactionSuccess({ transaction })),
        catchError(() => of(performTransactionError({ error: 'Error on try perform transaction' })))
      )
    })
    )
  );

  constructor(
    private actions$: Actions,
    private transactionsService: TransactionsService
  ) {}
}
