//the following class will create an object with the given passed paramters, and then determines what the payment due date is.
//the program starts with the due date being set to the given pay date
//it then calculates if the current due date falls on a weekend
//if so, it will determine whether or not to increment or decrement by 1 day depending on if it is a sunday or a saturday
//it then calculates if the current due date is a holiday
//if so, it will always always decrement, UNLESS the holiday falls on a monday, so I increment to avoid any infinite loop between weekend and holiday checking
//the program then goes back to check if it is a weekend, as per the document provided
//it will then check to see if it has been at least 10 days since the fund day
//if it has been less than 10 days, it will calculate the new pay date based on the pay span, either adding 7, 14, or 30 days depending on the pay span
//the program will loop recursively until a value is returned

class PayDateCalculator {

    //The day the loan was funded
    fundDay:Date ;

    //A date containing one of the customers paydays
    payDay:Date ;

    //A string representing the frequency at which the customer is paid.
    //(One these values: 'weekly', 'bi-weekly', 'monthly')
    paySpan: string;

    //A boolean determining whether or not the
    // customer receives their paycheck via direct deposit.
    hasDirectDeposit: boolean;

    dueDate: Date ;

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
        //initialize due date to the current pay date
        this.dueDate = this.payDay;
    }
    
    calculateDueDate(): Date {
       // this.dueDate = this.payDay;
       //check first if direct deposit is enabled
        if (this.hasDirectDeposit == true)
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
    calculateWeekend(): void{
        if (this.isWeekend() == true)
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

    calculateHoliday(): void {
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

    calculateFundDay():any {
        if (this.tenDaysSinceFundDay() == true)
        {
            //we return all the way back to 'calculateDueDate' and returns the due date
            return 0;
        }
        else
        {
            //we check the pay span and update the pay date accordingly
            //then we call calculateDueDate and start over again
            this.calculateNewPayDate();
            this.calculateDueDate();
        }
    }

    calculateNewPayDate():void
    {
        if(this.paySpan == "weekly")
        {
            this.dueDate.setDate(this.dueDate.getDate()+7);
        }
        else if(this.paySpan == "bi-weekly")
        {
            this.dueDate.setDate(this.dueDate.getDate()+14)
        }
        else 
        {
            this.dueDate.setDate(this.dueDate.getDate()+30)
        }
    }

    isWeekend(): boolean {
        var dayOfWeek = this.dueDate.getDay(); // get numeric day of week, Sunday - Saturday : 0 - 6
        var isWeekend = (dayOfWeek === 6) || (dayOfWeek  === 0); // 6 = Saturday, 0 = Sunday
        return isWeekend;
    }

    isHoliday():boolean {
        for (let i=0 ; i<this.holidays.length ; i++)
        {
            if (this.dueDate == this.holidays[i].holidayDate)
            {
                return true;
            }
        }
        return false;
    }

    //checks if the current due date is a Saturday
    isSaturday():boolean{
        if (this.dueDate.getDay() == 6){return true;}
        return false;
     }

    //checks if the current due date is a Sunday
    isSunday():boolean{
       if (this.dueDate.getDay() == 0){return true;}
       return false;
    }

    //checks if its been at least ten days since the fund date
    tenDaysSinceFundDay():boolean {
        //returns true or false depending on if the due date is greater than or equal to 10 days more than the fund day
        let diffInTime = this.dueDate.getTime() - this.fundDay.getTime();
        let diffInDays = diffInTime / (1000 * 3600 * 24);
        return diffInDays >= 10; 
    }

    //increments the current due date by 1 day
    addDay():void {
        this.dueDate.setDate(this.dueDate.getDate()+1);
    }

    //decrements the current due date by 1 day
    subtractDay():void {
        this.dueDate.setDate(this.dueDate.getDate()-1);
    }
}


let test = new PayDateCalculator(new Date("December 19 2022"), new Date("December 23 2022"), "weekly", true );
let test2 = new PayDateCalculator(new Date("December 12 2022"), new Date("December 25 2022"), "weekly", true );
let test3 = new PayDateCalculator(new Date("December 01 2022"), new Date("December 8 2022"), "monthly", true );
let test4 = new PayDateCalculator(new Date("December 12 2022"), new Date("December 25 2022"), "bi-weekly", true );
let test5 = new PayDateCalculator(new Date("December 30 2022"), new Date("January 2 2023"), "bi-weekly", true );

//test object instantiation

console.log ("this is a test");
console.log("PROGRAM START:");
console.log ("the due date for the first test is: " + test.calculateDueDate());
console.log ("the due date for the second test is: " + test2.calculateDueDate());
console.log ("the due date for the third test is: " + test3.calculateDueDate());
console.log ("the due date for the fourth test is: " + test4.calculateDueDate());
console.log ("the due date for the fifth test is: " + test5.calculateDueDate());