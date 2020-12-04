import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponet } from './form.component';

describe('FormComponet', () => {
  let form: FormComponet;
  let fixture: ComponentFixture<FormComponet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FormComponet
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponet);
    form = fixture.componentInstance;
  });

  it('should create the FormComponet', () => {
    expect(form).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(form.bookTiketsForm.valid).toBeFalsy();
  });

  it('name field validation', () => {
    let name = form.bookTiketsForm.controls['nameControl'];

    name.setValue("");
    expect(name.errors?.required).toBeTruthy();

    name.setValue("test");
    expect(name.errors?.pattern).toBeTruthy();

    name.setValue("Пётр");
    expect(name.valid).toBeTruthy();

    name.setValue("Пётр1");
    expect(name.errors?.pattern).toBeTruthy();

    name.setValue("Пётр ");
    expect(name.errors?.pattern).toBeTruthy();

    name.setValue(" ");
    expect(name.errors?.pattern).toBeTruthy();

    name.setValue("Двадцатьсимволовслишкоммного");
    expect(name.errors?.maxlength).toBeTruthy();

    name.setValue("Симолсимволсимволсим");
    expect(name.errors?.maxlength).toBe(undefined);
  });

  it('age field validation', () => {
    let age = form.bookTiketsForm.controls['ageControl'];

    age.setValue("");
    expect(age.errors?.required).toBeTruthy();

    age.setValue("-1");
    expect(age.errors?.min).toBeTruthy();

    age.setValue("0");
    expect(age.valid).toBeTruthy();

    age.setValue("10");
    expect(age.valid).toBeTruthy();
  });

  it('filmControl field validation', () => {
    let film = form.bookTiketsForm.controls['filmControl'];

    film.setValue("");
    expect(film.errors?.required).toBeTruthy();
  });

  it('age control', () => {
    let name = form.bookTiketsForm.controls['nameControl'];
    let age = form.bookTiketsForm.controls['ageControl'];
    let film = form.bookTiketsForm.controls['filmControl'];

    name.setValue("Пётр");
    age.setValue("10");
    film.setValue({ id: 1, title: 'Человек паук', age: 12 });

    form.filmChange();
    form.onSubmit();

    expect(form.showAgeAlert).toBe(true);

    film.setValue({ id: 1, title: 'История игрушек', age: 0 });

    form.filmChange();
    form.onSubmit();

    expect(form.showAgeAlert).toBe(false);
  });

  it('successSend control', () => {
    let name = form.bookTiketsForm.controls['nameControl'];
    let age = form.bookTiketsForm.controls['ageControl'];
    let film = form.bookTiketsForm.controls['filmControl'];

    name.setValue("Пётр");
    age.setValue("10");
    film.setValue({ id: 1, title: 'Человек паук', age: 12 });

    form.filmChange();
    form.onSubmit();

    expect(form.successSend).toBe(false);

    film.setValue({ id: 1, title: 'История игрушек', age: 0 });

    form.filmChange();
    form.onSubmit();

    expect(form.successSend).toBe(true);
  });
});
