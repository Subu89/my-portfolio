import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  

  contactForm: FormGroup;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.contactForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private fb: FormBuilder, private alertify: AlertifyService, private http: HttpClient, private router: Router, private contact: ContactService) { }

  ngOnInit() {
    this.createEmailForm();
  }

  createEmailForm() {
    this.contactForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.pattern('[ a-zA-Z-_\.\'’‘]*')]],
        email: ['', [Validators.required, Validators.email]],
        message: ['', Validators.required]
      }
    );
  }

  emailForm(formData) {
    // formData.append('name', this.contactForm.get('name').value);
    // formData.append('email', this.contactForm.get('email').value);
    // formData.append('message', this.contactForm.get('message').value);

    this.contact.postMessage(formData).subscribe
      (response => {
        this.router.navigate(['/thankYou']);
        this.contactForm.reset();
        console.log(response)
      },
      error => {
        console.warn(error.responseText)
        console.log({ error })
      }
        // (res) => {
        //   this.alertify.success('Your Submission Has Been Sent!');
        //   console.log('Sucess: ' + res);
          
        //
        // },
        // (err) => {
        //   console.log('Error: ' + err);
        //   this.alertify.error('Something went wrong, please try again later.');
        // }
      );
  }

}
