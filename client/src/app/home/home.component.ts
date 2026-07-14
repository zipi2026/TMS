import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { IHomeData } from '../model/IHomeData';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  router = inject(Router);

  showContact = false;
  showTech = false;

  home: IHomeData = {
    title: 'שלום, אני ציפי — מפתחת פולסטאק',
    text: 'אני מתמחה בבניית אפליקציות ווב מודרניות, עם ניסיון עשיר גם בצד הלקוח וגם בצד השרת. אני מלווה פרויקטים משלב האפיון ועד להשקה — באהבה, במקצועיות ובתשומת לב לפרטים הקטנים.',
    phone: '0548523435',
    contactEmail: 'k0548523435@gmail.com',
    techStack: ['Angular 19', 'Node.js', 'TypeScript', 'MongoDB', 'SQL', 'HTML', 'CSS', 'Docker', 'Git'],
    img: 'img/img.jpg',
    but: 'יצירת קשר',
    but2: 'קורות חיים',
    but3: 'פרוייקט לדוגמא'
  };

  toggleContact(): void {
    this.showContact = !this.showContact;
  }

  toggleTech(): void {
    this.showTech = !this.showTech;
  }

  downloadCV(): void {
    fetch('assets/tzipi-cv.pdf')
      .then(res => {
        if (!res.ok) throw new Error('הקובץ לא נמצא');
        return res.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'הגשת מועמדות - צפורה כץ.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(() => {
        // Fallback: open in new tab
        window.open('assets/tzipi-cv.pdf', '_blank');
      });
  }

  goToLogin(): void {
    this.router.navigate(['/main']);
  }
}
