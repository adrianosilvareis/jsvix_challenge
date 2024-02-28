import { createSelector } from '@ngrx/store';
import { TransactionsState } from './transaction.reduce';
import { TransactionType } from '../interfaces/transaction-type.enum';

export interface AppState {
  transaction: TransactionsState;
}

export const selectFeature = (state: AppState) => {
  return state.transaction;
};

export const selectTransactions = createSelector(
  selectFeature,
  (state: TransactionsState) => state.transactions
);

export const selectLoading = createSelector(
  selectFeature,
  (state: TransactionsState) => state.loading
);

export const selectBalance = createSelector(
  selectFeature,
  (state: TransactionsState) => state.transactions.reduce(
    (prev, next) => next.type === TransactionType.credit ? prev -= next.amount : prev += next.amount, 0
  )
);
