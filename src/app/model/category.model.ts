export interface Category {
  id: number;
  name: string;
  description: string;
  type: CategoryType;
}

export enum CategoryType {
  TEXT_EDITOR = 'text-editor',
  RANDOM_GENERATOR = 'random-generator',
  UNIT_CONVERTER = 'unit-converter',
  OTHER_CALCULATOR = 'other-calculator',
  DATE_TIME_CALCULATOR = 'date-time-calculator',
  MATHEMATICAL_CALCULATOR = 'mathematical-calculator',
  HEALTH_AND_FITNESS_CALCULATOR = 'health-and-fitness-calculator',
}
