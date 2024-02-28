import { faker } from '@faker-js/faker';
import { SHA256 } from 'crypto-js';
import { JSChallengerDB } from '../db/jschallenger.db';
import { TransactionProps } from '../interfaces/transaction-props.interface';
import { TransactionType } from '../interfaces/transaction-type.enum';
import { Transaction } from '../interfaces/transaction.interface';
import { ChallengerService } from './challenger.service.ts';

describe('ChallengerService', () => {
  let service: ChallengerService;
  let database: JSChallengerDB;

  jest
    .useFakeTimers()
    .setSystemTime(new Date('2024-02-28'));

  beforeEach(() => {
    database = new JSChallengerDB();

    service = new ChallengerService(database);
  });

  it('deve retornar uma instancia de Transaction ao chamar a função "createTransaction"', () => {
    const transactionProps = Builder.TransactionPropsBuild();

    const expected = Object.assign({}, transactionProps, {
      id: SHA256('js-vix').toString(),
      date: new Date()
    })

    const response = service.createTransaction(transactionProps);

    expect(response).toEqual(expected);
  });

  it('deve retornar um Id novo para cada transação usando o ultimo Id como chave', () => {
    const transaçãoExistente = Builder.TransactionBuild();
    transaçãoExistente.id = 'js-vix';

    service.database.transactions = [ transaçãoExistente ];

    const novaTransação = service.createTransaction(Builder.TransactionPropsBuild()) as Transaction;
    const SHA256_OF_JS_VIX = '92e8cd1579e6e62a98786bc12bccdceff49270416316559a2c03090cd0f42d71';

    expect(SHA256_OF_JS_VIX).toBe(novaTransação.id);
  });

  it('deve retornar falso se a transação for a primeira cadastrada no banco de dados', () => {
    const isDuplicated = service.checkDuplicate(Builder.TransactionBuild());
    expect(isDuplicated).toBeFalsy();
  });

  it('deve retornar falso se a nova transação for tiver descrição ou valor diferente da última registrada', () => {
    const transaçãoExistente = Builder.TransactionBuild();
    const novaTransação = Builder.TransactionBuild();

    service.database.transactions = [ transaçãoExistente ];

    const isDuplicated = service.checkDuplicate(novaTransação);

    expect(isDuplicated).toBeFalsy();
  });

  it('deve retornar true se a nova transação for tiver descrição e valor igual ao último registro', () => {
    const transaçãoExistente = Builder.TransactionBuild();
    service.database.transactions = [ transaçãoExistente ];

    const isDuplicated = service.checkDuplicate(Object.assign({}, transaçãoExistente, {
      id: faker.string.uuid(),
    }))

    expect(isDuplicated).toBeTruthy();
  });

  it('deve criar uma transação de mesmo valor, com tipo contrario e descrição com o seguinte prefixo - "Reverse Operation: " ao chamar a função "createReverseOperation"', () => {
    const transaçãoExistente = Builder.TransactionBuild();

    const transactionProps = service.createReverseOperation(transaçãoExistente)

    const expectedProps = Object.assign({}, transactionProps, {
      description: `Reverse Operation: ${transaçãoExistente.description}`
    });

    expect(transactionProps).toEqual(expectedProps);
  });

  it('deve retornar o texto "js-vix" ao chamar "lastHash" quando não existir transações', () => {
    const lastHash = service.lastHash();
    expect(lastHash).toBe('js-vix');
  });

  it('deve retornar o id do ultimo registro, quando existir', () => {
    const transaçãoExistente = Builder.TransactionBuild();
    service.database.transactions = [ transaçãoExistente ];

    const lastHash = service.lastHash();
    expect(lastHash).toBe(transaçãoExistente.id);
  });

  it('deve retornar um SHA256 usando o valor passado como chave', () => {
    const hash = service.toHash('js-vix');
    expect(hash).toBe('92e8cd1579e6e62a98786bc12bccdceff49270416316559a2c03090cd0f42d71');
  });

  it('deve retornar a soma total das operações realizadas', () => {
    const transactions = [
      Object.assign({}, Builder.TransactionBuild(), { amount: 250, type: TransactionType.deposit }),
      Object.assign({}, Builder.TransactionBuild(), { amount: 150, type: TransactionType.deposit }),
      Object.assign({}, Builder.TransactionBuild(), { amount: 170, type: TransactionType.credit }),
      Object.assign({}, Builder.TransactionBuild(), { amount: 130, type: TransactionType.credit }),
    ]

    const balance = service.calculeSaldoTotal(transactions);

    expect(balance).toBe(100);
  });
});

class Builder {
  static TransactionBuild(): Transaction {
    return {
      id: faker.string.uuid(),
      date: new Date(),
      amount: faker.number.int(),
      description: faker.commerce.productName(),
      type: faker.helpers.enumValue(TransactionType)
    }
  }

  static TransactionPropsBuild(): TransactionProps {
    return {
      amount: faker.number.int(),
      description: faker.commerce.productName(),
      type: faker.helpers.enumValue(TransactionType)
    }
  }
}
