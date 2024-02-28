import { createSelector } from '@ngrx/store';
import { TransactionsState } from './transaction.reduce';

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
  (state: TransactionsState) => state.balance
);
