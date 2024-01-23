import { Component, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, ViewChildren } from '@angular/core';
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
  VOForm = this._formBuilder.group({
    VORows: this._formBuilder.array([]),
  });
  isEditableNew: boolean = true;  

  constructor(private fb: FormBuilder, private _formBuilder: FormBuilder, private renderer2: Renderer2, private el: ElementRef) {
  }

  ngAfterViewInit(): void {
    const editableFields = this.el.nativeElement;
    // editableFields.forEach((input: HTMLElement) => {
    //   input.style.border = 'none';
    //   // Additional styling if needed
    // });
  }

  ngOnChanges(): void {
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
    this.dataSource = new MatTableDataSource(
      (this.VOForm.get('VORows') as FormArray).controls
    );
  }

  SaveVO(VOFormElement:any, i:any) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
    this.packageChangeEvent.emit(VOFormElement.get('VORows').at(i).value);
  }
  EditSVO(VOFormElement:any, i:any) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
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
