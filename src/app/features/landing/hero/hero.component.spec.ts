
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../../core/services/theme.service';

declare var AOS: any;

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  private themeSubscription: Subscription | null = null;
  private countAnimationStarted = false;
  private observer: IntersectionObserver | null = null;

  constructor(
    private themeService: ThemeService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.themeChanges().subscribe(() => {
      // Theme has changed, no specific action needed as CSS handles the transitions
    });

    // Initialize AOS (Animate on Scroll) if available
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: false,
        mirror: true,
        offset: 50,
      });
    }
  }

  ngAfterViewInit(): void {
    // Set up intersection observer for stat counting animation
    this.setupStatCounters();
  }

  ngOnDestroy(): void {
    // Unsubscribe from theme changes
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }

    // Disconnect the observer
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupStatCounters(): void {
    const statSection =
      this.elementRef.nativeElement.querySelector('.hero-stats');
    if (!statSection) return;

    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.countAnimationStarted) {
            this.countAnimationStarted = true;
            this.animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    // Start observing the stats section
    this.observer.observe(statSection);
  }

  private animateCounters(): void {
    const statValues =
      this.elementRef.nativeElement.querySelectorAll('.stat-value');

    statValues.forEach((statValue: HTMLElement) => {
      const target = Number.parseInt(
        statValue.getAttribute('data-count') || '0',
        10
      );
      const duration = 2000; // 2 seconds
      const step = Math.ceil(target / (duration / 16)); // 60fps
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current > target) {
          current = target;
        }

        statValue.textContent = current.toLocaleString();

        if (current < target) {
          requestAnimationFrame(updateCounter);
        }
      };

      updateCounter();
    });
  }
}
