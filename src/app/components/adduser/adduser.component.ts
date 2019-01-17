import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserAPIService } from 'src/app/service/user-api.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  addUserForm: FormGroup;
  isUserSaved: boolean = false;
  onClickIsUpdated: boolean = false;
  isUpdated: boolean = false;
  isDeleted: boolean = false;
  actualUser: User[];
  order: string = 'type';
  submitted: boolean = false;
  userFilter: any = { firstName: '' };

  constructor(private formBuilder: FormBuilder, private userAPI: UserAPIService) {
    this.actualUser = [];

  }

  ngOnInit() {
    this.userAPI.getAllUsers().subscribe(
      data => {
        this.actualUser = data;
      });
    //validator
    if(!this.onClickIsUpdated&&!this.isUserSaved){
    this.addUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employeeID: ['', Validators.required]
    });
  }else{
    this.addUserForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      employeeID: ['']

    });
  }
  }

  get usererror() { return this.addUserForm.controls; }

  AddUser() {
    this.submitted = true;
    if (this.addUserForm.invalid) {
      return;
    } else if(!this.onClickIsUpdated){
      console.log(this.addUserForm.value);
      this.userAPI.createUser(this.addUserForm.value).subscribe(
        (user: any) => {
          console.log(user);
          this.isUserSaved = true;
          this.ngOnInit();
        });
    }else{
      console.log(this.addUserForm.value);
      this.userAPI.updateUser(this.addUserForm.value).subscribe(
        (user: any) => {
          console.log(user);
          this.isUpdated = true;
          this.ngOnInit();
        });

    }
  }
  onClickUpdateUser(user) {
    //console.log(user);
    this.addUserForm = this.formBuilder.group({
      firstName: [user.firstName],
      lastName: [user.lastName],
      employeeID: [user.employeeID],
      userID: [user.userID]
    });
    this.onClickIsUpdated=true;
  }
  deleteUser(id) {
    this.userAPI.deleteUser(id)
      .subscribe((status) => {
        console.log(status);
        this.ngOnInit();
      });
      this.isDeleted = true;


  }
  //order by
  setOrder(value: string) {
    console.log(value);
    this.order = value;

  }
}
