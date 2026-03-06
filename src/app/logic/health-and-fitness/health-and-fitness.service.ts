import { Injectable } from '@angular/core';
import {BmiCategory, BmiModel, BmiRange} from "../../model/bmi.model";
import {Constants} from "../../util/constants.util";

// https://www.npmjs.com/package/@widlestudiollp/health-calculation
// https://www.npmjs.com/package/body-measurements

@Injectable({
  providedIn: 'root'
})
export class HealthAndFitnessService {

  calculateBMI(age: number, height: number, weight: number): BmiModel {
    const bmi = weight / Math.pow(height, 2);

    // TODO : Implement the logic to calculate the BMI considering age and gender

    return {
      age: age,
      height: height,
      weight: weight,
      bmi: bmi,
      unit: 'kg/m²',
      bmiCategory: this.getBmiCategory(bmi),
      healthyRange: this.getHealthyBmiRange(),
      healthyWeightRange: this.getHealthyWeightForHeight(height),
      ponderalIndex: this.calculatePonderalIndex(height, weight),
      ponderalUnit: 'kg/m³'
    };
  }

  getBmiCategory(bmi: number): BmiCategory {
    if (bmi < 16) {
      return BmiCategory.SEVERE_THICKNESS;
    } else if (bmi < 17) {
      return BmiCategory.MODERATE_THICKNESS;
    } else if (bmi < 18.5) {
      return BmiCategory.MILD_THICKNESS;
    } else if (bmi < 25) {
      return BmiCategory.NORMAL;
    } else if (bmi < 30) {
      return BmiCategory.OVERWEIGHT;
    } else if (bmi < 35) {
      return BmiCategory.OBESE_CLASS_1;
    } else if (bmi < 40) {
      return BmiCategory.OBESE_CLASS_2;
    } else {
      return BmiCategory.OBESE_CLASS_3;
    }
  }

  private calculatePonderalIndex(height: number, weight: number) {
    return weight / Math.pow(height, 3);
  }

  private getHealthyBmiRange(): BmiRange {
    return {
      start: Constants.BmiConstants.HEALTHY_RANGE_START,
      end: Constants.BmiConstants.HEALTHY_RANGE_END
    };
  }

  private getHealthyWeightForHeight(height: number): BmiRange {
    return {
      start: Math.pow(height, 2) * Constants.BmiConstants.HEALTHY_RANGE_START,
      end: Math.pow(height, 2) * Constants.BmiConstants.HEALTHY_RANGE_END
    };
  }
}
