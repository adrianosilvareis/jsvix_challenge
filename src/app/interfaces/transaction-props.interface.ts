import { TransactionType } from "./transaction-type.enum";

export interface TransactionProps {
  type: TransactionType;
  amount: number;
  description: string;
}
