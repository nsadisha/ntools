import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import {PreloadAllModules, provideRouter, withPreloading} from '@angular/router';

import { routes } from './app.routes';
import { provideNzIcons } from './icons-provider';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import {provideMarkdown} from "ngx-markdown";
import {NzModalModule} from "ng-zorro-antd/modal";

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideNzIcons(),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    importProvidersFrom(NzModalModule),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideMarkdown(),
  ]
};
