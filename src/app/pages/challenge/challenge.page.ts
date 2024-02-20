import { Component } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';

@Component({
  standalone: true,
  imports: [
    ComponentsModule,
  ],
  templateUrl: './challenge.page.html',
  styleUrl: './challenge.page.scss'
})
export class ChallengePage {

}
