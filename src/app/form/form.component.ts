import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        height: '0',
        padding: '0',
        opacity: 0,
      })),
      transition('open <=> closed', [
        animate('0.4s ease-out')
      ]),
    ]),
  ]
})

export class FormComponet {
  films = [
    { id: 1, title: 'История игрушек', age: 0 },
    { id: 1, title: 'Человек паук', age: 12 },
  ];

  minAge = 0;
  showAgeAlert = false;
  successSend = false;

  requiredAlertText = 'Это обязательное поле для заполнения';

  bookTiketsForm: FormGroup = new FormGroup({
    nameControl: new FormControl('',
      [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(/^[а-яА-ЯёЁ]+$/),
      ]
    ),
    ageControl: new FormControl('',
      [
        Validators.required,
        Validators.min(0)
      ]
    ),
    filmControl: new FormControl('',
      [
        Validators.required
      ]
    ),
  });

  checkFilmAgeAlert() {
    if (this.showAgeAlert) this.showAgeAlert = false;
  }

  filmChange() {
    this.minAge = this.bookTiketsForm.get('filmControl')?.value.age;
    this.checkFilmAgeAlert();
  }

  get nameControl() {
    return this.bookTiketsForm.get('nameControl');
  }

  get ageControl() {
    return this.bookTiketsForm.get('ageControl');
  }

  get filmControl() {
    return this.bookTiketsForm.get('filmControl');
  }

  onSubmit() {
    if (this.ageControl?.value < this.minAge) {
      this.showAgeAlert = true;
    } else {
      this.checkFilmAgeAlert();
      console.log(this.bookTiketsForm.value);
      this.successSend = true;
    }
  }
}
