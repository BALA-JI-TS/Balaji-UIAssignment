
/**
    * Main dashboard component for rewards.
    * - Fetches transactions
    * - Applied search filter
    * - Displays monthly rewards, total rewards, and transactions
 */

import React, { useEffect, useState } from "react";
import { transactionsData } from "../data/transactions";
import { getMonthlyRewards, getTotalRewards } from "../utils/rewards";
import { useDebounce } from "../hooks/useDebounce";
import { rewardPoints } from "../utils/rewards";
import Search from "./Search";
import MonthlyRewards from "./MonthlyRewards";
import TotalRewards from "./TotalRewards";
import Transactions from "./Transactions";

const TransactionRewards = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await new Promise((r) => setTimeout(r, 500));
                setTransactions(transactionsData);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setLoading(false);
            }
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
            <Search search={search} setSearch={setSearch} />
            {loading && <p>Loading ...</p>}
            <MonthlyRewards monthlyRewards={monthlyRewards} />
            <TotalRewards totalRewards={totalRewards} />
            <Transactions filtered={filtered} rewardPoints={rewardPoints} />
        </div>
    );
};

export default TransactionRewards;
