import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {
  hideviewpage: boolean =false;
  bookdata: any;
  url:string ="http://localhost:4200/";
  constructor(  private router: Router, ) {
    this.bookdata = this.router.getCurrentNavigation().extras.state;
   }
  ngOnInit(): void {

    console.log("&&&",this.bookdata);

  }

  

  goback()
  {
   
    this.router.navigate(['home'],{ replaceUrl: true });
    this.router.navigate([]).then(result => { window.open(this.url, '_self'); })//better to avoid duplicate routing
    
  }

}
