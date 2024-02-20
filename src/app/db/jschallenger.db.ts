import { Transaction } from "../interfaces/transaction.interface";

export class JSChallengerDB {
  private transactions: Transaction[] = [];

  add (transaction: Transaction) {
    this.transactions.push(transaction);
  }

  list() {
    return this.transactions;
  }
}
