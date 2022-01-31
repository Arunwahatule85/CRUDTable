import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BookService } from './book.service';
import { IBookModule } from './book/book.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TableCrud';

  hideMainPage:boolean=false
  constructor() {
    
   }
   ngOnInit()
    {
      
    }
  
}

