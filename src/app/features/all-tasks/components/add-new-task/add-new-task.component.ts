import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.css'],
})
export class AddNewTaskComponent implements OnInit {
  newTaskForm = this.formBuilder.group({
    title: ['', Validators.required],
    userId: ['', Validators.required],
    image: ['', Validators.required],
    description: ['', Validators.required],
    deadline: ['', Validators.required],
  });
  users: any[] = [];
  isLoading: boolean = false;
  imageFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddNewTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.dataService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res.users.reverse();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  selectImage(event: any) {
    this.newTaskForm.get('image')?.setValue(event.target.files[0]);
    const imageFile: File = event.target.files[0];
    if (imageFile) {
      this.imageFile = imageFile;
    }
  }
  createTask() {
    this.isLoading = true;
    const formData = new FormData();
    formData.append('title', this.newTaskForm.get('title')?.value!);
    formData.append('userId', this.newTaskForm.get('userId')?.value!);
    formData.append('image', this.imageFile!);
    formData.append('description', this.newTaskForm.get('description')?.value!);
    formData.append('deadline', this.newTaskForm.get('deadline')?.value!);
    this.dataService.createTask(formData).subscribe({
      next: (res: any) => {
        this.newTaskForm.reset();
        this.imageFile = null;
        this.isLoading = false;
        this._snackBar.openFromComponent(AlertComponent, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 4000,
          data: {
            message: 'Task created successfully',
            backgroundColor: '#16a34a',
            textColor: '#ffffff',
            isCloseBtnHidden: false,
          },
        });
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this._snackBar.openFromComponent(AlertComponent, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 4000,
          data: {
            message: 'Error!',
            backgroundColor: '#df1e1e',
            textColor: '#ffffff',
            isCloseBtnHidden: false,
          },
        });
      },
    });
  }
}
