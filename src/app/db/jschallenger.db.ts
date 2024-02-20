import { Injectable } from "@angular/core";
import { TransactionType } from "../interfaces/transaction-type.enum";
import { Transaction } from "../interfaces/transaction.interface";

@Injectable({
  providedIn: 'root'
})
export class JSChallengerDB {
  private transactions: Transaction[] = [
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

  add (transaction: Transaction) {
    this.transactions.push(transaction);
  }

  list() {
    return this.transactions;
  }
}
