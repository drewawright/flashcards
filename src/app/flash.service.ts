import { Injectable } from '@angular/core';
import { IFlash } from './flash.model';
import { BehaviorSubject } from 'rxjs';

function getRandomNumber(): number {
  return Math.floor(Math.random() * 100000);
}

@Injectable({
  providedIn: 'root'
})
export class FlashService {
  flashs: IFlash[] = [{
    question: 'Question 1',
    answer: 'Answer 1',
    show: false,
    id: getRandomNumber(),
  }, {
    question: 'Question 2',
    answer: 'Answer 2',
    show: false,
    id: getRandomNumber(),
  }, {
    question: 'Question 3',
    answer: 'Answer 3',
    show: false,
    id: getRandomNumber(),
  }];

  flashs$ = new BehaviorSubject<IFlash[]>(this.flashs);

  constructor() { }

  addFlash(flash: IFlash): void {
    this.flashs = [
      ...this.flashs, {
        ...flash,
        show: false,
        id: getRandomNumber()
      }
    ];

    this.flashs$.next(this.flashs);
  }

  toggleFlash(id: number): void {
    const index = this.getIndex(id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        show: !this.flashs[index].show
      },
      ...this.flashs.slice(index + 1)
    ];
    this.flashs$.next(this.flashs);
  }

  deleteFlash(id: number): void {
    const index = this.getIndex(id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      ...this.flashs.slice(index + 1)
    ];
    this.flashs$.next(this.flashs);
  }

  rememberedChange(id: number, flag: 'correct' | 'incorrect'): void {
    const index = this.getIndex(id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        remembered: flag
      },
      ...this.flashs.slice(index + 1)
    ];
    this.flashs$.next(this.flashs);
  }

  updateFlash(id: number, updatedFlash: IFlash): void {
    const index = this.getIndex(id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        ...updatedFlash,
      },
      ...this.flashs.slice(index + 1),
    ];
    this.flashs$.next(this.flashs);
  }

  getFlash(id: number): IFlash {
    const flash = this.flashs.find(f => f.id === id);
    return flash;
  }

  getIndex(id: number): number {
    return this.flashs.findIndex(flash => flash.id === id);
  }
}
