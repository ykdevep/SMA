import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

const APP_PREFIX = 'APP-';

@Injectable()
export class LocalStorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  setItem(key: string, value: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
    }
  }

  getItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`));
    }
  }

  removeItem(key: string) {
    if (isPlatformBrowser(this.platformId)){
      localStorage.removeItem(`${APP_PREFIX}${key}`);
    }
  }

}
