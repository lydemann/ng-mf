import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import the Stencil components
import { defineCustomElements } from '@ng-mf/shared-ui/loader';

@NgModule({
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // This allows Angular to recognize custom elements
})
export class SharedUiModule {
  constructor() {
    // Define the custom elements when the module is loaded
    defineCustomElements();
  }
} 