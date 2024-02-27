import { Injectable } from '@angular/core';
import { SHA256 } from 'crypto-js';
import { JSChallengerDB } from '../db/jschallenger.db';
import { TransactionProps } from '../interfaces/transaction-props.interface';
import { TransactionType } from '../interfaces/transaction-type.enum';
import { Transaction } from '../interfaces/transaction.interface';

const INITIAL_HASH_KEY = 'JSVIX';

@Injectable({
  providedIn: 'root'
})
export class ChallengerService {

    constructor(
      public readonly database: JSChallengerDB,
    ) { }

    createTransaction(prop: TransactionProps): Transaction {
      return {
        id: this.toHash(this.lastHash()),
        date: new Date(),
        type: prop.type,
        description: prop.description,
        amount: prop.amount
      };
    }

    checkDuplicate(currentItem: Transaction): boolean {
      const lastItem = this.database.lastItem();

      if (!lastItem) {
        return false;
      }

      return lastItem.description === currentItem.description && lastItem.amount === currentItem.amount;
    }

    createReverseOperation(currentItem: Transaction): TransactionProps {
      return {
        type: currentItem.type === TransactionType.credit ? TransactionType.deposit : TransactionType.credit,
        amount: currentItem.amount,
        description: `Reverse Operation: ${currentItem.description}`
      }
    }

    lastHash(): string {
      return this.database.lastItem()?.id ?? INITIAL_HASH_KEY;
    }

    toHash(lastHash: string): string {
      return SHA256(lastHash).toString();
    }
  }

