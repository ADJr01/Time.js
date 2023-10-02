'use strict';
//under implementation
class TimeRange{
  constructor(date1,date2) {
    if(isNaN(date1.getTime()) || isNaN(date2.getTime())) throw new Error(`Invalid Date. Failed to create Range`);
      this.startDate = date1.getTime()<=date2.getTime()?date1:date2;
      this.endDate = date2.getTime()<=date1.getTime()?date1:date2;
  }
  isSameDate(){
    return this.startDate.getDate() === this.endDate.getDate() && this.startDate.getMonth() === this.endDate.getMonth() && this.startDate.getFullYear() === this.endDate.getFullYear();
  }
  isSameDay(){

  }
  isSameHour(){

  }
  isSameMinute(){

  }
  isSameSecond(){

  }
  isSameMilliSecond(){

  }
  isSameMonth(){

  }
  isSameYear(){

  }
  isSameWeek(){

  }

  difference(){
    const diff = {};
    diff.years = Math.abs(this.endDate.getFullYear() - this.startDate.getFullYear());
    diff.months = Math.abs(this.endDate.getMonth() - this.startDate.getMonth());
    diff.days = Math.abs(this.endDate.getDate() - this.startDate.getDate());
    diff.hours = Math.abs(this.endDate.getHours() - this.startDate.getHours());
    diff.minutes = Math.abs(this.endDate.getMinutes() - this.startDate.getMinutes());
    diff.seconds = Math.abs(this.endDate.getSeconds() - this.startDate.getSeconds());
    return diff;
  }
}
class Clock{

}

module.exports = class Time {
  #__MONTHS__=[{name:"January",short:"jan",index:0},{name:"February",short:"feb",index:1},{name:"March",short:"mar",index:2},{name:"April",short:"apr",index:3},{name:"May",short:"may",index:4},{name:"June",short:"jun",index:5},{name:"July",short:"jul",index:6},{name:"August",short:"aug",index:7},{name:"September",short:"sep",index:8},{name:"October",short:"oct",index:9},{name:"November",short:"nov",index:10},{name:"December",short:"dec",index:11}]
  constructor(time=new Date()) {
    this.date = new Date(time);
    if(isNaN(this.date.getTime())) throw new Error('Invalid Time::Aborting time construction');
    this.Year = this.date.getFullYear();
    this.Month = this.#__MONTHS__.find(item=>item.index===this.date.getMonth()).short;
  }
  #__processTime(conf){
    const __DAYS__={0:{name:"Sunday",short:"Sun",date_index:0},1:{name:"Monday",short:"Mon",date_index:1},2:{name:"Tuesday",short:"Tues",date_index:2},3:{name:"Wednesday",short:"Wed",date_index:3},4:{name:"Thursday",short:"Thur",date_index:4},5:{name:"Friday",short:"Fri",date_index:0},6:{name:"Saturday",short:"Sat",date_index:6}};
    const getLastDayOfMonth=(t,n)=>new Date(n,t+1,0).toString().split(" ")[2];
    //conf parsing
    let {year,complete_year,month,day_name_short} = conf;
    if(isNaN(Number(year)) ){
      throw Error(`Calendar: Invalid Configuration Given. Conf Must have a valid Year`);
    }
    complete_year = complete_year===undefined?true:complete_year;
    month = month===undefined?'jan': month;
    day_name_short = day_name_short || false;
    const use_short = day_name_short;
    const calendar = Object.create({});
    calendar.year = year;
    calendar.calendar = [];
    let mon;
    const isSpecificMonth = !complete_year;
    let _specefic_month = isSpecificMonth?month.toString().toLowerCase():null;
    let D = null;
    if(!isSpecificMonth){
      D = new Date(year)
    }else{
      D = new Date(year);
      mon = _specefic_month;
      if(typeof _specefic_month === 'string'){
        mon = this.#__MONTHS__.find((e, e_ind)=>(e.name.toLowerCase()===_specefic_month || e.short===_specefic_month) || e_ind==_specefic_month);
        if(!mon){
          throw Error(`Calendar: Invalid Configuration Given.Invalid Month`);
        }
      }
      const isValidMonth = D.setMonth(typeof _specefic_month==='number'?mon:mon.index);
      if(isNaN(isValidMonth)){
        throw Error(`Calendar: Invalid Configuration Given.Could not configure calendar.Month Set Failed`);
      }
    }


    if(complete_year){
      let j = 0;
      for (;j<12;j++){
        D.setMonth(j);
        calendar.calendar[j] = {};
        calendar.calendar[j].title = `${this.#__MONTHS__[j].name} ${year}`;
        let i = D.getDate();
        let last_date = getLastDayOfMonth(D.getMonth(),D.getFullYear());
        for(;i<=last_date;i++){
          let day = day_name_short? __DAYS__[D.getDay().toString()].short:__DAYS__[D.getDay().toString()].name;
          if(calendar.calendar[j][day]){
            calendar.calendar[j][day].push(i);
          }else{
            calendar.calendar[j][day] = [];
            calendar.calendar[j][day].push(i)
          }
          D.setDate(D.getDate()+1);
        }
      }

    }else{
      calendar.calendar[0]={};
      calendar.calendar[0].title = `${mon.name} ${year}`;
      let i = D.getDate();
      let last_date = getLastDayOfMonth(D.getMonth(),D.getFullYear());
      for(;i<=last_date;i++){
        let day =use_short? __DAYS__[D.getDay().toString()].short:__DAYS__[D.getDay().toString()].name;
        if(calendar.calendar[0][day]){
          calendar.calendar[0][day].push(i);
        }else{
          calendar.calendar[0][day] = [];
          calendar.calendar[0][day].push(i)
        }
        D.setDate(D.getDate()+1);
      }
    }


    return calendar
  }
  setMonth(month){
    if(typeof month === 'string'){
      const _month = this.#__MONTHS__.find(mon=>mon.short===month.toLowerCase() || mon.name.toLowerCase()===month.toLowerCase());
      if(!_month) throw new Error(`Invalid Month ${month}`)
      this.date.setMonth(_month.index);
      this.Month=_month.short;
      return this
    }else if(typeof month === 'number'){
      this.date.setMonth(month);
      this.Year=this.date.getFullYear();
      this.Month = this.#__MONTHS__.find(mon=>mon.index===this.date.getMonth()).short
      return this;
    }
    throw new Error('Invalid Month Error')
  }
  setYear(year){
    if(isNaN(year) || Number(year)<1970) throw new Error('Incompatible year.');
    this.date.setFullYear(year);
    this.Month = this.#__MONTHS__.find(item=>item.index===this.date.getMonth()).short;
    this.Year = this.date.getFullYear();
  }
  monthInfo(shortDayName=true){
    return this.#__processTime({
      year: this.Year,
      month:this.Month,
      complete_year:false,
      day_name_short: Boolean(shortDayName)
    })
  }
  yearlyInfo(shortDayName=true){
    return this.#__processTime({
      year: this.Year,
      month:this.Month,
      complete_year:true,
      day_name_short: Boolean(shortDayName)
    })
  }

  static createRange(start_time,end_time){
    return new TimeRange(new Date(start_time),new Date(end_time));
  }
  static clock(){

  }

}

