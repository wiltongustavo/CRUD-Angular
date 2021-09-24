import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppService } from 'src/app/service/service';
import { Model } from './todoModel';
import { FormGroup } from '@angular/forms';




console.log("teste")
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = [ 'posicao', 'ide', 'tecnologia', 'versao', 'actions'];
 public form: FormGroup
  tasks: Model[]=[];
  task!: Model;

  
  constructor(public dialog: MatDialog, private http: HttpClient, private service: AppService) {
    this.service.findAll().subscribe(data => {
      this.tasks = data;
      console.log(this.tasks)
    })
    this.tasks = this.tasks

    this.load();
   }

  ngOnInit(): void {
    this.service.findAll().subscribe(data => {
      this.tasks = data;
      console.log(this.tasks)
    })
    this.tasks = this.tasks
  }
  
  openDialog(tasks: Model | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: tasks === null ? {
        id: null,
        posicao: '',
        ide: '',
        tecnologia: '',
        versao: ''
      }: {
        id: tasks.id,
        posicao: tasks.posicao,
        ide: tasks.ide,
        tecnologia: tasks.tecnologia,
        versao: tasks.versao
      }
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result !== undefined){
       if(this,this.tasks.map(p => p.id).includes(result.id)){
         this.tasks[result.id - 1] = result;
         window.location.reload();
       }else{
        
        window.location.reload();
       
       }
        
     }
    });
  }

  deleteElement(id:number): void{
    //this.dataSource = this.dataSource.filter(p => p.position !== position)
    this.service.delete(id).subscribe(data => {
      this.load();
    
    })

    
  }

  editElement(tasks: Model){
    this.openDialog(tasks);
    
  }


  load() {
    this.service.findAll().subscribe(
      response => {
        this.tasks = response;
      }
    );
  }


}
