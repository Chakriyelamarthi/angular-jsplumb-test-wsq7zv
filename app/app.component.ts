import { Component, AfterContentInit, OnInit } from '@angular/core';
import { NodeService } from './node.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  nodes = [];

  connections = [];

  constructor(private nodeService: NodeService) {}

  ngOnInit() {
   // this.fillFromJson();
  }
  handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var file = files[0];
    console.log(file);
    var reader = new FileReader();

    reader.readAsText(file);
    reader.onload = (event: any) => {
      var csv = event.target.result; // Content of CSV file
      console.log(csv.split(','));
      this.buildJSON(csv.split(','));
    };
  }
  buildJSON(sourceData) {
    const nodesData = [];
    if (sourceData.length > 0) {
      let top = 59;
      let left = 9;
      sourceData.forEach((ele) => {
        let obj = {
          id: ele,
          top: top,
          left: left,
        };
        nodesData.push(obj);
        top = top + 100;
      });
    }
    this.setDefaultTargetData(nodesData);
  }
  setDefaultTargetData(nodesArray) {
    nodesArray.push({
      id: 'SFirstName',
      top: 59,
      left: 203,
    });
    nodesArray.push({
      id: 'SLastName',
      top: 159,
      left: 203,
    });
    nodesArray.push({
      id: 'SAccountNumber',
      top: 259,
      left: 203,
    });
    nodesArray.push({
      id: 'SCity',
      top: 359,
      left: 203,
    });
  //  const json = JSON.stringify(nodesArray);
  let result = {"nodes":nodesArray,"connections":[]};
  const json = JSON.stringify(result);
    const data = JSON.parse(json);
    console.log(nodesArray);
    this.nodes = data.nodes;
    this.connections = data.connections;
    console.log(this.connections);
  }
  fillFromJson() {
   
  }
  splitData(obj) {
    return obj.split('_')[0];
  }
}
