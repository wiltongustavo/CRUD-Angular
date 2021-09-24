import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Model } from 'src/app/views/home/todoModel';
import { AppService } from 'src/app/service/service';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit {

isChange!: boolean
tasks: Model[]=[];
task!: Model;
public form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Model,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    private http: HttpClient, private service: AppService
   ) {
  
      this.service.findAll().subscribe(data => {
        this.tasks = data;
        console.log(this.tasks)
      })
    
   }

  
  ngOnInit(): void {
    if (this.data.id != null){
      this.isChange = true;
    }else{
      this.isChange = false;
    }
    
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  addTodo(){

    this.service.add(this.data).subscribe((response: any) =>{
     console.log(this.data)
    });
      
  }

  update(tasks: Model) {
    this.service.update(this.data!).subscribe((response: any) => {
      //resetando objeto 
      this.task = { id: undefined, posicao: undefined, versao: '', ide: '', tecnologia: '' };
      
    });
  }


}
