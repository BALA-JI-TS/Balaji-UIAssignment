/**
     * Calculates reward points based on purchase amount.
     * - 0 points for amounts <= 50
     * - 1 point per dollar between 51–100
     * - 2 points per dollar above 100, plus 50 points for the 51–100 range
**/

export const rewardPoints = (amount) => {
    const value = Math.floor(parseFloat(amount));
    if (isNaN(value)) return 0;

    if (value <= 50) return 0;
    if (value <= 100) return value - 50;

    return (value - 100) * 2 + 50;
};


/**
    * Formats a date string into "Month Year"
**/

export const getMonthYear = (date) => {
    const d = new Date(date);
    return `${d.toLocaleString("default", { month: "long" })} ${d.getFullYear()}`;
};


/**
    * Transactions by customer and month, calculating total reward points
**/

export const getMonthlyRewards = (data) => {
    const grouped = data.reduce((acc, item) => {
        const monthYearStr = getMonthYear(item.date);
        const key = `${item.customerName}-${monthYearStr}`;
        const points = rewardPoints(item.amount);

        if (!acc[key]) {
            acc[key] = {
                customerName: item.customerName,
                customerId: item.userId,
                monthYear: monthYearStr,
                rewardPts: 0,
            };
        }

        acc[key].rewardPts += points;
        return acc;
    }, {});

    return Object.values(grouped);
};


/**
    * Calculates total reward points per customer across all transactions.
**/

export const getTotalRewards = (data) => {
    const totals = data.reduce((acc, item) => {
        const pts = rewardPoints(item.amount);
        acc[item.customerName] = (acc[item.customerName] || 0) + pts;
        return acc;
    }, {});

    return Object.entries(totals).map(([name, pts]) => ({
        customerName: name,
        rewardPts: pts,
    }));
};
