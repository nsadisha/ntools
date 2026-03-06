import { Injectable } from '@angular/core';
import cryptoRandomString, {Options} from "crypto-random-string";
import {ValidRandomStringTypeModel} from "../../model/random.model";
import {validRandomStringTypes} from "../../config/random/radom.config";

@Injectable({
  providedIn: 'root'
})
export class RandomGeneratorService {
  generateRandomString(options: Options): string {
    return cryptoRandomString(options);
  }

  getValidRandomStringTypes(): ValidRandomStringTypeModel[] {
    return validRandomStringTypes
  }

  generateRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
