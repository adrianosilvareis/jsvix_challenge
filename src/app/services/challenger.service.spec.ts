import { SHA256 } from 'crypto-js';
import { JSChallengerDB } from '../db/jschallenger.db';
import { TransactionType } from '../interfaces/transaction-type.enum';
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
    const transactionProps = {
      type: TransactionType.credit,
      amount: 100,
      description: 'Supermercado'
    };

    const expected = Object.assign({}, transactionProps, {
      id: SHA256('JSVIX').toString(),
      date: new Date()
    })

    const response = service.createTransaction(transactionProps);

    expect(response).toEqual(expected);
  });

  it('deve retornar um Id novo para cada transação usando o ultimo Id como chave', () => {
    const transaçãoExistente = {
      id: 'JSVIX',
      amount: 100,
      date: new Date(),
      description: 'Compra',
      type: TransactionType.credit,
    }

    service.database.transactions = [ transaçãoExistente ];

    const novaTransação = service.createTransaction({
      amount: 150,
      description: 'Outra compra',
      type: TransactionType.credit,
    })
    const SHA256_OF_JSVIX = '59f92eab109759c9db3d4f0b3c1dda6a39f499591b10d122c1f9f278fd50ca9e';

    expect(SHA256_OF_JSVIX).toBe(novaTransação.id);
  });

  it('deve retornar falso se a transação for a primeira cadastrada no banco de dados', () => {
    const isDuplicated = service.checkDuplicate({
      id: 'JSVIX',
      amount: 100,
      date: new Date(),
      description: 'Compra',
      type: TransactionType.credit,
    })

    expect(isDuplicated).toBeFalsy();
  });

  it('deve retornar falso se a nova transação for tiver descrição ou valor diferente da última registrada', () => {
    const transaçãoExistente = {
      id: 'JSVIX',
      amount: 100,
      date: new Date(),
      description: 'Compra',
      type: TransactionType.credit,
    }

    service.database.transactions = [ transaçãoExistente ];

    const isDuplicated = service.checkDuplicate({
      id: 'OUTRO_ID_QUALQUER',
      amount: 100,
      date: new Date(),
      description: 'Outra descrição qualquer',
      type: TransactionType.credit,
    })

    expect(isDuplicated).toBeFalsy();
  });

  it('deve retornar true se a nova transação for tiver descrição e valor igual ao último registro', () => {
    const transaçãoExistente = {
      id: 'JSVIX',
      amount: 100,
      date: new Date(),
      description: 'Compra',
      type: TransactionType.credit,
    }

    service.database.transactions = [ transaçãoExistente ];

    const isDuplicated = service.checkDuplicate({
      id: 'OUTRO_ID_QUALQUER',
      amount: 100,
      date: new Date(),
      description: 'Compra',
      type: TransactionType.credit,
    })

    expect(isDuplicated).toBeTruthy();
  });

  it('deve criar uma transação de mesmo valor, com tipo contrario e descrição com o seguinte prefixo - "Reverse Operation: " ao chamar a função "createReverseOperation"', () => {
    const transactionProps = service.createReverseOperation({
      id: 'ANY_ID',
      date: new Date(),
      type: TransactionType.credit,
      amount: 100,
      description: 'Transação duplicada'
    })

    const expectedProps = {
      type: TransactionType.deposit,
      amount: 100,
      description: 'Reverse Operation: Transação duplicada'
    }

    expect(transactionProps).toEqual(expectedProps);
  });

  it('deve retornar o texto "JSVIX" ao chamar "lastHash" quando não existir transações', () => {
    const lastHash = service.lastHash();
    expect(lastHash).toBe('JSVIX');
  });

  it('deve retornar o id do ultimo registro, quando existir', () => {
    service.database.transactions = [{
      id: 'ULTIMO_ID',
      date: new Date(),
      amount: 100,
      description: 'qualquer descrição',
      type: TransactionType.deposit
    }];

    const lastHash = service.lastHash();
    expect(lastHash).toBe('ULTIMO_ID');
  });

  it('deve retornar um SHA256 usando o valor passado como chave', () => {
    const hash = service.toHash('JSVIX');
    expect(hash).toBe('59f92eab109759c9db3d4f0b3c1dda6a39f499591b10d122c1f9f278fd50ca9e');
  });

});
