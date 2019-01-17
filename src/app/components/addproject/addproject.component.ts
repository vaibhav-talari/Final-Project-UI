import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common'

import { UserAPIService } from 'src/app/service/user-api.service';
import { User } from 'src/app/model/user';
import { Project } from 'src/app/model/project';
import { ProjectAPIService } from 'src/app/service/project-api.service';
import { Router } from '@angular/router';
import { ChildTask } from 'src/app/model/child-task';
import { DateChecker } from './validator';


declare var $: any;

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  addProjectForm: FormGroup;
  actualProject: Project[];
  submitted: boolean = false;
  userFilter: any = { projectName: '' };
  isProjectSaved: boolean = false;
  onClickisUpdated: boolean = false;
  isUpdated: boolean = false;
  isDisabled: boolean = true;
  isSuspended: boolean = false;
  order: string = 'type';
  actualUser: User[];

  TasksFromProject: ChildTask[];

  selectedValue: Object = {};
  startdate = Date.now();
  enddate = new Date().setDate(new Date().getDate() + 1);
  error:any={isError:false,errorMessage:''};


  constructor(private auto:Router,public datepipe: DatePipe, private formBuilder: FormBuilder, private userAPI: UserAPIService, private projectAPI: ProjectAPIService) {
    this.actualUser = [];
    this.actualProject = [];
  }
  ngOnInit() {
    this.userAPI.getAllUsers().subscribe(
      userdata => {
        this.actualUser = userdata;
      });
    this.projectAPI.getAllProjects().subscribe(
      projectdata => {
        this.actualProject = projectdata;
      });
    
      this.addProjectForm = this.formBuilder.group({
        projectName: ['', Validators.required],
        projectStartDate: [{ value: '', disabled: this.isDisabled }],
        projectEndDate: [{ value: '', disabled: this.isDisabled },Validators.compose([DateChecker])],
        projectPriority: ['1', Validators.required],
        suspend: ['false'],
        setdate: [''],
        user: [null, Validators.required],
      });
    }
  

  get projecterror() { return this.addProjectForm.controls }

  AddProject() {
    this.submitted = true;
    console.log(this.onClickisUpdated);
    if (this.addProjectForm.invalid) {
      console.log(this.onClickisUpdated);
      return;
    } else {
      if (!this.onClickisUpdated) {
        if (this.isDisabled) {
          this.addProjectForm.patchValue({setdate: false });
          console.log(this.addProjectForm.value);
          this.projectAPI.createProject(this.addProjectForm.value).subscribe(
            (project: any) => {
              console.log(project);
              this.isProjectSaved = true;
              this.ngOnInit();
            });
        } else {
          this.addProjectForm.patchValue({ setdate: true});
          console.log(this.addProjectForm.value);
          this.projectAPI.createProject(this.addProjectForm.value).subscribe(
            (project: any) => {
              console.log(project);
              this.isProjectSaved = true;
              this.ngOnInit();
            });
        }
      } else {
        console.log(this.addProjectForm.value);
        this.projectAPI.updateProject(this.addProjectForm.value).subscribe(
          (project: any) => {
            console.log(project);
            this.isUpdated = true;
            this.ngOnInit();
          });
      }
    }
  }

  triggerSomeEvent() {
    if (this.isDisabled) {
      this.isDisabled = !this.isDisabled;
      this.addProjectForm.get('projectStartDate').enable();
      this.addProjectForm.get('projectEndDate').enable();
      console.log("disable-" + this.isDisabled);
    } else {
      this.isDisabled = !this.isDisabled;
      this.addProjectForm.get('projectStartDate').disable();
      this.addProjectForm.get('projectEndDate').disable();
      this.addProjectForm.controls['projectStartDate'].setValue(this.datepipe.transform(this.startdate, 'yyyy-MM-dd'));
      this.addProjectForm.controls['projectEndDate'].setValue(this.datepipe.transform(this.enddate, 'yyyy-MM-dd'));
      console.log("disable-" + this.isDisabled);
    }
    return;
  }

  loadUsers() {
    $('#modal').modal('show');
  }

  selectedvalue(user) {
    // console.log(user);
    $('#modal').modal('hide');
    this.selectedValue = user;
    this.addProjectForm.patchValue({user: this.selectedValue });
    console.log(this.addProjectForm.value);
  }

  setOrder(value: string) {
    console.log(value);
    this.order = value;
  }

  onClickUpdateProject(project) {
    this.addProjectForm = this.formBuilder.group({
      projectID: [project.projectID],
      projectName: [project.projectName],
      projectStartDate: [project.projectStartDate],
      projectEndDate: [project.projectEndDate],
      projectPriority: [project.projectPriority],
      suspend: [project.suspend],
      setdate: [project.setdate],
      user: [project.user],
    });
    this.onClickisUpdated = true;
  }
  SuspendProject(id) {
    this.projectAPI.getSingleProject(id)
      .subscribe((project) => {
        console.log(project);
        this.addProjectForm = this.formBuilder.group({
          projectID: [project.projectID],
          projectName: [project.projectName],
          projectStartDate: [project.projectStartDate],
          projectEndDate: [project.projectEndDate],
          projectPriority: [project.projectPriority],
          suspend: [true],
          setdate: [project.setdate],
          user: [project.user],
        });
        console.log(this.addProjectForm.value);
        this.projectAPI.updateProject(this.addProjectForm.value)
          .subscribe((resp) => {
            console.log(resp);
          });
          this.isSuspended = true;
      });
      setTimeout(()=>{
        this.auto.navigate(['']);
         },1000);
  }

 loadTask(id){
  this.projectAPI.getTasksForProject(id)
  .subscribe((tasks)=>{
    console.log(tasks);
    this.TasksFromProject=tasks;
    $('#taskModel').modal('show');
    });
 }

}
