import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from './safe.pipe'; 

declare var AOS: any;

interface ValueItem {
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslateModule,SafePipe],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {
  productVideoUrl = 'https://www.youtube.com/embed/24aJ8oQ-BAo';
  teamVideoUrl = 'https://www.youtube.com/embed/ybF8jcCxZ8s';
  
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

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

  // Safe URL pipe for iframes
  safe(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}