
import { createReducer, on } from '@ngrx/store';
import { performTransaction, performTransactionSuccess, performTransactionError, loadTransactions, loadTransactionSuccess, loadTransactionError } from './transaction.actions';
import { Transaction } from '../interfaces/transaction.interface';

export interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

export const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: null
};

export const transactionsReducer = createReducer(
  initialState,
  on(performTransaction, (state, { transaction }) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(performTransactionSuccess, (state, { transaction }) => ({
    ...state,
    transactions: [...state.transactions, transaction],
    loading: false,
    error: null
  })),
  on(performTransactionError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  on(loadTransactions, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadTransactionSuccess, (state, { transactions }) => ({
    ...state,
    transactions,
    loading: false,
    error: null
  })),
  on(loadTransactionError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);
