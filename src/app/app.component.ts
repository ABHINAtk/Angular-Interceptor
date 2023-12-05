import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  myForm: FormGroup;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.myForm = this.fb.group({
      title: ['Test Title'],
      body: ['Test Body']
    });
  }

  onSubmit() {
    const formData = this.myForm.value;

    this.http.post('https://jsonplaceholder.typicode.com/posts', formData)
      .subscribe(response => {
        console.log('Post success:', response);
        this.successMessage = 'User created successfully!';
        this.myForm.reset();
      }, error => {
        console.error('Post error:', error);
      });
  }
}

