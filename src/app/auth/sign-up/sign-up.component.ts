import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/shared/services';

function isInvalid(control: AbstractControl): boolean {
  return control.invalid && control.touched
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {

  form = this.fb.group({
    name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(new RegExp(`^(?=.*[a-z])(?=.*[0-9]).{8}`))
    ]],
    confirmPassword: [null, [
      Validators.required,
      this.checkPasswords()
    ]]
  });

  unsuccessful: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form.controls.email.valueChanges
      .subscribe(() => this.unsuccessful = false)
  }

  get emailError(): string | undefined {
    const email = this.form.controls.email;

    if (email?.errors?.['required']) {
      return 'Email is required';
    }
    if (email?.errors?.['email']) {
      return 'Invalid email address format';
    }
    if (this.unsuccessful) {
      return 'The email address is already in use'
    }
    return undefined;
  }

  get passwordError(): string | undefined {
    const password = this.form.controls.password;

    if (password?.errors?.['required']) {
      return 'Password is required';
    }
    if (password?.errors?.['minlength']) {
      return 'The password should be at least 8 characters long';
    }
    if (password?.errors?.['pattern']) {
      return `The password should contain letters and numbers`;
    }
    return undefined;
  }

  getIsInvalid(controlName: string): boolean {
    return isInvalid(this.form.get(controlName)!);
  }

  checkPasswords(): ValidatorFn {
    return (): ValidationErrors | null => {
      const data = this.form?.getRawValue();

      if (!data) return null;

      return data.password === data.confirmPassword ? null : { match: true }
    }
  }

  signup() {
    const { email, name, password } = this.form.getRawValue();
    this.authService.signup$(email, name, password)
      .subscribe(
        () => {
          this.form.controls.password.reset();
          this.form.controls.confirmPassword.reset();
        },
        () => this.unsuccessful = true
      );
  }

}
