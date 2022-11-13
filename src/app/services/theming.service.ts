import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {
  // მასივი, სადაც ყველა თემის სიაა
  themes = ["light-theme", "dark-theme"];

  // აქტიური თემა. თავიდან ითვლება, რომ აქტიური თემა არის ნათელი თემა.
  theme = new BehaviorSubject('light-theme');

  constructor(private ref: ApplicationRef) {

    // ხდება შემოწმება user რომელ თემას ანიჭებს უპირატესობას: Light თუ Dark: ნათელს თუ ბნელს.
    let darkModeOn: boolean =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    // თუ ბნელი თემაა შერჩეული, აქტიური თემა იცვლება და ხდება "dark-theme".
    // ეს ცვლილება გადაეცემა ყველა იმ დამკვირვებელს Observer-ს, რომელიც აკვირდება აპლიკაციის აქტიურ თემას
    if (darkModeOn) {
      this.theme.next('dark-theme');
    }

    // ამით ხდება მთელი აპლიკაციისთვის მინიშნება, რომ რელოადი გაკეთდეს სტილების, რომ ახალი თემა აისახოს ვიზუალურად
    this.ref.tick();

    // აქ ვაკვირდებით იმის ცვლილებას, user რომელ თემას ანიჭებს უპირატესობას. ანუ ჯერ შეიძლება უპირატესობას ანიჭებდეს ნათელ თემას 
    // და მერე აპლიკაციის მსვლელობისას უპირატესობა ბნელ თემას მიანიჭოს. 
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', e => {
      this.theme.next(e.matches ? 'dark-theme' : 'light-theme');
      this.ref.tick();
    });

    // უბრალოდ ხდება შემოწმება რამდენად კარგად მუშაობს თემების გადართვა
    this.disco();
  }

  private disco() {
    if(this.theme.value === 'light-theme') {
      this.theme.next('dark-theme');
    } else {
      this.theme.next('light-theme');
    }
    this.ref.tick();
    setTimeout(() => {
      this.disco();
    }, 5000);
  }
}
