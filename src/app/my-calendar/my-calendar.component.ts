import { Component, ViewChild } from '@angular/core';
import { MatCalendar, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { BpnService } from '../services/data/bpn.service';
import { HttpRequestsService } from '../services/http-requests.service';



@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrl: './my-calendar.component.scss'
})
export class MyCalendarComponent {
  @ViewChild(MatCalendar) calendar: MatCalendar<Date> ;
  
  selected: Date;
  bpnId: number
  public loading: boolean =false
  reserveDate2: {[key: string]: any}[] = []
  status:boolean = false;

  constructor(public bpnService: BpnService, private httpReq: HttpRequestsService){
    
    this.selected = new Date()
    

    console.log(bpnService.bpn);

    httpReq.getDates(bpnService.bpn.phone_number).subscribe((data) => {
      this.reserveDate2 = data['taken_dates']
      this.bpnId = data['id']
      this.dateChanged(this.selected)
      this.someEvent()
      console.log(this.bpnId);
      
      
      
    })
    
    console.log(this.selected);
    
    
  }

  someEvent(){
      this.calendar.updateTodaysDate();
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // console.log(cellDate.getDate());
    const result = this.reserveDate2.some((ele:any)=>{
      let fix_date = ele['taken_date'].split('-')
      return Number(fix_date[2]) == cellDate.getDate() && Number(fix_date[0]) == cellDate.getFullYear() && Number(fix_date[1])-1 == cellDate.getMonth()
    })
    if (view == 'month') {
      return  result   ? 'highlight-date' : "";
    }
    return "";
}

dateChanged(event:any) {
  // console.log(event);
  const result = this.reserveDate2.some((ele:any)=>{
    let fix_date = ele['taken_date'].split('-')
    return Number(fix_date[2]) == event.getDate() && Number(fix_date[0]) == event.getFullYear() && Number(fix_date[1])-1 == event.getMonth()
  })
  this.status = result
  console.log(this.status);
  
}
isReserveDate(selectedDate: Date){
  return this.reserveDate2.some((ele:any)=>{
    let fix_date = ele['taken_date'].split('-')
    return Number(fix_date[2]) == selectedDate.getDate() && Number(fix_date[0]) == selectedDate.getFullYear() && Number(fix_date[1])-1 == selectedDate.getMonth()
  })
}
addDate(){
  const date = this.selected
  
  // console.log(date);
  if(!this.isReserveDate(date)){

    let body = {
      taken_date: `${date.getFullYear()}-${Number(date.getMonth())+1}-${date.getDate()}`,
      room_number: 0,
      bpn_id: this.bpnService.bpn.id
    }
    this.loading = true
    this.httpReq.postDate(body).subscribe(data => {

      console.log(data)
      this.reserveDate2.push(data)
      this.dateChanged(this.selected)
      this.someEvent()
      this.loading = false
    }, err => {
      this.loading = false
    })
    

  }else{

    let id_of_date = this.reserveDate2.filter(ele => {
      let fix_date = ele['taken_date'].split('-')
      return Number(fix_date[2]) == this.selected.getDate() && Number(fix_date[0]) == this.selected.getFullYear() && Number(fix_date[1])-1 == this.selected.getMonth()

    })
    let list_without_id = this.reserveDate2.filter(ele => {
      return ele['id'] !== id_of_date[0]['id']
    })

    this.reserveDate2 = list_without_id
    this.loading = true
    this.httpReq.deleteDate(id_of_date[0]['id']).subscribe(data => {
      console.log(data)
      this.loading = false
    }, err => this.loading=false)
    console.log(id_of_date);
    
  }
  console.log(this.reserveDate2);
  this.dateChanged(this.selected)
  this.someEvent()
}
}