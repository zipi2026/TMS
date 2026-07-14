/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Itask } from '../model/itask';
import { StatusEnum } from '../model/status-enum';
import { TasksService } from '../services/http/tasks.service';

import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let tasksService: jasmine.SpyObj<TasksService>;

  beforeEach(async () => {
    tasksService = jasmine.createSpyObj('TasksService', ['updateTask$', 'addTask$']);
    tasksService.updateTask$.and.returnValue(of(true));
    tasksService.addTask$.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      imports: [TaskFormComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: { task: null } },
        { provide: TasksService, useValue: tasksService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit an update through the tasks service', () => {
    const task = {
      taskId: '42',
      name: 'Existing task',
      description: 'Updated description',
      price: 1800,
      scheduling: new Date('2026-07-10'),
      status: StatusEnum.ממתין,
    } as Itask;

    component.task = task;
    component.ngOnInit();
    component.formGroup.patchValue({
      name: task.name,
      description: task.description,
      price: task.price,
      status: task.status,
    });

    component.saveTask();

    expect(tasksService.updateTask$).toHaveBeenCalledWith(jasmine.objectContaining({
      taskId: '42',
      name: 'Existing task',
      description: 'Updated description',
      price: 1800,
    }));
  });
});
