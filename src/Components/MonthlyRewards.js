/**
    * Table component to display monthly rewards per customer.
**/

const MonthlyRewards = ({ monthlyRewards }) => (
  <>
    <h3>Monthly Rewards</h3>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Month & Year</th>
          <th>Reward Points</th>
        </tr>
      </thead>
      <tbody>
        {monthlyRewards.map((r) => (
          <tr key={`${r.customerId}-${r.monthYear}`}>
            <td>{r.customerId}</td>
            <td>{r.customerName}</td>
            <td>{r.monthYear}</td>
            <td>{r.rewardPts}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

export default MonthlyRewards;
