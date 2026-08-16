import { Injectable } from '@angular/core';
import convert, {Measure, Unit} from 'convert-units';
import {firstLetterToUpperCase} from "../../util/string.util";

@Injectable({
  providedIn: 'root'
})
export class UnitConverterService {

  getMeasures() {
    return convert().measures().map(measure => ({
      value: measure,
      label: firstLetterToUpperCase(measure)
    }));
  }

  getMeasurePossibilities(measure: Measure) {
    return convert().list(measure);
  }

  getConversionPossibilities(unit: Unit) {
    return convert().from(unit).possibilities().map(p => convert().describe(p));
  }

  convert(value: number, from: Unit, to: Unit) {
    return convert(value).from(from).to(to);
  }

  convertToBest(value: number, from: Unit) {
    return convert(value).from(from).toBest();
  }

  formatResult(value: number, from: string, to: string | null | undefined, result: number, roundDigits: number): string {
    return value + " " + from + " = " + result.toFixed(roundDigits) + " " + to;
  }

  formatBestResult(value: number, from: string, bestResult: { val: number; unit: string } | null): string {
    return value + " " + from + " = " + bestResult?.val + " " + bestResult?.unit;
  }

  shouldShowBestResult(to: string | null | undefined, bestResult: { val: number; unit: string } | null): boolean {
    return bestResult != null && to !== bestResult.unit;
  }
}
