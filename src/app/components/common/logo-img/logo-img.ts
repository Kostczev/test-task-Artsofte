import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo-img',
  imports: [],
  templateUrl: './logo-img.html',
  styleUrl: './logo-img.scss'
})
export class LogoImg {
  @Input({required: true}) logo!: string;
  @Input({required: true}) businessName!: string;

  imageLoaded = false;
  imageError = false;

  onImageLoad() {
    this.imageLoaded = true;
  }

  onImageError() {
    this.imageError = true;
    this.imageLoaded = true;
  }

  getInitials(): string {
    const businessName = this.businessName || '';
    const uppercaseLetters = businessName.match(/[A-ZА-Я]/g);
    return uppercaseLetters ? uppercaseLetters.join('').slice(0, 4) : 'Logo';
  }
}
