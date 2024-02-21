import { Component } from '@angular/core';

@Component({
  selector: 'app-divider',
  template: `
  <div class="flex flex-column md:flex-row">
    <div class="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
        <ng-content select="div-left"></ng-content>
    </div>
    <div class="w-full md:w-2">
        <p-divider layout="vertical" styleClass="hidden md:flex"><b>OR</b></p-divider>
    </div>
    <div class="w-full md:w-5 flex align-items-center justify-content-center py-5">
      <ng-content select="div-right"></ng-content>
    </div>
  </div>
  `
})
export class DividerComponent {

}
