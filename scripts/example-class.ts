class PayDateCalculator {
    name: string;
    date: Date;
    payDay: Date;
    hasDirectDeposit: boolean;
        

    //this is where the object is instantiated
    constructor(name: string, date: Date) {
        this.name = name;

    }
    
    run(speed:number = 0) {
        console.log("A " + this.name + " is moving at " + speed + " mph!");
    }

    public calculateDueDate(fundDay: Date, holidays: Date[], paySpan: string,
        payDay: Date, hasDirectDeposit: boolean): Date {
        
        dueDate: Date;

        //add logic
        return dueDate;
    }

}

//additional functionality to calculate all holidays
const holidays = [
    { name: "New Years Day", holidayMonth: 1, holidayDate: 1 },
    { name: "Fourth of July", holidayMonth: 7, holidayDate: 4},
    { name: "Christmas", holidayMonth: 12, holidayDate: 25 }
  ]


  /*
function getDate(year, month, week, day) {
    const firstDay = 1;
    if (week < 0) {
        month++;
    }
    const date = new Date(year, month, (week * 7) + firstDay);
    if (day < date.getDay()) {
        day += 7;
    }
    date.setDate(date.getDate() - date.getDay() + day);
    return date;
}
function getHoliday(month, week, day) {
    return holidays[month + "," + week + "," + day];
}
function getDateString(year, month, week, day) {
    const date = getDate(year, month, week, day);
    const holiday = getHoliday(month, week, day);
    let dateString = date.toLocaleDateString();
    if (holiday) {
        dateString += " \xa0\xa0\xa0" + holiday;
    }
    return dateString;
}
console.log(getDateString(2021, 4, -1, 1)); // Memorial Day, 2021
*/


//TEST OBJECTS update these later
//let mercObj = new PayDateCalculator("Mercedes-Benz GLA");
//let hondaObj = new PayDateCalculator("Honda City")

mercObj.run();  // A Mercedes started A Mercedes-Benz GLA is moving at 150 mph!
hondaObj.run(); // A Honda started A Honda City is moving at 100 mph!