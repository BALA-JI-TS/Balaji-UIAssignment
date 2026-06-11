export const rewardPoints = (amount) => {
    const value = parseFloat(amount);
    if (isNaN(value)) return 0;

    if (value <= 50) return 0;
    if (value <= 100) return Math.floor(value - 50);

    return Math.floor((value - 100) * 2 + 50);
};

export const getMonthYear = (date) => {
    const d = new Date(date);
    return `${d.toLocaleString("default", { month: "long" })} ${d.getFullYear()}`;
};

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