// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app/app.routes'; // <-- tu archivo de rutas stand-alone
import { AppComponent } from './app/app.component';
import { CoreModule } from './app/core/core.module';

// 🔧 Factory para ngx-translate
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
  providers: [
    // 👉 Router stand-alone
    provideRouter(routes),

    // 👉 Animaciones (equivalente a BrowserAnimationsModule)
    provideAnimations(),

    // 👉 Imports de módulos “clásicos” que aún necesitas
    importProvidersFrom(
      HttpClientModule,
      CoreModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
        defaultLanguage: 'es',
      })
    ),
  ],
}).catch((err) => console.error(err));
