/**
    * Table component to display raw transaction details.
**/

const Transactions = ({ filtered, rewardPoints }) => (
  <>
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
        {filtered.map((transaction) => (
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
  </>
);

export default Transactions;
