import { Component, OnInit } from '@angular/core';
import { CompSerService } from '../service/comp-ser.service';
import { executiveGroupModel } from '../shared/company';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import {MatTableDataSource, _MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-app-executives-group',
  templateUrl: './app-executives-group.component.html',
  styleUrls: ['./app-executives-group.component.scss']
})
export class AppExecutivesGroupComponent implements OnInit {


  loading: boolean = true;
  currentID: number = 0;
  executiveGrpForm: FormGroup;
  isSubmitted: Boolean = false;

  displayedColumns: string[] = ['id', 'name'];
  executiveGroupTable: any;

  constructor(
    private CompSerService: CompSerService,
    public formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ){
    this.getexeGrpForm();
  }

  getexeGrpForm(){
    this.executiveGrpForm = this.formBuilder.group({
      exeGrpName: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    this.getAllExecutiveGroup()
    this.getHeight()
  }

  getAllExecutiveGroup(){
    let initalValue: executiveGroupModel[];
    this.CompSerService.getExecutiveGroup().subscribe({
      next: (value) => {
        this.loading = true;
        initalValue = value;
      },
      complete: () => {
        this.executiveGroupTable = new MatTableDataSource(initalValue);
        this.currentID = initalValue.length === 0 ? 0 : this.generateID() + 1;
        this.loading = false;
        console.log(this.executiveGroupTable.data)
      },
    })
  }

  submitValue(){
    if(!this.executiveGrpForm.valid){
      this.isSubmitted = true;
      return;
    }
    let formValue = this.executiveGrpForm.value
    let sendBody = {
      "id": this.currentID,
      "name": formValue.exeGrpName,
      "version": 0
    }
    this.CompSerService.postExecutiveGroup(sendBody).subscribe((data) => {
      if(typeof(data)){
        this.message(data.name+' group added successfully')
        this.getAllExecutiveGroup();
      }else{
        this.message('Something went wrong')
      }
      this.resetForm();
    });
  }

  resetForm(){
    this.executiveGrpForm.reset();
    this.isSubmitted = false;
  }

  message(message: string){
    this.snackBar.open(message, 'close', { duration: 3000 });
  }

  generateID() {
    let tableData: executiveGroupModel[] = this.executiveGroupTable.data
    return Math.max(...tableData.map(o => o.id));
  }


  searchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.executiveGroupTable.filter = filterValue.trim().toLowerCase();
  }

  getHeight() {
    let height: number;
    window.onresize = () => { };
    height = window.innerHeight;
    return Math.round(height - 400)
  }

}
