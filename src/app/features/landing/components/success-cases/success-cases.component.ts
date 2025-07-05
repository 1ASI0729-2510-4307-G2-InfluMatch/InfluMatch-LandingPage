import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

interface Stat {
  value: string;
  label: string;
}

interface SuccessCase {
  id: string;
  titleKey: string;
  categoryKey: string;
  image: string;
  descKey: string;
  stats: Stat[];
}

interface Brand {
  name: string;
  logo: string;
}

declare var AOS: any;

@Component({
  selector: 'app-success-cases',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    RouterModule,
  ],
  
  templateUrl: './success-cases.component.html',
  styleUrls: ['./success-cases.component.scss'],
})
export class SuccessCasesComponent implements OnInit, AfterViewInit {
  cases: SuccessCase[] = [];
  brands: Brand[] = [];
  readonly appUrl = 'https://happy-stone-091814410.6.azurestaticapps.net/';

   openApp(): void {
    window.open(this.appUrl, '_blank');
  }
  ngOnInit(): void {
    this.initializeCases();
    this.initializeBrands();
  }

  ngAfterViewInit(): void {
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
  
  private initializeCases(): void {
    this.cases = [
      {
        id: 'case1',
        titleKey: 'SUCCESS_CASES.CASE1_TITLE',
        categoryKey: 'SUCCESS_CASES.CATEGORY_FASHION',
        image: '../../../../../assets/images/case1.png',
        descKey: 'SUCCESS_CASES.CASE1_DESC',
        stats: [
          { value: '+150%', label: 'SUCCESS_CASES.GROWTH' },
          { value: '2.5M', label: 'SUCCESS_CASES.REACH' },
          { value: '3.2x', label: 'SUCCESS_CASES.ROI' },
        ],
      },
      {
        id: 'case2',
        titleKey: 'SUCCESS_CASES.CASE2_TITLE',
        categoryKey: 'SUCCESS_CASES.CATEGORY_BEAUTY',
        image: '../../../../../assets/images/case2.png',
        descKey: 'SUCCESS_CASES.CASE2_DESC',
        stats: [
          { value: '1M+', label: 'SUCCESS_CASES.FOLLOWERS' },
          { value: '14', label: 'SUCCESS_CASES.DAYS' },
          { value: '8.7%', label: 'SUCCESS_CASES.ENGAGEMENT' },
        ],
      },
      {
        id: 'case3',
        titleKey: 'SUCCESS_CASES.CASE3_TITLE',
        categoryKey: 'SUCCESS_CASES.CATEGORY_TECH',
        image: '../../../../../assets/images/case3.png',
        descKey: 'SUCCESS_CASES.CASE3_DESC',
        stats: [
          { value: '24h', label: 'SUCCESS_CASES.SOLD_OUT' },
          { value: '12', label: 'SUCCESS_CASES.INFLUENCERS' },
          { value: '4.5x', label: 'SUCCESS_CASES.ROI' },
        ],
      },
    ];
  }

  private initializeBrands(): void {
    this.brands = [
      { name: 'Brand 1', logo: 'assets/images/brand1.png' },
      { name: 'Brand 2', logo: 'assets/images/brand2.png' },
      { name: 'Brand 3', logo: 'assets/images/brand3.png' },
      { name: 'Brand 4', logo: 'assets/images/brand4.png' },
      { name: 'Brand 5', logo: 'assets/images/brand5.png' },
      { name: 'Brand 6', logo: 'assets/images/brand6.png' },
    ];
  }
}
