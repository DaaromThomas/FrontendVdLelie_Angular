import { Directive, HostListener } from '@angular/core';

@Directive({
 selector: '[appNumericInput]'
})
export class NumericInputDirective {
 @HostListener('input', ['$event'])
 onInputChange(event: Event) {
   const target = event.target as HTMLInputElement;
   const initialValue = target.value;
   if (initialValue !== null) {
     const newValue = initialValue.replace(/[^0-9]*/g, '');
     target.value = newValue;
     if (initialValue !== target.value) {
       event.stopPropagation();
     }
   }
 }
}
