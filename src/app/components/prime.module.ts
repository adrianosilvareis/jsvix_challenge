import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    DividerModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
  ],
  exports: [
    ButtonModule,
    TableModule,
    DividerModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
  ]
})
export class PrimeModule { }
