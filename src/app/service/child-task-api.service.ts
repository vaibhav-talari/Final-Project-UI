import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { ChildTask } from '../model/child-task';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChildTaskAPIService {
  baseurl:string;

  constructor(private http:Http) {
    this.baseurl="http://localhost:8585/child";
   }

   createChildTask(childTaskData):Observable<ChildTask> {
    console.log(childTaskData);
   return this.http.post(this.baseurl+"/add-child-task",childTaskData)
    //receive responce from REST API
    .pipe(map(response => {
      console.log(response);
      return response.json();
      
        }
      ));
  }

   getAllChildTask():Observable<ChildTask[]>{
      return this.http.get(this.baseurl+"/get-all-child-tasks").pipe(
        map(response=> {
          console.log(response);
          return response.json();
            }
      ));

   }

   getSingleChildTask(id):Observable<ChildTask>{
     console.log(id);
    return this.http.get(this.baseurl+"/get-child-task/"+id)
    .pipe(map(response => {
      console.log(response);
      return response.json();
        }
      ));
  }
  updateChildTask(updatetask):Observable<ChildTask>
      {
        console.log(updatetask);
        console.log(updatetask.childTaskID);
        return this.http.put(this.baseurl+"/edit-child-task/"+updatetask.childTaskID,updatetask)
        .pipe(map(response => {
         console.log(response);
          return response.json();
        }
      ));
      }
}
