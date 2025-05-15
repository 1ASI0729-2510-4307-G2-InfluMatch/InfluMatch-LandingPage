import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../../core/services/theme.service';

interface Step {
  icon: string;
  titleKey: string;
  descKey: string;
}

interface Feature {
  icon: string;
  titleKey: string;
  descKey: string;
}

declare var AOS: any;

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    RouterModule,
  ],
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
})
export class HowItWorksComponent implements OnInit, OnDestroy {
  steps: Step[] = [
    {
      icon: 'person_add',
      titleKey: 'HOW_IT_WORKS.STEP1_TITLE',
      descKey: 'HOW_IT_WORKS.STEP1_DESC',
    },
    {
      icon: 'search',
      titleKey: 'HOW_IT_WORKS.STEP2_TITLE',
      descKey: 'HOW_IT_WORKS.STEP2_DESC',
    },
    {
      icon: 'chat',
      titleKey: 'HOW_IT_WORKS.STEP3_TITLE',
      descKey: 'HOW_IT_WORKS.STEP3_DESC',
    },
    {
      icon: 'trending_up',
      titleKey: 'HOW_IT_WORKS.STEP4_TITLE',
      descKey: 'HOW_IT_WORKS.STEP4_DESC',
    },
  ];

  features: Feature[] = [
    {
      icon: 'verified_user',
      titleKey: 'HOW_IT_WORKS.FEATURE1_TITLE',
      descKey: 'HOW_IT_WORKS.FEATURE1_DESC',
    },
    {
      icon: 'speed',
      titleKey: 'HOW_IT_WORKS.FEATURE2_TITLE',
      descKey: 'HOW_IT_WORKS.FEATURE2_DESC',
    },
    {
      icon: 'insights',
      titleKey: 'HOW_IT_WORKS.FEATURE3_TITLE',
      descKey: 'HOW_IT_WORKS.FEATURE3_DESC',
    },
    {
      icon: 'support_agent',
      titleKey: 'HOW_IT_WORKS.FEATURE4_TITLE',
      descKey: 'HOW_IT_WORKS.FEATURE4_DESC',
    },
  ];

  private themeSubscription: Subscription | null = null;
  isDarkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeSubscription = this.themeService
      .themeChanges()
      .subscribe((isDark) => {
        this.isDarkMode = isDark;
      });

    // Initialize AOS (Animate on Scroll) if available
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
      });
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from theme changes
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
