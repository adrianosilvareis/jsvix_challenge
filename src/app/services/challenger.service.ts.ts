import { Injectable } from '@angular/core';
import { SHA256 } from 'crypto-js';
import { JSChallengerDB } from '../db/jschallenger.db';
import { TransactionProps } from '../interfaces/transaction-props.interface';
import { TransactionType } from './../interfaces/transaction-type.enum';
import { Transaction } from './../interfaces/transaction.interface';

const INITIAL_HASH_KEY = 'js-vix';

@Injectable({
  providedIn: 'root'
})
export class ChallengerService {

    constructor(
      public readonly database: JSChallengerDB,
    ) { }

    createTransaction(prop: TransactionProps): Transaction | void{
      return {
        id: this.toHash(this.lastHash() as string) as string,
        date: new Date(),
        amount: prop.amount,
        description: prop.description,
        type: prop.type,
      }
    }

    checkDuplicate(currentItem: Transaction): boolean | void {
      const lastItem = this.database.lastItem();

      if(!lastItem) {
        return false;
      }

      return currentItem.amount === lastItem.amount && currentItem.description === lastItem.description
    }

    createReverseOperation(currentItem: Transaction): TransactionProps | void {
      return {
        type: TransactionType.credit ? TransactionType.deposit : TransactionType.credit,
        amount: currentItem.amount,
        description: `Reverse Operation: ${currentItem.description}`
      }
    }

    lastHash(): string | void{
      return this.database.lastItem()?.id ?? 'js-vix'
    }

    toHash(lastHash: string): string | void{
      return SHA256(lastHash).toString();
    }

    calculeSaldoTotal(transactions: Transaction[]): number {
      return transactions.reduce((prev, next) => {
        return next.type === TransactionType.credit ? prev -= next.amount : prev += next.amount;
      }, 0)
    }
  }

