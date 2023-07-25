import { Component, OnInit } from '@angular/core';
import { CompSerService } from '../service/comp-ser.service';
import { executiveGroupModel } from '../shared/company';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource, _MatTableDataSource} from '@angular/material/table';

import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
export interface User {
  name: string;
}

@Component({
  selector: 'app-app-executives',
  templateUrl: './app-executives.component.html',
  styleUrls: ['./app-executives.component.scss']
})
export class AppExecutivesComponent implements OnInit {

  executiveForm: FormGroup;
  isSubmitted: Boolean = false;

  //myControl = new FormControl<string>('', [Validators.maxLength(20)]);
  filteredOptions: Observable<string[]>;
  options: string[] = ['Mr.','Dr.', 'Sir'];


  constructor(
    private CompSerService: CompSerService,
    public formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ){
    this.getexecutiveForm();
  }
  ngOnInit(): void {
    this.filteredOptions = this.executiveForm.valueChanges.pipe(startWith(''),
      map(value => {
        return value.prefix ? this._filter(value.prefix) : this.options.slice();
      })
    );
  }

  submitValue(){
    /* if(!this.executiveForm.valid){
      this.isSubmitted = true;
      return;
    } */
    let formValue = this.executiveForm.value;
    console.log(formValue)
  }

  private _filter(prefix: string): string[] {
    const filterValue = prefix.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  getexecutiveForm(){
    this.executiveForm = new FormGroup({
      prefix: new FormControl<string>('', [Validators.maxLength(20)]),
      firstName: new FormControl<string>('', [Validators.maxLength(30)]),
      lastName: new FormControl('', [Validators.maxLength(30)]),
      initials: new FormControl('', [Validators.maxLength(10)]),
      jonTitle: new FormControl('', [Validators.maxLength(100)]),
      group: new FormControl('', [Validators.required])
    });
  }

  getErrorMessageNum(num: number){
    return `Maximum ${num} characters allowed`
  }

}
