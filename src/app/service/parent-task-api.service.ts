import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { ParentTask } from '../model/parent-task';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParentTaskAPIService {

  baseurl:string;

  constructor(private http:Http) {
    this.baseurl="http://localhost:8585/parent";
   }

  createParentTask(parentTask):Observable<ParentTask> {
    console.log(parentTask);
   return this.http.post(this.baseurl+"/add-parent-task",parentTask)
    //receive responce from REST API
    .pipe(map(response => {
      console.log(response);
      return response.json();
      
        }
      ));
  }
   getAllParentTasks():Observable<ParentTask[]>{
      return this.http.get(this.baseurl+"/get-all-parent-tasks").pipe(
        map(response=> {
          console.log(response);
          return response.json();
            }
      ));

   }
}
