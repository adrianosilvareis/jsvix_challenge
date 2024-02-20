import { TransactionType } from "./transaction-type.enum";

export interface Transaction {
  type: TransactionType;
  amount: number;
  description: string;
  date: Date;
  id: string;
}
