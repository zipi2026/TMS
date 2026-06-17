import { CommonModule } from '@angular/common';
import { Component, inject,Input,OnInit,Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormGroup,FormBuilder,FormControl, ValidationErrors, ValidatorFn, Validators, AbstractControl} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StatusEnum } from '../model/status-enum';
import { Itask } from '../model/itask';
import { HebrewPipe } from '../pipes/hebrew-pipe';
import { StatusComponent } from '../status/status.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
@Component({
  selector: 'app-task-form',
  imports: [MatDatepickerModule,StatusComponent,HebrewPipe,ReactiveFormsModule,CommonModule,FormsModule,MatFormFieldModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit{
  formGroup:FormGroup={}as FormGroup
  private formBuilder=inject(FormBuilder);
  readonly startDate=new Date()
  isNew=true
  // @Input()task:Itask={}as Itask;
  task:Itask={}as Itask;
  constructor(
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(){
    this.formGroup=this.formBuilder.group({
      // id:this.formBuilder.control('',Validators.required),
      // id:['',Validators.required],
      name:['',Validators.required],
      description: ['',Validators.required],
      price:[1500,[Validators.required,Validators.min(1500)]],
      // scheduling:[new FormControl<Date | null>(null),this.dateFromTodayValidator],
      status:[StatusEnum.ממתין]
    });
    this.task=this.data.task;
    if(this.task){
    const { taskId, ...taskWithoutId } = this.task;//לשאול!!!!!!!!!!!!!!!!!!!
    this.formGroup.setValue(taskWithoutId);
    }
    this.isNew=!this.task||Object.keys(this.task).length===0;
  }
  dateFromTodayValidator():ValidatorFn{
    return (control:AbstractControl):ValidationErrors|null=>{
      const value=control.value;
      if(!value) return null;
      const inputDate = new Date(value);
      const today = new Date();
      today.setHours(0,0,0,0);
      inputDate.setHours(0,0,0,0);

      return inputDate<today?null:{dateFromToday:{maxDate:today,actual:inputDate}};
    };

  }
  addThisTask(){
    if(this.formGroup.valid){
       console.log(this.formGroup.value)
    }
    this.dialogRef.close({success:true})
    // const{id,description,price}=this.formGroup.value;
    // newTask:{id=id,description=description,price=price}

  }
  cancel(){
    this.dialogRef.close({success:false})
  }

}
