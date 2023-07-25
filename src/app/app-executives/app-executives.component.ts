import { Component, OnInit } from '@angular/core';
import { CompSerService } from '../service/comp-ser.service';
import { executiveGroupModel, executiveModel } from '../shared/company';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, startWith } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-app-executives',
  templateUrl: './app-executives.component.html',
  styleUrls: ['./app-executives.component.scss']
})
export class AppExecutivesComponent implements OnInit {

  loading: boolean = true;
  executiveForm: FormGroup;
  isSubmitted: Boolean = false;
  executiveTable: any;
  executiveGroupOption: executiveGroupModel[] = [];
  currentID: number = 1000000;
  filteredOptions: Observable<string[]>;
  options: string[] = ['Mr.','Dr.', 'Sir'];

  displayedColumns: string[] = ['id', 'title', 'firstName', 'lastName', 'executiveGroup', 'Actions'];

  formEdit: boolean = false;
  editData: executiveModel


  constructor(
    private CompSerService: CompSerService,
    public formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ){
    this.getexecutiveForm();
  }

  ngOnInit(): void {
    this.getAllExecutiveGroup();
    this.getAllExecutive();
    this.filteredOptions = this.executiveForm.valueChanges.pipe(startWith(''),
      map(value => {
        return value.prefix ? this._filter(value.prefix) : this.options.slice();
      })
    );
  }

  getAllExecutive(){
    let initalValue: executiveModel[];
    this.CompSerService.getExecutive().subscribe({
      next: (value) => {
        this.loading = true;
        initalValue = value;
      },
      complete: () => {
        this.executiveTable = new MatTableDataSource(initalValue);
        this.currentID = initalValue.length === 0 ? 0 : this.generateID() + 1;
        this.loading = false;
      },
    })
  }

  getAllExecutiveGroup(){
    let initalValue: executiveGroupModel[];
    this.CompSerService.getExecutiveGroup().subscribe({
      next: (value) => {
        initalValue = value;
      },
      complete: () => {
        initalValue.map((elm) => {
          this.executiveGroupOption.push({
            id: elm.id,
            name: elm.name,
            version: elm.version
          })
        });
      }
    })
  }

  submitValue(){
    if(!this.executiveForm.valid){
      this.isSubmitted = true;
      return;
    }
    let formValue = this.executiveForm.value;
    if(!this.formEdit){
      let postBody:executiveModel = {
        id: this.currentID,
        lastName: formValue.lastName,
        firstName: formValue.firstName,
        initials: formValue.initials,
        systemInitials: (formValue.firstName[0]+formValue.lastName[0]).toUpperCase(),
        title: formValue.prefix,
        postTitle: '',
        salutation: formValue.prefix+' '+formValue.firstName,
        jobTitle: formValue.jonTitle,
        officeId: '',
        version: 0,
        executiveGroup: this.getExecutiveGrp(formValue.group),
      }

      this.CompSerService.postExecutive(postBody).subscribe((data) => {
        this.responseProcess(data, 'added')
      });
    }else{
      let putBody:executiveModel = {
        id: this.editData.id,
        lastName: formValue.lastName,
        firstName: formValue.firstName,
        initials: formValue.initials,
        systemInitials: (formValue.firstName[0]+formValue.lastName[0]).toUpperCase(),
        title: formValue.prefix,
        postTitle: this.editData.postTitle,
        salutation: formValue.prefix+' '+formValue.firstName,
        jobTitle: formValue.jonTitle,
        officeId: this.editData.officeId,
        version: this.editData.version,
        executiveGroup: this.getExecutiveGrp(formValue.group),
      }

      this.CompSerService.putExecutive(putBody).subscribe((data) => {
        this.responseProcess(data, 'updated')
      });
    }
  }

  responseProcess(data: executiveModel, type:string){
    if(typeof(data) === 'object'){
      this.message(`${data.firstName+' '+data.lastName} executive ${type} successfully`)
      this.getAllExecutive();
    }else{
      this.message('Something went wrong')
    }
    this.resetForm();
  }

  resetForm(){
    this.executiveForm.reset();
    this.isSubmitted = false;
    this.formEdit = false;
  }

  patchValue(value: executiveModel){
    this.formEdit = true;
    this.editData = value;
    this.executiveForm.patchValue({
      prefix: value.title,
      firstName: value.firstName,
      lastName: value.lastName,
      initials: value.initials,
      jonTitle: value.jobTitle,
      group: value.executiveGroup.id
    })
  }

  message(message: string){
    this.snackBar.open(message, 'close', { duration: 3000 });
  }

  private _filter(prefix: string): string[] {
    const filterValue = prefix.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  generateID() {
    let tableData: executiveModel[] = this.executiveTable.data
    return Math.max(...tableData.map(o => o.id));
  }

  getExecutiveGrp(num: number){
    return this.executiveGroupOption.filter(elm => elm.id === num)[0];
  }

  searchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.executiveTable.filter = filterValue.trim().toLowerCase();
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

  getErrorMessageReq(text: string){
    return `${text} is required`
  }

  getHeight() {
    let height: number;
    window.onresize = () => { };
    height = window.innerHeight;
    return Math.round(height - 400)
  }

}
