import { Component, ViewChild } from '@angular/core';
import { MatCalendar, MatCalendarCellClassFunction } from '@angular/material/datepicker';



@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrl: './my-calendar.component.scss'
})
export class MyCalendarComponent {
  @ViewChild(MatCalendar) calendar: MatCalendar<Date> ;
  
  selected: Date;
  reserveDate: Date[] = []
  status:boolean = false;

  constructor(){
    this.selected = new Date()
    this.dateChanged(this.selected)
  }
  someEvent(){
      this.calendar.updateTodaysDate();
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // console.log(cellDate.getDate());
    const result = this.reserveDate.some((date:Date)=>{
      return date.getDate() == cellDate.getDate() && date.getFullYear() == cellDate.getFullYear() && date.getMonth() == cellDate.getMonth()
    })
    if (view == 'month') {
      return  result   ? 'highlight-date' : "";
    }
    return "";
}

dateChanged(event:any) {
  // console.log(event);
  const result = this.reserveDate.some((date:Date)=>{
    return date.getDate() == event.getDate() && date.getFullYear() == event.getFullYear() && date.getMonth() == event.getMonth()
  })
  this.status = result
}
isReserveDate(selectedDate: Date){
  return this.reserveDate.some((date:Date)=>{
    return date.getDate() == selectedDate.getDate() && date.getFullYear() == selectedDate.getFullYear() && date.getMonth() == selectedDate.getMonth()
  })
}
addDate(){
  const date = this.selected
  // console.log(date);
  if(!this.isReserveDate(date)){

    this.reserveDate.push(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
  }
  console.log(this.reserveDate);

  this.someEvent()
}
}