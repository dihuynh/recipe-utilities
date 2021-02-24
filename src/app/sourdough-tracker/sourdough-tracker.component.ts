import { Component, OnInit } from '@angular/core';
import { BASIC_STEPS, Step } from './default-data';

@Component({
  selector: 'sourdough-tracker',
  templateUrl: './sourdough-tracker.component.html',
  styleUrls: ['./sourdough-tracker.component.css']
})
export class SourdoughTrackerComponent implements OnInit {
  public steps: Step[] = BASIC_STEPS;

  constructor() { }

  ngOnInit() {
  }

}
