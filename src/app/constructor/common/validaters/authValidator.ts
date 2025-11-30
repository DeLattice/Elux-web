import {FormControl} from "@angular/forms";

export const authValidator = {
  getPasswordFieldErrorMessage(password: FormControl) {
    if (password.hasError('required')) {
      return 'Это обязательное поле';
    }
    if (password.hasError('minlength')) {
      return 'Длина от 6 до 32 символов';
    }
    if (password.hasError('pattern')) {
      return 'Требуется символ верхнего регистра';
    }
    return password.hasError('invalid') ? 'Некорректный пароль' : '';
  },

  getEmailFieldErrorMessage(email: FormControl) {
    if (email.hasError('required')) {
      return 'Вы должны ввести Email';
    }
    if (email.hasError('pattern')) {
      return 'Некорректный Email. Пример example@gmail.com';
    }
    return email.hasError('invalid') ? 'Некорректный Email' : '';
  },

  getLoginFieldErrorMessage(login: FormControl) {
    if (login.hasError('required')) {
      return 'Вы должны ввести логин или Email';
    }
    if (login.hasError('minlength')) {
      return 'Длина от 3 до 16 символов';
    }
    if (login.hasError('pattern')) {
      return 'Некорректный Email или Имя пользователя';
    }
    return login.hasError('invalid') ? 'Некорректный Email или Имя пользователя' : '';
  }
}
