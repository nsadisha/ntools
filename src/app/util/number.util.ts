import {ApplicationConfig} from "../config/application.config";

export function validateRoundNumber(round: number): number {
  if(round < ApplicationConfig.MIN_ROUND_DIGITS) {
    return ApplicationConfig.MIN_ROUND_DIGITS;
  } else if(round > ApplicationConfig.MAX_ROUND_DIGITS) {
    return ApplicationConfig.MAX_ROUND_DIGITS;
  }
  return round;
}
