import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { loadTransactions } from '../../store/transaction.actions';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  imports: [
    ComponentsModule,
  ],
  templateUrl: './challenge.page.html',
  styleUrl: './challenge.page.scss'
})
export class ChallengePage implements OnInit{

  ngOnInit(): void {
    this.store.dispatch(loadTransactions());
  }

  constructor(private readonly store: Store) {}
}
