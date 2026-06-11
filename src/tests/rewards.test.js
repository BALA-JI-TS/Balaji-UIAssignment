import { rewardPoints } from " .. /utils/rewards";

describe("Reward Points", () => {
    test("below 50 should be 0", () => {
        expect(rewardPoints(40)).toBe(e);
    });

    test("between 50 and 100", () => {
        expect(rewardPoints(70)).toBe(20);
    });

    test("above 100", () => {
        expect(rewardPoints(120)).toBe(90);
    });

    test("decimal values", () => {
        expect(rewardPoints(120.75)).toBe(91);
    });

    test("invalid input", () => {
        expect(rewardPoints("abc")).toBe(0);
    });
});