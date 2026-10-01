import { daysCalculator } from "./budget-calculator"

describe('Budget calulator', () =>{
    describe("Count the number of days between two dates", () => {
        it("Should return 30", () => {
            expect(daysCalculator(new Date(), new Date()))
        })
    })

}) 