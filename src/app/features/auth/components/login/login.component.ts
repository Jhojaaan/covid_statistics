import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  private createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public onSubmit() {
    if (this.loginForm.invalid) return console.log('Formulário inválido');
    const { userName, password } = this.loginForm.value;

    this.authService.login(userName, password).subscribe(
      (response: any) => {
        console.log(response, response[0].token);

        localStorage.setItem('token', response[0].token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos'});
      }
    );
  }
}
