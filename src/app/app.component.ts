import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { IFlash } from './flash.model';
import { FlashService } from './flash.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('flashForm', {static: true}) flashForm: NgForm;
  title = 'flashcards';
  editing = false;
  editingId: number;
  flashs$: Observable<IFlash[]>;
  flashs: IFlash[];

  flash: IFlash = {
    id: this.generateId(),
    question: '',
    answer: '',
    show: false
  };

  constructor(private flashService: FlashService) {
    this.flashs$ = this.flashService.flashs$;
  }

    trackByFlashId(index: number, flash: IFlash): number {
      return flash.id;
    }

    handleToggleCard(id: number): void {
      this.flashService.toggleFlash(id);
    }
    handleDelete(id: number): void {
      this.flashService.deleteFlash(id);
    }
    handleEdit(id: number): void {
      this.editing = true;
      this.editingId = id;
    }
    handleUpdate(): void {
      this.flashService.updateFlash(this.editingId, this.flash);
      this.handleCancel();
    }
    handleCancel(): void {
      this.editing = false;
      this.editingId = undefined;
      this.handleClear();
    }
    handleRememberedChange({ id, flag }): void {
      this.flashService.rememberedChange(id, flag);
    }
    handleSubmit(): void {
      this.flashService.addFlash(this.flash);
      this.handleClear();
    }
    handleClear(): void {
      this.flash = {
        question: '',
        answer: '',
      };
      this.flashForm.reset();
    }

    generateId(): number {
      return getRandomNumber();
    }
}

function getRandomNumber(): number {
  return Math.floor(Math.random() * 10000);
}
