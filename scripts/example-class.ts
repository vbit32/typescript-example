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

    //multi dimensional array of dates containing holidays, each index containing holidayName and holidayDate
    holidays = [
        { holidayName: "New Years Day", holidayDate: new Date("January 1 2023") },
        { holidayName: "Fourth of July", holidayDate: new Date("July 4 2023")},
        { holidayName: "Christmas", holidayDate: new Date("December 25 2023") }
        //only adding a few for example
      ]

    //this is where the object is instantiated
    constructor(fundDay:Date, payDay: Date, paySpan: string, hasDD: boolean) {
        this.fundDay = fundDay;
        this.payDay = payDay;
        this.paySpan = paySpan;
        this.hasDirectDeposit = hasDD;
    }
    

    public calculateDueDate(fundDay: Date, paySpan: string,
        payDay: Date, hasDirectDeposit: boolean): Date {
        
        
        //add logic
        return dueDate;
    }
}




//TEST OBJECTS update these later
//let mercObj = new PayDateCalculator("Mercedes-Benz GLA");
//let hondaObj = new PayDateCalculator("Honda City")

//mercObj.run();  // A Mercedes started A Mercedes-Benz GLA is moving at 150 mph!
//hondaObj.run(); // A Honda started A Honda City is moving at 100 mph!