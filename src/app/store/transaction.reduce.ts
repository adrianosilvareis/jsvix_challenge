
import { createReducer, on } from '@ngrx/store';
import { Transaction } from '../interfaces/transaction.interface';
import { loadTransactionError, loadTransactionSuccess, loadTransactions, performTransaction, performTransactionError, performTransactionSuccess, updateTotalBalance } from './transaction.actions';

export interface TransactionsState {
  balance: number;
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

export const initialState: TransactionsState = {
  balance: 0,
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
  })),
  on(updateTotalBalance, (state, { total }) => ({
    ...state,
    balance: total
  }))
);
