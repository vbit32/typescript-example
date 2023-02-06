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
        { holidayName: "New Years Day", holidayDate: new Date("January 1 2023") },
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
        if(this.hasDirectDeposit == true)
        {
            if(this.isWeekend() == true)
            {
                //check if its a saturday or a sunday

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

                    }
                    else 
                    {
                        
                    }
                }
            }
        }
        else 
        {

        }

        //just filler return for now
        return new Date ("January 12 2023");
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
    public tenDaysSinceFundDay():boolean {
        //returns true or false depending on if the due date is greater than or equal to 10 days mroe than the fund day
        return this.dueDate.getDate() >= (this.fundDay.getDate()+10); 
    }
}


//TEST OBJECTS update these later
//let mercObj = new PayDateCalculator("Mercedes-Benz GLA");
//let hondaObj = new PayDateCalculator("Honda City")