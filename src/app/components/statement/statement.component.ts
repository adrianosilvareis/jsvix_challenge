import { Component } from '@angular/core';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html'
})
export class StatementComponent {
  transactions = [
    {
      date: new Date(),
      description: 'Supermercado',
      type: 'credit',
      amount: 35.5
    },
    {
      date: new Date(),
      description: 'Salario',
      type: 'deposit',
      amount: 2000
    },
    {
      date: new Date(),
      description: 'Escola',
      type: 'credit',
      amount: 15.5
    },
    {
      date: new Date(),
      description: 'Roupas',
      type: 'credit',
      amount: 7.5
    },
    {
      date: new Date(),
      description: 'restaurante',
      type: 'credit',
      amount: 80.5
    },
  ]

  total = this.transactions.reduce((prev, { type, amount }) => {
    return type === 'credit' ? prev -= amount : prev += amount;
  }, 0);
}
