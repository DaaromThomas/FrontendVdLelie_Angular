import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StockDeletePopupComponent } from "./stock-delete-popup.component";

describe('StockDeletePopupComponent', () => {
    let component: StockDeletePopupComponent;
    let fixture: ComponentFixture<StockDeletePopupComponent>;
    let mockMatDialogRef: jasmine.SpyObj<MatDialogRef<StockDeletePopupComponent>>;
  
    const testData = {
      package_: {
        name: 'Test Package'
      }
    };
  
    beforeEach(() => {
      mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
  
      TestBed.configureTestingModule({
        declarations: [StockDeletePopupComponent],
        providers: [
          { provide: MatDialogRef, useValue: mockMatDialogRef },
          { provide: MAT_DIALOG_DATA, useValue: testData }
        ]
      });
  
      fixture = TestBed.createComponent(StockDeletePopupComponent);
      component = fixture.componentInstance;
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('onCancelClick should close the dialog with false', () => {
      component.onCancelClick();
      expect(mockMatDialogRef.close).toHaveBeenCalledWith(false);
    });
  
    it('onDeleteClick should close the dialog with true', () => {
      component.onDeleteClick();
      expect(mockMatDialogRef.close).toHaveBeenCalledWith(true);
    });
    it('should create component successfully with MatDialogRef and MAT_DIALOG_DATA injected', () => {
        const data = {};
        const component = new StockDeletePopupComponent(mockMatDialogRef, data);
  
        expect(component).toBeTruthy();
        expect(component.dialogRef).toBe(mockMatDialogRef);
        expect(component.data).toBe(data);
      });
  });