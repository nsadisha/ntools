import { Injectable } from '@angular/core';
import {LocalStorageKeys} from "./local-storage-keys";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setItem(key: LocalStorageKeys, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: LocalStorageKeys): string {
    return localStorage.getItem(key) || '';
  }

  removeItem(key: LocalStorageKeys) {
    localStorage.removeItem(key);
  }
}
