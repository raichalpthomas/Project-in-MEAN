import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
 import {EmployeeService} from '../shared/employee.service';
 import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 import {FormsModule} from '@angular/forms';
 import {Employee} from '../shared/employee.model'; 

var M : any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }
resetForm(form?: NgForm){
    if (form)
    form.reset();
    this.employeeService.selectedEmployee={
      _id:" ",
      name:" ",
      position: " ",
      office:" ",
      salary:null
    }
}

  onSubmit(form: NgForm){
    if(form.value._id==" "){
     this.employeeService.postEmployee(form.value).subscribe((res)=>{
      this.resetForm(form);
       this.refreshEmployeeList()
      // M.toast({html: 'Saved Successfully!',classess:'rounded'});
      // alert('Saved Successfully!')
    });
  }
  else{
    this.employeeService.putEmployee(form.value).subscribe((res)=>{
      this.resetForm(form); 
      this.refreshEmployeeList()
      alert('Edited Successfully!')
   });
  }
  }

  refreshEmployeeList(){
    this.employeeService.getEmployeeList().subscribe((res)=>{
      this.employeeService.employees = res as Employee[];
    });
  }

  onEdit(emp: Employee){
    this.employeeService.selectedEmployee=emp;
  }


  onDelete(_id: string, form:NgForm){
    if(confirm('are u sure to delete this record?')==true){
      this.employeeService.deleteEmployee(_id).subscribe((res) =>{
        this.refreshEmployeeList();
        this.resetForm(form);
        alert('the record is deleted');
      });
    }

  }
}
