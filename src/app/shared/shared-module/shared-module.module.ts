import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumericInputDirective } from '../../directives/numeric-input.directive';



@NgModule({
  declarations: [NumericInputDirective],
  exports: [NumericInputDirective],
  imports: [CommonModule]
})
export class SharedModule { }
