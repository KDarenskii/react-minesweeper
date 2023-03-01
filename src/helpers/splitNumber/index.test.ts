import { splitNumber } from ".";

describe("Function that splits a recieved value by each number and converts it to array of strings", () => {
    test("should return an array of zeros when recieves 0 as parameter", () => {
        const splittedNumber = splitNumber(0);
        expect(splittedNumber).toEqual(["0", "0", "0"]);
    });

    describe("positives parameters", () => {
        test("should return an array with leading zeros when recieves a number that more than 0 and less than 100", () => {
            const firstSplittedNumber = splitNumber(1);
            const secondSplittedNumber = splitNumber(99);
            expect(firstSplittedNumber).toEqual(["0", "0", "1"]);
            expect(secondSplittedNumber).toEqual(["0", "9", "9"]);
        });

        test("should return an array without leading zeros when recieves a number that more than 99 and less than 1000", () => {
            const firstSplittedNumber = splitNumber(100);
            const secondSplittedNumber = splitNumber(999);
            expect(firstSplittedNumber).toEqual(["1", "0", "0"]);
            expect(secondSplittedNumber).toEqual(["9", "9", "9"]);
        });

        test("should return an array of nines when recieves a number than more than 999", () => {
            const firstSplittedNumber = splitNumber(1000);
            const secondSplittedNumber = splitNumber(5123);
            expect(firstSplittedNumber).toEqual(["9", "9", "9"]);
            expect(secondSplittedNumber).toEqual(["9", "9", "9"]);
        });
    });

    describe("negatives parameters", () => {
        test("should return an array with leading minus and zero when recieves a number that less than 0 and more than -10", () => {
            const firstSplittedNumber = splitNumber(-1);
            const secondSplittedNumber = splitNumber(-9);
            expect(firstSplittedNumber).toEqual(["0", "-", "1"]);
            expect(secondSplittedNumber).toEqual(["0", "-", "9"]);
        });

        test("should return an array with leading minus when recieves a number that less than -9 an more than -100", () => {
            const firstSplittedNumber = splitNumber(-10);
            const secondSplittedNumber = splitNumber(-99);
            expect(firstSplittedNumber).toEqual(["-", "1", "0"]);
            expect(secondSplittedNumber).toEqual(["-", "9", "9"]);
        });

        test("should return an array with leading minus and nines when recieves a number that less than -99", () => {
            const firstSplittedNumber = splitNumber(-100);
            const secondSplittedNumber = splitNumber(-5321);
            expect(firstSplittedNumber).toEqual(["-", "9", "9"]);
            expect(secondSplittedNumber).toEqual(["-", "9", "9"]);
        });
    });
});
