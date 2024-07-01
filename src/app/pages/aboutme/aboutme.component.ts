import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.less']
})
export class AboutmeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }
  openEmailProgram(){
    window.open('http://ec2-18-215-174-101.compute-1.amazonaws.com/johnEmail/', '_blank');
  }

}
