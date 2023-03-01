import { getRandomNumberInRange } from ".";

describe("Function that generates a random number from 0 to given value range", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should return 0 when recieves 0 as parameter", () => {
        const randomNumber = getRandomNumberInRange(0);
        expect(randomNumber).toBe(0);
    });

    test("should return a value that equals to recieved number when randomize 1", () => {
        const spy = jest.spyOn(Math, "random");
        spy.mockReturnValue(1);

        const randomNumber = getRandomNumberInRange(4);
        expect(randomNumber).toBe(4);
    });

    test("should return a number that less than a positive value given as parameter", () => {
        const randomNumber = getRandomNumberInRange(2);
        expect(randomNumber).toBeLessThan(2);
    });

    test("should return a number that more than a negative value given as parameter", () => {
        const randomNumber = getRandomNumberInRange(-10);
        expect(randomNumber).toBeGreaterThan(-10);
    });
});
