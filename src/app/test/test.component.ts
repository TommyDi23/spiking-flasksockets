import { Component, OnInit, Injectable } from "@angular/core";
import { WebsocketService } from "../websocket.service";
import { Socket } from 'ngx-socket-io';

@Component({
  selector: "app-test",
  template: `
    <h2>Welcome {{ name }}</h2>
    <h2>2 + 2 is {{ 2 + 2 }}</h2>
    <button (click)="onClick($event)" value="+1">upvote</button>
    {{ upvoted }}
     <button (click)="onClick($event)" value="-1">downvoted</button>
    {{ downvoted }}
    <input #myInput type="text" />
    <button (click)="logMessage(myInput.value)">Log</button>
    {{'thankyou for asking'}}
  `,
  styleUrls: ["./test.component.css"]
})
export class TestComponent implements OnInit {
  public name = "dancing bananas";
  public myId = "testId";
  public upvoted = 0;
  public downvoted = 0;

  selectedNumber: Number;
  

  constructor(private webSocketService: WebsocketService) { }

  ngOnInit() {
    
  }

  onClick(event) {
    
      // here we want to connect to the socketio server

    this.webSocketService.emit("btn click", { votes: event.target.value})
      
    
    console.log(event.target.value);
    this.upvoted = event.target.value;
    this.downvoted = event.target.value;
  }

  logMessage(value) {
    console.log(value);
    this.webSocketService.emit("question input", { question: value })

  }
}
