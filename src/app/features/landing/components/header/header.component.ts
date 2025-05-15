import {
  Component,
  OnInit,
  HostListener,
  Inject,
  OnDestroy,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../../core/services/theme.service';

interface NavItem {
  label: string;
  route: string;
  section: string;
  exact: boolean;
  icon?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isDark = false;
  isScrolled = false;
  isMobileMenuOpen = false;
  currentLang = 'en';
  private themeSubscription: Subscription | null = null;
  private langSubscription: Subscription | null = null;

  navItems: NavItem[] = [
    {
      label: 'HEADER.HOME',
      route: '/',
      section: 'home',
      exact: true,
      icon: 'home',
    },
    {
      label: 'HEADER.HOW_IT_WORKS',
      route: '/',
      section: 'how-it-works',
      exact: false,
      icon: 'help_outline',
    },
    {
      label: 'HEADER.SUCCESS_CASES',
      route: '/',
      section: 'success-cases',
      exact: false,
      icon: 'star_outline',
    },
    {
      label: 'HEADER.PLANS',
      route: '/',
      section: 'plans',
      exact: false,
      icon: 'payments',
    },
    {
      label: 'HEADER.CONTACT',
      route: '/',
      section: 'contact',
      exact: false,
      icon: 'mail_outline',
    },
  ];

  constructor(
    private themeService: ThemeService,
    public translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // Initialize theme state
    this.isDark = this.themeService.isDark();
    this.themeSubscription = this.themeService
      .themeChanges()
      .subscribe((isDark) => {
        this.isDark = isDark;
      });

    // Initialize language state
    this.currentLang = this.translate.currentLang || 'en';
    this.langSubscription = this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });

    this.checkScroll();
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  @HostListener('window:scroll', [])
  checkScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.themeService.setDark(this.isDark);
  }

  changeLang(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    // Prevent scrolling when mobile menu is open
    if (this.isMobileMenuOpen) {
      this.document.body.classList.add('no-scroll');
    } else {
      this.document.body.classList.remove('no-scroll');
    }
  }

  scrollToSection(sectionId: string): void {
    const element = this.document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  mobileNavClick(sectionId: string): void {
    this.toggleMobileMenu();
    setTimeout(() => {
      this.scrollToSection(sectionId);
    }, 300);
  }
}
