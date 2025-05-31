import {ValidRandomStringTypeModel} from "../../model/random.model";

export const validRandomStringTypes: ValidRandomStringTypeModel[] = [
  { name: 'Hex', type: 'hex' },
  { name: 'Base64', type: 'base64' },
  { name: 'URL Safe', type: 'url-safe' },
  { name: 'Numerical', type: 'numeric' },
  { name: 'Distinguishable', type: 'distinguishable' },
  { name: 'ASCII Printable', type: 'ascii-printable' },
  { name: 'Alphanumeric', type: 'alphanumeric' }
];
