import { HealthAndFitnessService } from './health-and-fitness.service';
import { BmiCategory } from '../../model/bmi.model';

describe('HealthAndFitnessService', () => {
  let service: HealthAndFitnessService;

  beforeEach(() => {
    service = new HealthAndFitnessService();
  });

  describe('getBmiCategory', () => {
    const cases: [number, BmiCategory][] = [
      [15, BmiCategory.SEVERE_THICKNESS],
      [16.5, BmiCategory.MODERATE_THICKNESS],
      [17.5, BmiCategory.MILD_THICKNESS],
      [20, BmiCategory.NORMAL],
      [27, BmiCategory.OVERWEIGHT],
      [32, BmiCategory.OBESE_CLASS_1],
      [37, BmiCategory.OBESE_CLASS_2],
      [42, BmiCategory.OBESE_CLASS_3],
    ];

    for (const [bmi, expected] of cases) {
      it(`should categorize a BMI of ${bmi} as ${expected}`, () => {
        expect(service.getBmiCategory(bmi)).toBe(expected);
      });
    }
  });

  describe('calculateBMI', () => {
    it('should compute the full BMI model for a given age/height/weight', () => {
      const result = service.calculateBMI(30, 2, 80);

      expect(result).toEqual({
        age: 30,
        height: 2,
        weight: 80,
        bmi: 20,
        unit: 'kg/m²',
        bmiCategory: BmiCategory.NORMAL,
        healthyRange: { start: 18.5, end: 25 },
        healthyWeightRange: { start: 74, end: 100 },
        ponderalIndex: 10,
        ponderalUnit: 'kg/m³',
      });
    });
  });
});
