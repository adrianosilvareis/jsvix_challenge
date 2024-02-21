import { createAction, props } from '@ngrx/store';
import { Transaction } from '../interfaces/transaction.interface';
import { TransactionProps } from '../interfaces/transaction-props.interface';

export const performTransaction = createAction(
  '[Transaction] Perform Transaction',
  props<{ transaction: TransactionProps }>()
);

export const performTransactionSuccess = createAction(
  '[Transaction] Perform Transaction Success',
  props<{ transaction: Transaction }>()
);

export const performTransactionError = createAction(
  '[Transaction] Perform Transaction Error',
  props<{ error: string }>()
);

export const loadTransactions = createAction(
  '[Transaction] Load Transaction'
);

export const loadTransactionSuccess = createAction(
  '[Transaction] Load Transaction Success',
  props<{ transactions: Transaction[] }>()
);

export const loadTransactionError = createAction(
  '[Transaction] Load Transaction Error',
  props<{ error: string }>()
);
