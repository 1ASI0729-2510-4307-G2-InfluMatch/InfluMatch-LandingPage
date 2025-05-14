import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  currentYear: number = new Date().getFullYear();
  currentLang = 'en';
  isDark = false;
  private themeSubscription: Subscription | null = null;
  private langSubscription: Subscription | null = null;

  constructor(
    private themeService: ThemeService,
    private translate: TranslateService
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

  changeLang(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
  }
}
