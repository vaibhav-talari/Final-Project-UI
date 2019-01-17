import { Component, OnInit } from '@angular/core';
import { ChildTaskAPIService } from 'src/app/service/child-task-api.service';
import { ChildTask } from 'src/app/model/child-task';
import { ProjectAPIService } from 'src/app/service/project-api.service';
import { UserAPIService } from 'src/app/service/user-api.service';
import { ParentTaskAPIService } from 'src/app/service/parent-task-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParentTask } from 'src/app/model/parent-task';
import { User } from 'src/app/model/user';
import { Project } from 'src/app/model/project';
import { DateChecker } from './validator';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  addTaskForm: FormGroup;
  addParentTaskForm: FormGroup;
  childTask: ChildTask[];
  parentTask: ParentTask[];
  selectedParentTask: ParentTask;
  users: User[];
  selectedUser: User;
  projects: Project[];
  selectedProject: Project;
  isDisabled: boolean = false;
  startDate = Date.now();
  endDate = new Date().setDate(new Date().getDate() + 1);
  submitted: boolean = false;
  userFilter: any = { childTaskName: '' };
  order: string = 'type';
  isChildTaskSaved: boolean=false;
  isParentTaskSaved:boolean=false;
  isTaskOver:boolean=false;
  onClickisUpdated:boolean=false;
  isUpdated:boolean=false;

  constructor(private childTaskAPI: ChildTaskAPIService,
    private projectAPI: ProjectAPIService,
    private userAPI: UserAPIService,
    private parentTaskAPI: ParentTaskAPIService,
    private formBuilder: FormBuilder,
    private auto:Router) { }

  ngOnInit() {
    this.projectAPI.getAllProjects().subscribe(
      projectdata => {
        this.projects = projectdata;
        //console.log(this.projects);
      });
    this.userAPI.getAllUsers().subscribe(
      userdata => {
        this.users = userdata;
        //console.log(this.users);
      });
    this.parentTaskAPI.getAllParentTasks().subscribe(
      parentdata => {
        this.parentTask = parentdata;
        //console.log(this.parentTask);
      });
      this.childTaskAPI.getAllChildTask().subscribe(
        JsonData=>{
          this.childTask=JsonData;
        });
    this.addParentTaskForm = this.formBuilder.group({
      parentTaskName: ['']
    });
    this.addTaskForm = this.formBuilder.group({
      childTaskName: [null, Validators.required],
      taskStartDate: ['', Validators.required],
      taskEndDate: ['', Validators.compose([Validators.required,DateChecker])],
      taskPriority: ['1', Validators.required],
      taskStatus: ['false'],
      project: [null, Validators.required],
      user: [null, Validators.required],
      parent: [null, Validators.required]
    });
  }

  get childtaskerror() { return this.addTaskForm.controls; }

  setOrder(value: string) {
    console.log(value);
    this.order = value;
  }
  SubmitForm() {
    this.submitted = true;
    console.log(1);
    if (this.addTaskForm.invalid) {
      return;
    } else if (this.isDisabled) {
      console.log("Parent Task-" + this.isDisabled)
      this.AddParentTask();
    } else {
      console.log("Child Task-" + !this.isDisabled)
      this.AddChildTask();
    }

  }

  AddChildTask() {
    if(!this.onClickisUpdated){
      this.childTaskAPI.createChildTask(this.addTaskForm.value).subscribe(
        (TaskSaved: any) => {
          console.log(TaskSaved);
         this.isChildTaskSaved = true;
         this.ngOnInit();
        });
    }else{
      this.childTaskAPI.updateChildTask(this.addTaskForm.value).subscribe(
        (updatechild: any) => {
          console.log(updatechild);
          this.isUpdated = true;
          this.ngOnInit();
        });
    }
    
  }
  AddParentTask() {
    this.addParentTaskForm.controls['parentTaskName'].setValue(this.addTaskForm.controls['childTaskName'].value);
    console.log(this.addParentTaskForm.value);
    this.parentTaskAPI.createParentTask(this.addParentTaskForm.value).subscribe(
      (parentTask: any) => {
        console.log(parentTask);
        this.isParentTaskSaved = true;
        this.ngOnInit();
      });
  }

  triggerSomeEvent() {
    if (this.isDisabled) {
      this.isDisabled = !this.isDisabled;
      this.addTaskForm.get('project').enable();
      this.addTaskForm.get('taskStartDate').enable();
      this.addTaskForm.get('taskEndDate').enable();
      this.addTaskForm.get('taskPriority').enable();
      this.addTaskForm.get('user').enable();
      this.addTaskForm.get('parent').enable();
    } else {
      this.isDisabled = !this.isDisabled;
      this.addTaskForm.get('project').disable();
      this.addTaskForm.get('taskStartDate').disable();
      this.addTaskForm.get('taskEndDate').disable();
      this.addTaskForm.get('taskPriority').disable();
      this.addTaskForm.get('user').disable();
      this.addTaskForm.get('parent').disable();
    }
    return;
  }

  onClickUpdateTask(child) {
    this.addTaskForm = this.formBuilder.group({
        childTaskID:[child.childTaskID],
        childTaskName: [child.childTaskID],
        taskStartDate: [child.taskStartDate],
        taskEndDate: [child.taskEndDate],
        taskPriority: [child.taskPriority],
        taskStatus: [child.taskStatus],
        project: [child.project],
        user: [child.user],
        parent: [child.parent]
      });
    this.onClickisUpdated = true;
  }
  SuspendChildTask(id) {
    this.childTaskAPI.getSingleChildTask(id)
      .subscribe((child) => {
        this.addTaskForm = this.formBuilder.group({
          childTaskID:[child.childTaskID],
          childTaskName: [child.childTaskID],
          taskStartDate: [child.taskStartDate],
          taskEndDate: [child.taskEndDate],
          taskPriority: [child.taskPriority],
          taskStatus: [true],
          project: [child.project],
          user: [child.user],
          parent: [child.parent]
        });
        this.childTaskAPI.updateChildTask(this.addTaskForm.value)
          .subscribe((resp) => {
            console.log(resp);
          });
          this.isTaskOver = true;
      });
      setTimeout(()=>{
        this.auto.navigate(['']);
         },1000);
  }

  loadProjects() {
    $('#modalproject').modal('show');
  }

  loadParentTasks() {
    $('#modalparenttask').modal('show');
  }

  loadUsers() {
    $('#modalusers').modal('show');
  }

  selecteduser(user) {
    $('#modalusers').modal('hide');
    this.selectedUser = user;
    this.addTaskForm.patchValue({ user: this.selectedUser });
    console.log(this.addTaskForm.value);
  }
  selectedparentTask(parentTask) {
    $('#modalparenttask').modal('hide');
    this.selectedParentTask = parentTask;
    this.addTaskForm.patchValue({ parent: this.selectedParentTask });
  }
  selectedproject(project) {
    $('#modalproject').modal('hide');
    this.selectedproject = project;
    this.addTaskForm.patchValue({ project: this.selectedproject });
  }

}
