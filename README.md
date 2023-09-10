
# Time.Js🕒

Time.Js is a versatile JavaScript Project that simplifies date and calendar related operation in a web project.

## Core Functionalities:
Create an Instance:
```javascript
const time = new Time();
const time1 = new Time(new Date());
```
Month Calendar Data: Retrieve detailed calendar data for a specific month.
```javascript
const time = new Time();
const calendarInfo = time.monthInfo();
```

Full Year Calendar Data: Access comprehensive calendar data for an entire year.
```javascript
const time = new Time();
const calendarInfo = time.yearlyInfo();
```

To Switch Month use **setMonth** function.It takes only one parameter *month*.Parameter can be passed as both number and string format.Example:
```javascript
const time = new Time();
//january month calendar
time.setMonth('january');
const januaryCalendar = time.monthInfo();
//february month calendar
time.setMonth('feb');
const februaryCalendar = time.monthInfo();
//march month calendar
time.setMonth(2);
const marchCalendar = time.monthInfo();
```
To Switch Year use **setYear** function.It takes only one parameter *year*.Parameter can be passed as both only in number format.Example:
```javascript
const time = new Time();
time.setYear(2022);
console.log(time.monthInfo());
```
## 
