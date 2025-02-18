import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDialogComponent } from './login-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<LoginDialogComponent>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginDialogComponent],
      providers: [
        provideAnimationsAsync(),
        { provide: MatDialogRef, useValue: jasmine.createSpyObj('MatDialogRef', ['close']) }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<LoginDialogComponent>>
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onCancel', () => {
    beforeEach(() => {
      component.onCancel();
    });

    it('should close the dialog', () => {
      expect(dialogRefSpy.close).toHaveBeenCalled();
    });

    it('should not return playerId', () => {
      expect(dialogRefSpy.close).not.toHaveBeenCalledWith(component.playerId);
    });
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      component.playerId.set(' Alice ');
      component.onSubmit();
    });

    it('should close the dialog', () => {
      expect(dialogRefSpy.close).toHaveBeenCalled();
    });

    it('should trim and return playerId', () => {
      expect(dialogRefSpy.close).toHaveBeenCalledWith('Alice');
    });
  });
});
