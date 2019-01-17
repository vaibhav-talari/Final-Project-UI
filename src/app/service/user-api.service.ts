import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {
  baseurl: string;
  constructor(private http: Http) {
    this.baseurl = "http://localhost:8585/user";
  }

  createUser(addUser): Observable<User> {
    console.log(addUser);
    return this.http.post(this.baseurl + "/add-user", addUser)
      //receive responce from REST API
      .pipe(map(response => {
        console.log(response);
        return response.json();
      }
      ));
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get(this.baseurl + "/get-all-users").pipe(
      map(response => {
        console.log(response);
        return response.json();
      }
      ));
  }

  deleteUser(id) {
    return this.http.delete(this.baseurl + "/delete-user/" + id)
      .pipe(map(response => {
        console.log(response);
        //return response.json();
      }
      ));
  }

  updateUser(user)  {
    console.log(user);
    console.log(user.userID);
    return this.http.put(this.baseurl + "/edit-user/" + user.userID, user)
      .pipe(map(response => {
        console.log(response);
        return response.json();
      }
      ));
  }
}
