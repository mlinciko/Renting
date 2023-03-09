import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-root',
  templateUrl: './auth-root.component.html',
  styleUrls: ['./auth-root.component.scss']
})
export class AuthRootComponent implements OnInit {
  sliderItems = [
    {
      image: "/assets/slider/img01.jpeg",
      title: "Thousands of best real estate at afforble prices",
    },
    {
      image: "/assets/slider/img02.jpeg",
      title: "Book a real estate quickly and easily with one click",
    },
    {
      image: "/assets/slider/img03.jpeg",
      title: "Let's find the real estate that suits you rigth now!",
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
