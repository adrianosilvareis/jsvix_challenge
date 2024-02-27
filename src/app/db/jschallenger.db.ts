import { Injectable } from "@angular/core";
import { Transaction } from "../interfaces/transaction.interface";

@Injectable({
  providedIn: 'root'
})
export class JSChallengerDB {
  public transactions: Transaction[] = [];

  add (transaction: Transaction) {
    this.transactions = [...this.transactions, transaction];
    return transaction;
  }

  list() {
    return this.transactions;
  }

  lastItem() {
    return this.transactions.at(-1);
  }
}
