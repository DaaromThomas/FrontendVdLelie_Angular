import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Packaging } from '../../interfaces/packaging';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrl: './stock-table.component.css'
})
export class StockTableComponent {
  @Input() data:any
  @Output() packageChangeEvent = new EventEmitter<Packaging>();
  displayedColumns: string[] = ['group','name', 'amountInStock', 'minAmount','location','edit'];
  dataSource = new MatTableDataSource<any>();
  isLoading = true;
  VOForm = this._formBuilder.group({
    VORows: this._formBuilder.array([]),
  });
  isEditableNew: boolean = true;

  constructor(private fb: FormBuilder, private _formBuilder: FormBuilder) {
  }

  ngOnChanges(): void {
    console.log(this.data)
    console.log('KFK')
    this.VOForm = this.fb.group({
      VORows: this.fb.array(
        this.data.map((val:any) =>
          this.fb.group({
            id: new FormControl(val.id),
            group: new FormControl(val.packagingGroup),
            name: new FormControl(val.name),
            location: new FormControl(val.location),
            amountInStock: new FormControl(val.amountinstock),
            minAmount: new FormControl(val.minAmount),
            isEditable: new FormControl(true),
            isNewRow: new FormControl(false),
          })
        )
      ),
    });
    this.isLoading = false;
    this.dataSource = new MatTableDataSource(
      (this.VOForm.get('VORows') as FormArray).controls
    );
    console.log(this.VOForm)
  }

  AddNewRow() {
    // this.getBasicDetails();
    const control = this.VOForm.get('VORows') as FormArray;
    control.insert(0, this.initiateVOForm());
    this.dataSource = new MatTableDataSource(control.controls);
  }
  initiateVOForm(): FormGroup {
    return this.fb.group({
      id: new FormControl(''),
      group: new FormControl(''),
      name: new FormControl(''),
      location: new FormControl(''),
      amountInStock: new FormControl(''),
      minAmount: new FormControl(''),
      isEditable: new FormControl(false),
      isNewRow: new FormControl(true),
    });
  }
  SaveVO(VOFormElement:any, i:any) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
    this.packageChangeEvent.emit(VOFormElement.get('VORows').at(i).value);
  }
  EditSVO(VOFormElement:any, i:any) {
    // VOFormElement.get('VORows').at(i).get('name').disabled(false)
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
    // this.isEditableNew = true;
  }
  cancelEditVO(VOFormElement:any, i:any) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
    this.ngOnChanges();
  }
  getIsEditable(index: number): boolean {
    const rowValue = this.VOForm.get('VORows')?.value?.[index] as any;
    return rowValue ? rowValue.isEditable : false;
  }
}
