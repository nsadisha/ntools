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
}
