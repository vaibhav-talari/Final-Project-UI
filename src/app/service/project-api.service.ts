import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Project } from '../model/project';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChildTask } from '../model/child-task';

@Injectable({
  providedIn: 'root'
})
export class ProjectAPIService {

  baseurl:string;
  constructor(private http:Http) { 
    this.baseurl="http://localhost:8585/project"
  }

  createProject(addproject): Observable<Project> {
    console.log(addproject);
    return this.http.post(this.baseurl + "/add-project", addproject)
      //receive responce from REST API
      .pipe(map(response => {
        console.log(response);
        return response.json();
      }
      ));
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get(this.baseurl + "/get-all-projects").pipe(
      map(response => {
        console.log(response);
        return response.json();
      }
      ));
  }

  deleteProject(id) {
    return this.http.delete(this.baseurl + "/delete-project/" + id)
      .pipe(map(response => {
        console.log(response);
        //return response.json();
      }
      ));
  }

  updateProject(project)  {
    console.log(project);
    console.log(project.projectID);
    return this.http.put(this.baseurl + "/edit-project/" + project.projectID, project)
      .pipe(map(response => {
        console.log(response);
        return response.json();
      }
      ));
  }

  getSingleProject(id){
    console.log(id);
   return this.http.get(this.baseurl+"/get-project/"+id)
   .pipe(map(response => {
     console.log(response);
     return response.json();
       }
     ));
 }

 getTasksForProject(id):Observable<ChildTask[]>{
  console.log(id);
 return this.http.get("http://localhost:8585/child/get-child-task-by-project/"+id)
 .pipe(map(response => {
   console.log(response);
   return response.json();
     }
   ));
}

}
