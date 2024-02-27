# js-vix - dojo

Todo codigo deve ser implementado no arquivo `./app/services/challenger.service.ts`


## Comandos

`pnpm start` para rodar a aplicação
`pnpm test -- --watch` para rodar os testes em modo watch


# Desafio 1

Criar uma transação seguindo a estrutura proposta pela interface `Transaction`.
- usando o ID da transação anterior como chave para o novo ID.
- quando não existir transação anterior a chave deve ser **js-vix** tudo maiúsculo.
- o ID deve ser um HASH do tipo SHA256.

**Funções que precisam ser implementadas**: 
- `createTransaction(prop: TransactionProps): Transaction`
- `lastHash(): string`
- `toHash(lastHash: string): string`


**Referencia técnica.**

```Typescript
import { SHA256 } from 'crypto-js';

SHA256(key).toString() // para criar um novo HASH
```

**Dicas**: 

o banco de dados possui uma função chamada: `lastItem()`, ele já esta disponível no construtor da classe.

```Typescript
  this.database.lastItem() // isso é uma Transaction
```

```
  existe uma constante com o valor 'js-vix', ele deve ser retornado como chave quando não existir nenhuma transação no banco de dados.
```


# Desafio 2

Verificar duplicatas.

- se a nova transação tiver `valor` e `descrição` iguais da ultima transação registrada deve ser retornado `true` caso não exista transação anterior ou a condição anterior for falso retornar `false`

**Funções que precisam ser implementadas**: 
- `checkDuplicate(currentItem: Transaction): boolean`

# Desafio 3

Criar operação reversa.

- se for identificado uma transação duplicado é gerado automaticamente uma transação reversa
- a operação deve ter o tipo contrario a transação original
- a operação deve ter uma descrição com o seguinte formato:
 `Reverse Operation: descrição da ultima operação`

**Funções que precisam ser implementadas**: 
 - `createReverseOperation(currentItem: Transaction): TransactionProps`

**Dicas**:

```Typescript
  export enum TransactionType {
    credit='credit',
    deposit='deposit'
  }
```

```Typescript
  const descrição = `Reverse Operation: ${currentItem.description}`
```
