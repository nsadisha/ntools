import { NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Strips a standalone component's own `imports` (typically a long list of
 * ng-zorro-antd components) down to Angular-native modules, and allows
 * unknown elements/attributes via NO_ERRORS_SCHEMA. Specs using this assert
 * against the component class's state/public API, not rendered DOM, so the
 * ng-zorro children never need to actually render.
 */
export function overrideAsShallow(
  component: Type<any>,
  keepImports: any[] = [CommonModule, ReactiveFormsModule, FormsModule]
): void {
  TestBed.overrideComponent(component, { set: { schemas: [NO_ERRORS_SCHEMA], imports: keepImports } });
}
