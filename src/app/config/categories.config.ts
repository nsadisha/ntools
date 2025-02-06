import {Category, CategoryType} from "../model/category.model";

export const categories: Category[] = [
  {
    id: 1,
    name: 'Text Editor',
    description: 'Text editor tools',
    type: CategoryType.TEXT_EDITOR,
  },
  {
    id: 2,
    name: 'Random Generator',
    description: 'Random generator tools',
    type: CategoryType.RANDOM_GENERATOR,
  },
  {
    id: 3,
    name: 'Unit Converter',
    description: 'Unit converter tools',
    type: CategoryType.UNIT_CONVERTER,
  },
  {
    id: 4,
    name: 'Other Calculator',
    description: 'Other calculator tools',
    type: CategoryType.OTHER_CALCULATOR,
  },
  {
    id: 5,
    name: 'Date Time Calculator',
    description: 'Date time calculator tools',
    type: CategoryType.DATE_TIME_CALCULATOR,
  },
  {
    id: 6,
    name: 'Mathematical Calculator',
    description: 'Mathematical calculator tools',
    type: CategoryType.MATHEMATICAL_CALCULATOR,
  },
  {
    id: 7,
    name: 'Health and Fitness Calculator',
    description: 'Health and fitness calculator tools',
    type: CategoryType.HEALTH_AND_FITNESS_CALCULATOR,
  }
];
