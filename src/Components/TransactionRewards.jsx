import React, { useEffect, useState } from "react";

const TransactionDetails = [
    {id: "T01", userId: "user01", customer: "Alice", date: "2023-12-05", product: "First Product", price: 120},
    {id: "T02", userId: "user02", customer: "Bob", date: "2023-12-12", product: "Second Product", price: 80},
    {id: "T03", userId: "user01", customer: "Alice", date: "2023-12-20", product: "Third Product", price: 60},
    {id: "T04", userId: "user01", customer: "Alice", date: "2024-01-10", product: "Fourth Product", price: 80},
    {id: "T05", userId: "user03", customer: "John", date: "2024-01-15", product: "Fifth Product", price: 170},
    {id: "T06", userId: "user02", customer: "Bob", date: "2024-01-22", product: "Sixth Product", price: 200},
    {id: "T07", userId: "user03", customer: "John", date: "2024-02-08", product: "Seventh Product", price: 95},
    {id: "T08", userId: "user03", customer: "John", date: "2024-02-14", product: "Eight Product", price: 110},
    {id: "T09", userId: "user01", customer: "Alice", date: "2024-02-22", product: "Ninth Product", price: 45},
]

export const rewardPoints = (amount) => {
    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount)) return 0;
    if (parsedAmount <=50) return 0;
    if (parsedAmount <= 100) return parsedAmount - 50;
    return ((parsedAmount -100) * 2) + 50;
};

export const getMonthYear = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', {month: 'long'});
    const year = date.getFullYear();
    return `${month} ${year}`;
};

export const getMonthlyRewards = (data) => {
    const grouped = data.reduce((acc, current) => {
        const period = getMonthYear(current.date);
        const points = rewardPoints(current.price);
        const key = `${current.customer}-${period}`;

        return {
            ...acc,
            [key]: {
                customerId: current.userId,
                customerName: current.customer,
                monthYear: period,
                rewardPts: (acc[key]?.rewardPts || 0) + points
            }
        };
    }, {});
    return Object.values(grouped);
}

export const getTotalRewards = (data) => {
    const grouped = data.reduce((acc, current) => {
        const points = rewardPoints(current.price);
        return {
            ...acc,
            [current.customer]: (acc[current.customer] || 0) + points
        };
    }, {});

    return Object.entries(grouped).map(([name, totalpoints]) => ({
        customerName: name,
        rewardPts: totalpoints
    }))
}

const TransactionRewards = () => {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchTransactions = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            if(isMounted) {
                setTransactions(TransactionDetails);
                setLoading(false);
            }
        };
        fetchTransactions();
        return () => { isMounted = false; };
    }, []);

    const monthlyRewards = getMonthlyRewards(transactions);
    const totalRewards = getTotalRewards(transactions); 

    return (
        <div>
            <div>
                <h3>User Monthly Rewards</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Customer Id</th>
                            <th>Name</th>
                            <th>Month Year</th>
                            <th>Reward Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {monthlyRewards.map((rewards, id) =>(
                            <tr key={id}>
                                <td>{rewards.customerId}</td>
                                <td>{rewards.customerName}</td>
                                <td>{rewards.monthYear}</td>
                                <td>{rewards.rewardPts}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h3>Total Rewards</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Reward Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {totalRewards.map((totrewards, id) =>(
                            <tr key={id}>
                                <td>{totrewards.customerName}</td>
                                <td>{totrewards.rewardPts}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h3>Transactions</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Transaction id</th>
                            <th>Customer Name</th>
                            <th>Purchase Date</th>
                            <th>Product Purchased</th>
                            <th>Price</th>
                            <th>Reward Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, id) =>(
                            <tr key={id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.customer}</td>
                                <td>{transaction.date}</td>
                                <td>{transaction.product}</td>
                                <td>{transaction.price}</td>
                                <td>{rewardPoints(transaction.price)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TransactionRewards;