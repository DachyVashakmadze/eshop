import { Component, HostBinding } from "@angular/core";
import { ThemingService } from "../services/theming.service";

@Component({
    template: ''
})
export abstract class ThemeableComponent {
    // ამის საშუალებით შესაძლებელია მარტივად app-root HTML ელემენტს მივანიჭოთ კონკრეტული კლასი
    @HostBinding('class') cssThemeClass!: string;

    constructor(protected themingService: ThemingService) {
        this.watchTheme();
    }

    /* აქ ხდება დაკვირვება აპლიკაციის როგორც მიმდინარე თემაზე, ასევე ამ თემის ცვლილებაზე.
     this.themingService.theme არის subject, რაც იმას ნიშნავს, რომ როდესაც .subscribe-ს გამოვიძახებთ,
     აუცილებლად მივიღებთ პირველ რიგში აქტიურ თემას. და თუ ეს აქტიური თემა შეიცვალა, მაგ ცვლილებასაც გავიგებთ.
     აქტიური თემის ცვლილებას ThemingService აფიქსირებს და ყველა დამკვირვებელს - Observer-ს აგებინებს ამის შესახებ
     */
    protected watchTheme(): void {
        this.themingService.theme.subscribe(theme => this.applyTheme(theme));
    }

    // აქ ხდება უშუალოდ თემის გააქტიურება კონკრეტული კომპონენტისთვის
    protected applyTheme(theme: string): void {
        this.cssThemeClass = theme;
    }
}