export interface BmiModel {
  age: number;
  height: number;
  weight: number;
  bmi: number;
  bmiCategory: BmiCategory;
  healthyRange: BmiRange;
  healthyWeightRange: BmiRange;
  ponderalIndex: number;
}

export interface BmiRange {
  start: number;
  end: number;
}

export enum BmiCategory {
  SEVERE_THICKNESS = "Severe Thinness",
  MODERATE_THICKNESS = "Moderate Thinness",
  MILD_THICKNESS = "Mild Thinness",
  NORMAL = "Normal",
  OVERWEIGHT = "Overweight",
  OBESE_CLASS_1 = "Obese Class 1",
  OBESE_CLASS_2 = "Obese Class 2",
  OBESE_CLASS_3 = "Obese Class 3"
}
