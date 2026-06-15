/**
    * Table component to display total rewards per customer.
**/

const TotalRewards = ({ totalRewards }) => (
  <>
    <h3>Total Rewards</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Reward Points</th>
        </tr>
      </thead>
      <tbody>
        {totalRewards.map((r) => (
          <tr key={r.customerName}>
            <td>{r.customerName}</td>
            <td>{r.rewardPts}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

export default TotalRewards;
