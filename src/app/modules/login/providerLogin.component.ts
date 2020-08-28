import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-providerLogin',
  templateUrl: './providerLogin.component.html',
  styleUrls: ['./providerLogin.component.css']
})
export class ProviderLoginComponent implements OnInit {
  constructor(private router: Router) {}

  loginMode = 'providerLogin'
  
  ngOnInit() {
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

}
