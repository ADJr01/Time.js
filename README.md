
# Time.Js🕒

Time.Js is a versatile JavaScript Project that simplifies date and calendar related operation in a web project.

## Core Functionalities:
Month Calendar Data: Retrieve detailed calendar data for a specific month.
```JavaScript
const time = new Time();
const calendarInfo = time.monthInfo();
```

Full Year Calendar Data: Access comprehensive calendar data for an entire year.
```JavaScript
const time = new Time();
const calendarInfo = time.yearlyInfo();
```

To Switch Month use **setMonth** function.It takes only one parameter *month*.Parameter can be passed as both number and string format.Example:
```javascript
const time = new Time();
time.setMonth('january'); // january / jan / 0
const januaryCalendar = time.monthInfo();
```

