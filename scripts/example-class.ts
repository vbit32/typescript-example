//the following class instantiates an object with the given passed paramters, and then determines what the payment due date is.
//the program starts with the due date being set to the given pay date
//it then calculates if the current due date falls on a weekend
//if so, it will determine whether or not to increment or decrement by 1 day depending on if it is a sunday or a saturday
//it then calculates if the current due date is a holiday
//if so, it will always always decrement
//it will then check to see if it has been at least 10 days since the fund day
//if it has been less than 10 days, it will defer to the next pay date, either adding 7, 14, or 30 days depending on the pay span
//the program will loop recursively until a value is returned

class PayDateCalculator {

    //The day the loan was funded
    fundDay: Date;

    //A date containing one of the customers paydays
    payDay: Date;

    //A string representing the frequency at which the customer is paid.
    //(One these values: weekly, bi-weekly, monthly)
    paySpan: string;

    //A boolean determining whether or not the
    // customer receives their paycheck via direct deposit.
    hasDirectDeposit: boolean;

    dueDate: Date;

    //multi dimensional array of dates containing holidays, each index containing holidayName and holidayDate
    holidays = [
        { holidayName: "New Years Day", holidayDate: new Date("January 1 2023")},
        { holidayName: "Fourth of July", holidayDate: new Date("July 4 2023")},
        { holidayName: "Christmas", holidayDate: new Date("December 25 2023") }
        //only adding a few for example
      ]

    //this is where the object is instantiated
    constructor(fundDay: Date, payDay: Date, paySpan: string, hasDD: boolean) {
        this.fundDay = fundDay;
        this.payDay = payDay;
        this.paySpan = paySpan;
        this.hasDirectDeposit = hasDD;
        //calculate dueDate later
        this.dueDate = this.payDay;
    }
    
    public calculateDueDate(): Date {
       // this.dueDate = this.payDay;
       //check first if direct deposit is enabled
        if(this.hasDirectDeposit == true)
        {
            this.calculateWeekend();
        }
        //else direct deposit is not enabled
        else 
        {
            //add 1 day
            this.addDay();
            this.calculateWeekend();
        }
            
        return this.dueDate;
    }

        //step 2 in the calculation, after we check if the object has direct deposite enabled or not
    public calculateWeekend(): void{
        if(this.isWeekend() == true)
        {
            //logic for case when current due date value is: a sunday + the following monday also lands on a holiday + its been at least ten days funding
            // - a sunday
            // - the following monday also lands on a holiday
            // - its been at least ten days since the funding date
            // in this case, pay date decrements by 1
            if (this.isSunday() == true)
            {
                this.addDay();
                this.calculateHoliday();
            }
            else if (this.isSaturday() == true)
            {
                this.subtractDay();
                this.calculateHoliday();
            }
        }
        else 
        {
            this.calculateHoliday();
        }
    }

    public calculateHoliday(): void {
        if (this.isHoliday() == true)
        {
            //check if the current holiday due date value is a monday
            //if yes, increment
            //if no, decrement
            if (this.dueDate.getDay() == 1)
            {
                this.addDay //incremenet
                this.calculateWeekend(); //and then check again if its a weekend
            }
            else {
                this.subtractDay(); //not a monday, so decrement
                this.calculateWeekend(); //reverse loop, and go back to check if its a weekend
            }
        }
        else {
            //not a holiday or a weekend, go to the final check
            this.calculateFundDay();
        }

    }

    public calculateFundDay():void {

    }

    public isWeekend(): boolean {
        var dayOfWeek = this.dueDate.getDay(); // get numeric day of week, Sunday - Saturday : 0 - 6
        var isWeekend = (dayOfWeek === 6) || (dayOfWeek  === 0); // 6 = Saturday, 0 = Sunday
        return isWeekend;
    }

    public isHoliday():boolean {
        for (let i=0 ; i<this.holidays.length ; i++)
        {
            if (this.dueDate == this.holidays[i].holidayDate)
            {
                return true;
            }
        }
        return false;
    }

    //checks if the next up coming holiday lands on a monday
    public isMondayAHoliday(): boolean {
        if (this.isSunday() == true)
        {

        }
        else if (this.isSaturday() == true)
        {

        }
        return false;
    }

    //checks if the current due date is a Saturday
    public isSaturday():boolean{
        if (this.dueDate.getDay() == 6){return true;}
        return false;
     }

    //checks if the current due date is a Sunday
    public isSunday():boolean{
       if (this.dueDate.getDay() == 0){return true;}
       return false;
    }

    //checks if its been at least ten days since the fund date
    public tenDaysSinceFundDay():boolean {
        //returns true or false depending on if the due date is greater than or equal to 10 days more than the fund day
        return this.dueDate.getDate() >= (this.fundDay.getDate()+10); 
    }

    //increments the current due date by 1 day
    public addDay():void {
        this.dueDate.setDate(this.dueDate.getDate()+1);
    }

    //decrements the current due date by 1 day
    public subtractDay():void {
        this.dueDate.setDate(this.dueDate.getDate()-1);
    }
}

//the following class instantiates an object with the given passed paramters, and then determines what the payment due date is.
//the program starts with the due date being set to the given pay date
//it then calculates if the current due date falls on a weekend
//if so, it will determine whether or not to increment or decrement by 1 day
//it then calculates if the current due date is a holiday
//if so, it will always always decrement UNLESS the given holiday falls on a monday, only then will it increment.

//TEST OBJECTS update these later
//let mercObj = new PayDateCalculator("Mercedes-Benz GLA");
//let hondaObj = new PayDateCalculator("Honda City")