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
    public calculateWeekend(): Date{
        if(this.isWeekend() == true)
        {
            //check if its a saturday or a sunday
            if (this.isMondayAHoliday() == true && this.isSunday() == true && this.tenDaysSinceFundDay() == true)
            {

            }
            else if (this.isMondayAHoliday() == true && this.isSaturday() == true && this.tenDaysSinceFundDay() == true && daysSinceFundDay > 10){

            }
        }
        else 
        {
            if (this.isHoliday() == true)
            {

                //add logic to check if the holiday is on a monday
                this.dueDate.setDate(this.dueDate.getDate() - 1);
                this.calculateDueDate();
            }
            else //if its not a holiday
            {
                //check if its been at least 10 days since the fund day
                if (this.tenDaysSinceFundDay() == true)
                {
                    return this.dueDate;
                }
                else 
                {

                }
            }
        }
        return this.dueDate;
    }

    public isWeekend(): boolean {
        var dayOfWeek = this.payDay.getDay(); // get numeric day of week, Sunday - Saturday : 0 - 6
        var isWeekend = (dayOfWeek === 6) || (dayOfWeek  === 0); // 6 = Saturday, 0 = Sunday
        return isWeekend;
    }

    public isHoliday():boolean {
        for (let i=0 ; i<this.holidays.length ; i++)
        {
            if (this.payDay == this.holidays[i].holidayDate)
            {
                return true;
            }
        }
        return false;
    }

    //checks if the next up coming holiday lands on a monday
    //if it does
    public isMondayAHoliday(): boolean {
        if (this.dueDate.getDay() == 0)
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


//TEST OBJECTS update these later
//let mercObj = new PayDateCalculator("Mercedes-Benz GLA");
//let hondaObj = new PayDateCalculator("Honda City")