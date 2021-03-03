import { Component, OnInit } from '@angular/core';
import { BASIC_STEPS, StepDefinition } from './default-data';

@Component({
  selector: 'app-tracker-page',
  templateUrl: './tracker-page.component.html',
  styleUrls: ['./tracker-page.component.css']
})
export class TrackerPageComponent implements OnInit {

  public definitions: StepDefinition[] = BASIC_STEPS;

  constructor() { }

  ngOnInit(): void {
  }

}
