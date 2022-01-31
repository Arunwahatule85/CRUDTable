import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../book.service';
import { IBookModule } from '../book/book.module';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  bookData: IBookModule = new IBookModule();
  bookvalues! : FormGroup
  listofBook: IBookModule;
  editauthor: any;
  edittitle: any;
  editprice: any;
  previousbook: any;
  hideMainPage: boolean = false;
  constructor(private bookservice:BookService, private formBuilder:FormBuilder, private route: ActivatedRoute,
    private router: Router, private ngtoaster:ToastrService) { }

  ngOnInit(): void {
    this.hideMainPage = false;
    this.bookvalues = this.formBuilder.group({
      title: null,
      author: null,
      price: null,
  });
  this.getAllBook();
  }

  addBook()
  {

    this.bookData.title = this.bookvalues.value.title;
    this.bookData.author = this.bookvalues.value.author;
    this.bookData.price = this.bookvalues.value.price;
    this.bookData.editable = false;
    if(this.bookData.title || this.bookData.author || this.bookData.price)
    {
      this.bookservice.insertBook(this.bookData).subscribe(result => {
        try 
        {
           this.getAllBook();
           this.bookvalues.reset();
           this.ngtoaster.success("Book Added Successfully");
        }
        catch (ex) {
        
            console.log("Error occurred while adding book:", ex)
        }
        finally {
        }
    },
        err => {
            console.log("Error occurred while adding book", err); 
        });
    }
    else
    {
      this.ngtoaster.warning("Title, Author, Price can not be empty");
    }
       
  }

  getAllBook()
  {
    this.bookservice.getAllbook().subscribe(res=>
      {
        try 
        {
          this.listofBook = res;
        }
        catch (ex) {
        
            console.log("Error occurred while fetching book:", ex)
        }
        finally {
        }
    },
        err => {
            console.log("Error occurred while fetching book", err); 
        });
  }

  editBook(value)
  {
     if(this.previousbook !=value)
     {
       if(this.previousbook)
       {
        this.previousbook.editable = false;
       }
     }
     this.editauthor= value.author;
     this.edittitle= value.title;
     this.editprice= value.price;
     value.editable = ! value.editable;
     this.previousbook = value;
  }
  saveBook(book)
  {
    if(this.bookvalues.value.title)
    {
      this.bookData.title = this.bookvalues.value.title;
    }
    else
    {
       this.bookData.title = book.title
    }
    if(this.bookvalues.value.author)
    {
      this.bookData.author = this.bookvalues.value.author;
    }
    else
    {
       this.bookData.author = book.author
    }
    if(this.bookvalues.value.price)
    {
      this.bookData.price = this.bookvalues.value.price;
    }
    else
    {
       this.bookData.price = book.price
    }
    this.bookservice.updateBook(this.bookData,book.id).subscribe(res=>
      {
        try 
        {
          this.getAllBook();
          this.ngtoaster.success("Book updated Successfully");
          this.bookvalues.reset();
        }
        catch (ex) {
        
            console.log("Error occurred while editing book:", ex)
        }
        finally {
        }
    },
        err => {
            console.log("Error occurred while editing book", err); 
      });
  }

  deleteBook(book)
  {
    this.bookservice.deleteBook(book).subscribe(res=>
      {    
        try 
        {
          this.ngtoaster.error("Book deleted Successfully");
          this.getAllBook();
        }
        catch (ex) {
        
            console.log("Error occurred while deleting book:", ex)
        }
        finally {
        }
    },
        err => {
            console.log("Error occurred while deleting book", err); 
      });
  }


  viewbook(book)
  {
    this.hideMainPage= true;
    this.router.navigate(['view'],  { state: book });
  }

}
