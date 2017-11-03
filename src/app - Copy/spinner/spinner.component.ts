import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../apiServices/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  public active: boolean;

 public constructor(spinner: SpinnerService) {
   spinner.status.subscribe((status: boolean) => {
     this.active = status;
   });
 }
  ngOnInit() {
  }

}
