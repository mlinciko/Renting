import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  contacts = [
    {
      title: "Facebook",
      icon: "../../../../../assets/icons/Facebook.svg"
    },
    {
      title: "Instagram",
      icon: "../../../../../assets/icons/Instagram.svg"
    },
    {
      title: "LinkedIn",
      icon: "../../../../../assets/icons/Linkedin.svg"
    },
    {
      title: "Twitter",
      icon: "../../../../../assets/icons/Twitter.svg"
    }
  ]

}
