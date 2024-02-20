
import { createReducer, on } from '@ngrx/store';
import { performTransaction, performTransactionSuccess, performTransactionError } from './transaction.actions';
import { Transaction } from '../interfaces/transaction.interface';
import { TransactionType } from '../interfaces/transaction-type.enum';

const mockTransactions = [
  {
    id: 'any_id',
    date: new Date(),
    description: 'Supermercado',
    type: TransactionType.credit,
    amount: 35.5
  },
  {
    id: 'any_id',
    date: new Date(),
    description: 'Salario',
    type: TransactionType.deposit,
    amount: 2000
  },
  {
    id: 'any_id',
    date: new Date(),
    description: 'Escola',
    type: TransactionType.credit,
    amount: 15.5
  },
  {
    id: 'any_id',
    date: new Date(),
    description: 'Roupas',
    type: TransactionType.credit,
    amount: 7.5
  },
  {
    id: 'any_id',
    date: new Date(),
    description: 'restaurante',
    type: TransactionType.credit,
    amount: 80.5
  },
];

export interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

export const initialState: TransactionsState = {
  transactions: mockTransactions,
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
  }))
);
