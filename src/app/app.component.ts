import { Component } from '@angular/core';

export interface RoutingStep {
  opSeq: number;
  description: string;
  queue: number;
  setup: number;
  labour: number;
  machine: number;
  move: number;
  startDate: Date;
  requestDate: Date;
  leadtimeDays: number;
  leadtimeHours: number;
  percentOfTotal: number;
  previousTotal: number;
  previousTotalPercent: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  steps: RoutingStep[] = [
    <RoutingStep>{
      opSeq: 10,
      description: 'Stores',
      queue: 3,
      labour: 0.25,
      move: 1,
      startDate: new Date('2023-04-17'),
      requestDate: new Date('2023-04-18'),
      leadtimeDays: 1,
      previousTotal: 0,
    },
    <RoutingStep>{
      opSeq: 20,
      description: 'M510 - Milling',
      queue: 3,
      setup: 0.25,
      machine: 2,
      move: 1,
      startDate: new Date('2023-04-18'),
      requestDate: new Date('2023-04-19'),
      leadtimeDays: 1,
      previousTotal: 0,
    },
    <RoutingStep>{
      opSeq: 30,
      description: 'Metro',
      queue: 24,
      move: 1,
      startDate: new Date('2023-04-19'),
      requestDate: new Date('2023-04-20'),
      leadtimeDays: 1,
      previousTotal: 0,
    },
    <RoutingStep>{
      opSeq: 40,
      description: 'Inspection',
      queue: 2,
      labour: 0.25,
      move: 0.5,
      startDate: new Date('2023-04-20'),
      requestDate: new Date('2023-04-21'),
      leadtimeDays: 1,
      previousTotal: 0,
    },
  ];

  totalHours: number = 0;

  ngOnInit() {
    this.steps = this.steps.map((x) => {
      x.leadtimeHours =
        x.queue ??
        0 + x.setup ??
        0 + x.labour ??
        0 + x.machine ??
        0 + x.move ??
        0;
      return x;
    });

    this.totalHours = this.steps
      .map((x) => x.leadtimeHours)
      .reduce((x, y) => x + y);

    this.steps = this.steps.map((x) => {
      x.percentOfTotal = (x.leadtimeHours / this.totalHours) * 100;
      return x;
    });

    this.steps.map((x) => {
      const previousTotal = this.steps
        .map((xx) => (xx.opSeq < x.opSeq ? xx.leadtimeHours : 0))
        .reduce((x, y) => x + y);
      x.previousTotal = previousTotal;
      x.previousTotalPercent = previousTotal / this.totalHours * 100;
      return x;
    });
  }
}
