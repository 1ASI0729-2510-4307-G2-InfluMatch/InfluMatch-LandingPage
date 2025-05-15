import {
  Injectable,
  Inject,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

const STORAGE_KEY = 'influMatch-dark-mode';
const DARK_MODE_CLASS = 'dark-mode';
const TRANSITION_CLASS = 'theme-transition';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode$ = new BehaviorSubject<boolean>(false);
  private isBrowser: boolean;
  private renderer: Renderer2;
  private transitionDuration = 300; // 300ms para todas las transiciones

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    rendererFactory: RendererFactory2
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.renderer = rendererFactory.createRenderer(null, null);

    if (this.isBrowser) {
      // Detectar preferencia del sistema
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      // Intentar leer del localStorage o usar preferencia del sistema
      const storedPreference = this.readFromStorage();
      const initialDarkMode =
        storedPreference !== null ? storedPreference : prefersDark;

      this.darkMode$.next(initialDarkMode);
      this.applyTheme(initialDarkMode);

      // Escuchar cambios en la preferencia del sistema
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          // Solo cambiar automáticamente si no hay preferencia guardada
          if (this.readFromStorage() === null) {
            this.setDark(e.matches);
          }
        });

      // Añadir una regla CSS global para las transiciones
      this.addGlobalTransitionStyles();
    }
  }

  /** Observable para suscribirse a cambios de tema */
  themeChanges(): Observable<boolean> {
    return this.darkMode$.asObservable();
  }

  /** Devuelve estado actual */
  isDark(): boolean {
    return this.darkMode$.value;
  }

  /** Cambia el tema y lo persiste */
  setDark(isDark: boolean): void {
    if (this.isBrowser) {
      // Añadir clase de transición antes del cambio
      document.body.classList.add(TRANSITION_CLASS);

      // Aplicar el cambio después de un pequeño retraso para permitir que la clase de transición se aplique
      setTimeout(() => {
        this.darkMode$.next(isDark);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(isDark));
        this.applyTheme(isDark);

        // Eliminar la clase de transición después de completar la transición
        setTimeout(() => {
          document.body.classList.remove(TRANSITION_CLASS);
        }, this.transitionDuration);
      }, 10);
    }
  }

  /** Inicializa tema guardado en localStorage */
  initTheme(): void {
    if (this.isBrowser) {
      const darkMode = this.readFromStorage();
      if (darkMode !== null) {
        this.setDark(darkMode);
      }
    }
  }

  /** Toggle del tema */
  toggleTheme(): void {
    this.setDark(!this.isDark());
  }

  private readFromStorage(): boolean | null {
    if (!this.isBrowser) return null;

    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  }

  private applyTheme(isDark: boolean) {
    if (!this.isBrowser) return;

    const body = document.body;

    if (isDark) {
      body.classList.add(DARK_MODE_CLASS);
    } else {
      body.classList.remove(DARK_MODE_CLASS);
    }

    // Actualizar meta theme-color para que coincida con el tema
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark ? '#1A2980' : '#2D46B9');
    }
  }

  private addGlobalTransitionStyles() {
    // Crear un elemento de estilo para las transiciones globales
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .theme-transition,
      .theme-transition *,
      .theme-transition *:before,
      .theme-transition *:after {
        transition: all ${this.transitionDuration}ms ease !important;
        transition-delay: 0 !important;
      }
    `;
    document.head.appendChild(styleEl);
  }
}
