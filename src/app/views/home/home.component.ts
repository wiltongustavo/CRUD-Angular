import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

export interface PeriodicElement {
  ide: string;
  position: number;
  tecnologia: string;
  versao: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, ide: 'eclipse', tecnologia: 'java', versao: '1.5'},
  {position: 2, ide: 'eclipse', tecnologia: 'cobol', versao: '2.3'},
  {position: 3, ide: 'eclipse', tecnologia: 'C++', versao: '2.5'},
  {position: 4, ide: 'eclipse', tecnologia:'C#', versao: '2.0'},
  {position: 5, ide: 'eclipse', tecnologia: 'java', versao: '2.1'},
  {position: 6, ide: 'eclipse', tecnologia: 'java', versao: '1.8'},
  {position: 7, ide: 'eclipse', tecnologia: 'java', versao: '2.5'},
  {position: 8, ide: 'eclipse', tecnologia: 'java', versao: '2.5'},
  {position: 9, ide: 'eclipse', tecnologia: 'Phyton', versao: '2.5'},
  {position: 10, ide: 'eclipse', tecnologia: 'Ruby', versao: '2.5'},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['position', 'ide', 'tecnologia', 'versao', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(element: PeriodicElement | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        position: null,
        ide: '',
        tecnologia: '',
        versao: ''
      }: {
        position: element.position,
        ide: element.ide,
        tecnologia: element.tecnologia,
        versao: element.versao
      }
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result !== undefined){
       if(this,this.dataSource.map(p => p.position).includes(result.position)){
         this.dataSource[result.position - 1] = result;
         this.table.renderRows();
       }else{
        this.dataSource.push(result);
        this.table.renderRows();
       }
        
     }
    });
  }

  deleteElement(position:number): void{
    this.dataSource = this.dataSource.filter(p => p.position !== position)
  }

  editElement(element: PeriodicElement): void{
    this.openDialog(element);
  }

}
