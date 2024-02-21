import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { SHA256 } from 'crypto-js';
import { of } from 'rxjs';
import { JSChallengerDB } from '../db/jschallenger.db';
import { TransactionType } from '../interfaces/transaction-type.enum';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let databaseMock: Partial<JSChallengerDB>;
  let storeMock: Partial<Store>;

  jest
    .useFakeTimers()
    .setSystemTime(new Date('2024-02-28'));

  beforeEach(() => {
    databaseMock = {
      list: jest.fn().mockReturnValue(of([])),
      add: jest.fn(),
      lastItem: jest.fn()
    };

    storeMock = {};

    TestBed.configureTestingModule({
      providers: [
        TransactionsService,
        { provide: JSChallengerDB, useValue: databaseMock },
        { provide: Store, useValue: storeMock },
      ],
    });

    service = TestBed.inject(TransactionsService);
  });

  it('should call "getAll" method of database', () => {
    const listSpy = jest.spyOn(databaseMock, 'list');

    service.getAll();

    expect(listSpy).toHaveBeenCalled();
  });

  it('should call "add" method of database', () => {
    const addSpy = jest.spyOn(databaseMock, 'add');
    const transactionProps = {
      type: TransactionType.credit,
      amount: 100,
      description: 'Supermercado'
    };

    const expected = Object.assign({}, transactionProps, {
      id: SHA256('JSVIX').toString(),
      date: new Date()
    })

    service.newTransaction(transactionProps);

    expect(addSpy).toHaveBeenCalledWith(expected);
  });

  it('should generate new hash id using last id like key', () => {
    const lastHash = SHA256('JSVIX').toString();

    const transactionProp = {
      type: TransactionType.credit,
      amount: 100,
      description: 'Supermercado'
    }

    const lastTransaction = Object.assign({}, transactionProp, {
      id: lastHash,
      date: new Date(),
    });

    const expectedTransaction = Object.assign({}, lastTransaction,
      {
        id: SHA256(lastHash).toString()
      })

    const addSpy = jest.spyOn(databaseMock, 'add');
    const lastItemSpy = jest.spyOn(databaseMock, 'lastItem');
    lastItemSpy.mockReturnValueOnce(lastTransaction);

    service.newTransaction(transactionProp);

    expect(addSpy).toHaveBeenCalledWith(expectedTransaction);
  })


  it('', () => {
    const transactionProps = {
      type: TransactionType.credit,
      amount: 100,
      description: 'Supermercado',
    }

    const existingTransaction = Object.assign({}, transactionProps, {
      id: SHA256('JSVIX').toString(),
      date: new Date()
    });

    const expectedReversalTransaction = Object.assign({}, existingTransaction, {
      id: SHA256(existingTransaction.id).toString(),
    });

    const addSpy = jest.spyOn(databaseMock, 'add');
    const lastItemSpy = jest.spyOn(databaseMock, 'lastItem');
    lastItemSpy.mockReturnValueOnce(existingTransaction);

    service.newTransaction(transactionProps);

    expect(addSpy).toHaveBeenCalledWith(expectedReversalTransaction);
  })



  // deve gerar um registro de reversão quando for adicionado um novo registro com a mesma descrição e valor
});
