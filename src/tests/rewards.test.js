import { render, screen } from "@testing-library/react";
import TransactionRewards from "../Components/TransactionRewards";
import userEvent from "@testing-library/user-event";
import { rewardPoints } from " .. /utils/rewards";

test("renders dashboard title", () => {
    render(<TransactionRewards />);
    expect(screen.getByText(/Rewards Dashboard/i)).toBeInTheDocument();
});

test("shows loading message initially", async () => {
  render(<TransactionRewards />);
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test("filters transactions by customer name", async () => {
  render(<TransactionRewards />);
  const input = screen.getByPlaceholderText(/Search by customer/i);

  await userEvent.type(input, "Alice");

  expect(await screen.findByText("Alice")).toBeInTheDocument();
});

test("renders monthly rewards table", async () => {
  render(<TransactionRewards />);
  expect(await screen.findByText(/Monthly Rewards/i)).toBeInTheDocument();
});

describe("Reward Points", () => {
    test("below 50 should be 0", () => {
        expect(rewardPoints(40)).toBe(0);
    });

    test("between 50 and 100", () => {
        expect(rewardPoints(70)).toBe(20);
    });

    test("above 100", () => {
        expect(rewardPoints(120)).toBe(90);
    });

    test("decimal values", () => {
        expect(rewardPoints(120.75)).toBe(90);
    });

    test("invalid input", () => {
        expect(rewardPoints("abc")).toBe(0);
    });
});
