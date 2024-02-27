import { Injectable } from '@angular/core';
import { JSChallengerDB } from '../db/jschallenger.db';
import { TransactionProps } from '../interfaces/transaction-props.interface';
import { Transaction } from '../interfaces/transaction.interface';

const INITIAL_HASH_KEY = 'JSVIX';

@Injectable({
  providedIn: 'root'
})
export class ChallengerService {

    constructor(
      public readonly database: JSChallengerDB,
    ) { }

    createTransaction(prop: TransactionProps): Transaction | void{
    }

    checkDuplicate(currentItem: Transaction): boolean | void {
    }

    createReverseOperation(currentItem: Transaction): TransactionProps | void {
    }

    lastHash(): string | void{
    }

    toHash(lastHash: string): string | void{
    }
  }

