
import React, { useEffect, useState } from "react";
import { transactionsData } from "../data/transactions";
import { getMonthlyRewards, getTotalRewards } from "../utils/rewards";
import { useDebounce } from "../hooks/useDebounce";
import { rewardPoints } from "../utils/rewards";

const TransactionRewards = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await new Promise((r) => setTimeout(r, 500));
            setTransactions(transactionsData);
            setLoading(false);
        };
        fetchData();
    }, []);


    const filtered = transactions.filter((t) =>
        t.customerName.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    const monthlyRewards = getMonthlyRewards(filtered);
    const totalRewards = getTotalRewards(filtered);

    return (
        <div>
            <h2>Rewards Dashboard</h2>

            <input
                type="text"
                placeholder="Search by customer ... "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {loading && <p>Loading ...</p>}

            <h3>Monthly Rewards</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Month</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {monthlyRewards.map((r, i) => (
                        <tr key={i}>
                            <td>{r.customerId}</td>
                            <td>{r.customerName}</td>
                            <td>{r.monthYear}</td>
                            <td>{r.rewardPts}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Total Rewards</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {totalRewards.map((r, i) => (
                        <tr key={i}>
                            <td>{r.customerName}</td>
                            <td>{r.rewardPts}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Transactions</h3>
            <table>
                <thead>
                    <tr>
                        <th>Transaction Id</th>
                        <th>Customer Name</th>
                        <th>Purchase Date</th>
                        <th>Amount</th>
                        <th>Reward Points</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((transaction, id) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.customerName}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.amount.toFixed(2)}</td>
                            <td>{rewardPoints(transaction.amount)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionRewards;
