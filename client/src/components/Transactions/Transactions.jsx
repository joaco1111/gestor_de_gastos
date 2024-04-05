// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchTransactions } from "../../redux/actions";
// import { Table } from 'react-bootstrap';

// const Transactions = () => {
//   const dispatch = useDispatch();
//   const transactions = useSelector(state => state.transactions);

//   console.log('Transactions', transactions);

//   useEffect(() => {
//     dispatch(fetchTransactions());
//   }, [dispatch]);

//   return (
//     <div className="container">
//       <h2>Transacciones</h2>
//       <Table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Nombre</th>
//             <th>Fecha</th>
//             <th>Cantidad</th>
//             <th>ID de Transacción</th>
//           </tr>
//         </thead>
//         <tbody>
//         {transactions && transactions.map(transaction => (
//             <tr key={transaction.transactionId}>
//                 <td>{transaction.name}</td>
//                 <td>{transaction.date}</td>
//                 <td>{transaction.amount}</td>
//                 <td>{transaction.transactionId}</td>
//             </tr>
//         ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default Transactions;