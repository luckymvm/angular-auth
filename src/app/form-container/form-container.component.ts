import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit{
  @Input() type: 'signin' | 'signup' = 'signin';
  title: string | undefined;

  ngOnInit() {
    this.title = this.type === 'signin' ? 'Log in' : 'Sign Up';
  }
}
