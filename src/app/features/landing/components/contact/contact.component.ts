import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

interface SubjectOption {
  value: string;
  label: string;
}

interface FAQ {
  questionKey: string;
  answerKey: string;
  isOpen: boolean;
}

declare var AOS: any;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, AfterViewInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  formStatus: 'idle' | 'success' | 'error' = 'idle';
  subjectOptions: SubjectOption[] = [];
  faqs: FAQ[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.initSubjectOptions();
    this.initializeFaqs();
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

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['general', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  private initSubjectOptions(): void {
    this.subjectOptions = [
      { value: 'general', label: 'CONTACT.SUBJECT_GENERAL' },
      { value: 'support', label: 'CONTACT.SUBJECT_SUPPORT' },
      { value: 'sales', label: 'CONTACT.SUBJECT_SALES' },
      { value: 'partnership', label: 'CONTACT.SUBJECT_PARTNERSHIP' },
    ];
  }

  private initializeFaqs(): void {
    this.faqs = [
      {
        questionKey: 'CONTACT.FAQ1_QUESTION',
        answerKey: 'CONTACT.FAQ1_ANSWER',
        isOpen: false,
      },
      {
        questionKey: 'CONTACT.FAQ2_QUESTION',
        answerKey: 'CONTACT.FAQ2_ANSWER',
        isOpen: false,
      },
      {
        questionKey: 'CONTACT.FAQ3_QUESTION',
        answerKey: 'CONTACT.FAQ3_ANSWER',
        isOpen: false,
      },
      {
        questionKey: 'CONTACT.FAQ4_QUESTION',
        answerKey: 'CONTACT.FAQ4_ANSWER',
        isOpen: false,
      },
    ];
  }
  readonly appUrl = 'https://www.facebook.com';

   openApp(): void {
    window.open(this.appUrl, '_blank');
  }
  readonly appUrl1 = 'https://x.com/?lang=es';

   openApp1(): void {
    window.open(this.appUrl1, '_blank');
  }
    readonly appUrl2 = 'https://www.instagram.com/';

   openApp2(): void {
    window.open(this.appUrl2, '_blank');
  }
      readonly appUrl3 = 'https://www.linkedin.com/feed/';

   openApp3(): void {
    window.open(this.appUrl3, '_blank');
  }

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.formStatus = 'idle';

      // Simulación de envío a API
      setTimeout(() => {
        // Simulamos un 90% de éxito
        const success = Math.random() > 0.1;

        if (success) {
          this.formStatus = 'success';
          this.contactForm.reset();
          // Restauramos el valor por defecto del subject
          this.contactForm.patchValue({ subject: 'general' });
        } else {
          this.formStatus = 'error';
        }

        this.isSubmitting = false;
      }, 1500);
    }
  }
}
