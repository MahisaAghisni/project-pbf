import { React, useState, useEffect } from "react";
import { app, db } from "../../Services/firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import Layout from "@/app/Components/Layout";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Payments = () => {

  const [payment, setPayment] = useState([]);

  useEffect(() => {
    const payment = onSnapshot(collection(db, "payment"), (snapshot) => {
      setPayment(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return payment;
  }, []);

  console.log(payment);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "payment", id));
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Data has been deleted',
      });
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  return (
    <Layout>
      <div className="p-6 sm:p-10 space-y-6">
        <div className="mr-6">
          <h1 className="text-4xl font-semibold mb-2">Data Payments</h1>
        </div>
        <Link
          to="/payment/add"
          className="bg-purple-600 hover:bg-purple-500 focus:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg"
        >
          Add Payments
        </Link>
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Card Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Card Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payment.map((item, index) => (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.cardName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.cardNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-1">
                  <Link to={`/payment/edit/${item.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Payments;
