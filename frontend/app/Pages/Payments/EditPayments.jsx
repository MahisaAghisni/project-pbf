import { React, useState, useEffect } from "react";
import Layout from "@/app/Components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../Services/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const EditPayments = () => {
  const navigate = useNavigate();

  const {id} = useParams();
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  useEffect(() => {
    const getPayment = async () => {
      const docRef = doc(db, "payment", id);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        setCardName(docSnap.data().cardName);
        setCardNumber(docSnap.data().cardNumber);
      }else{
        console.log("No such document!");
      }
    };
    if(id){
      getPayment();
  }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "payment", id);
      await updateDoc(docRef, {
        cardName: cardName,
        cardNumber: cardNumber,
      });
      console.log("Document written with ID: ", docRef.id);
      MySwal.fire({
        icon: "success",
        title: "Success",
        text: "Data has been updated",
      });
      navigate("/payment");
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <Layout>
      <div className="p-6 sm:p-10 space-y-6 mb-5">
        <div className="mr-6">
          <h1 className="text-4xl font-semibold mb-2">Edit Payments</h1>
        </div>
        <Link
          to="/payment"
          className="bg-purple-600 hover:bg-purple-500 focus:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg"
        >
          Back
        </Link>
        <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Card Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Product Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="card number"
            >
              Card Number
            </label>
            <input
              type="text"
              name="card number"
              id="card number"
              placeholder="Enter Card Number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-500 focus:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg">
            Edit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditPayments;
