import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  items = [
    {
      title: "How to Book Essentials",
      text: `
      When searching, enter your destination, travel dates, and number of guests. 
      You will see all options available for booking. Use the filters to find the right one. 
      With their help, you can, for example, find a whole apartment or rent a common room - 
      depending on your preferences. Further, you may have questions. 
      Accommodation cannot be visited before booking, but all the details of interest can be 
      easily obtained from the owner. Don't forget to ask about amenities, area or location as well.
      No one can answer these questions better than a landlord. 
      They can pre-confirm your booking or send you a special offer to interest you even more.
      `
    },
    {
      title: "How to find the right accommodation",
      text: `
      To make your choice easier, enter your destination (you can specify the area), 
      dates and number of guests. Filter your results by amenities, environment accessibility, 
      or other criteria. That way you can choose the option that's right for you.
      `
    },
    {
      title: "Housing types",
      text: `
      Hosts offer a variety of accommodation options on Airbnb, 
      from shared rooms to private islands. We distinguish 4 groups: 
      whole housing, separate rooms, hotel rooms and common rooms.
      `
    },
    {
      title: "Is the owner not responding?",
      text:`
      In most cases, you will receive a response within a few hours. 
      Delays may be due to time differences or internet problems. 
      While you wait for a response, try contacting other hosts nearby. 
      Important: To avoid double bookings, do not submit more than one request for the same dates.
      `
    },
    {
      title: "Search filters",
      text:`
      Someone just wants to ask the price, while others know exactly what is needed. 
      Filters are a great way to narrow down your search for accommodation.
      Try being flexible with date ranges and accommodation types that suit you.
      `
    }
  ]


}
