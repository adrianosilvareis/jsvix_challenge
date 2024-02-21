import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from './prime.module';
import { StatementComponent } from './statement/statement.component';
import { CardPurchaseComponent } from './card-purchase/card-purchase.component';
import { DepositComponent } from './deposit/deposit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DividerComponent } from './divider/divider.component';

@NgModule({
  declarations: [
    StatementComponent,
    CardPurchaseComponent,
    DepositComponent,
    DividerComponent,
  ],
  imports: [
    CommonModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    PrimeModule,
    StatementComponent,
    CardPurchaseComponent,
    DepositComponent,
    DividerComponent,
    FormsModule,
  ]
})
export class ComponentsModule { }
