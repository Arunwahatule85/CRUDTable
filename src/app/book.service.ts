import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; 
import { IBookModule } from './book/book.module';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor( private http: HttpClient) { }

  //addbook post method

  insertBook(data:any)
  {
    return this.http.post<any>("http://localhost:3000/posts",data).pipe(map(res =>
    {
      return res;
    }));
  }

  getAllbook()
  {
    return this.http.get<IBookModule>("http://localhost:3000/posts").pipe(map(res =>
    {
      return res;
    }));
  }

  deleteBook(book:any)
  {
    return this.http.delete<any>("http://localhost:3000/posts/"+book.id).pipe(map(res =>
    {
      return res;
    }));
  }

  updateBook(book:any,id:any)
  {
    return this.http.put<any>("http://localhost:3000/posts/"+id,book).pipe(map(res =>
    {
      return res;
    }));
  }
}
