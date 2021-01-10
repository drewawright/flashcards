import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { IFlash } from './../flash.model';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlashComponent implements OnInit {

  @Input() flash: IFlash = {
    id: 1,
    question: 'React to Angular',
    answer: 'No Reaction :)',
    show: false
  };
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDelete = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onEdit = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onRememberedChange = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onToggleCard = new EventEmitter();
  toggleCard(): void {
    this.onToggleCard.emit(this.flash.id);
  }

  deleteFlash(): void {
    this.onDelete.emit(this.flash.id);
  }

  editFlash(): void {
    this.onEdit.emit(this.flash.id);
  }

  markCorrect(): void {
    this.onRememberedChange.emit({
      id: this.flash.id,
      flag: 'correct'
    });
  }

  markIncorrect(): void {
    this.onRememberedChange.emit({
      id: this.flash.id,
      flag: 'incorrect'
    });
  }

  constructor() { }

  ngOnInit(): void {
  }

}
