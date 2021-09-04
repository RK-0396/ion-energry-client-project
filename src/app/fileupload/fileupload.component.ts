import { Component, Input, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {
 
  
  file : any;
  showChart :boolean = false;
  fileName = "Choose File";
  isFileUploaded :boolean = false;
  linechartData :any;
  chartTitle :string ="";
  BASE_URL='http://localhost:3000';
  constructor() { }
  ngOnInit(): void {
  }
  async onSubmit(e:any){
      e.preventDefault()
      const formData = new FormData()
  
      formData.append("file", this.file)
  
      try {
        const res = await axios.post(this.BASE_URL+"/uploadFile", formData, { headers: { "Content-Type": "multipart/form-data" },
        })
        console.log(res);
          this.isFileUploaded = true;
      } catch (err) {
        if (err) {
          console.log("Something went wrong while upload")
        } else {
          console.log(err.response.data.msg)
        }
      }
    }
  handleChange(e:any) {
    if(e.target){
    this.file = e.target.files[0];
    this.fileName =e.target.files[0].name;
    this.showChart = false;
    console.log(this.fileName);
    }
  }
showTempGraph(){
  let that =this;
  setTimeout(function () {
    that.getTempData();
  }, 5000)
 }

 async getTempData() {
  const results = await axios.get(this.BASE_URL+"/tempData");

  let chartTitle = results.data.sensorId;
  
  let listOfTs = results.data.measurements.map((tempDtata:any) => { return  new Date(tempDtata.ts).toLocaleDateString()})

  let tempDtataVal = results.data.measurements.map((tempDtata:any) => {return tempDtata.val})

  this.linechartData={
  'chartTitle': chartTitle,
  'listOfTs' : listOfTs,
  'tempDtataVal' :tempDtataVal
  }
  this.showChart = true;
}
}
