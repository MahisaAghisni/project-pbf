import { React, useState, useEffect } from "react";
import Layout from "@/app/Components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../Services/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const EditProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, "product", id);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        setName(docSnap.data().name);
        setColor(docSnap.data().color);
        setPrice(docSnap.data().price);
        setStock(docSnap.data().stock);
      }else{
        console.log("No such document!");
      }
    };
    if(id){
      getProduct();
  }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "product", id);
      await updateDoc(docRef, {
        name: name,
        color: color,
        price: price,
        stock: stock,
      });
      console.log("Document written with ID: ", docRef.id);
      MySwal.fire({
        icon: "success",
        title: "Success",
        text: "Data has been updated",
      });
      navigate("/product");
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
          <h1 className="text-4xl font-semibold mb-2">Edit Products</h1>
        </div>
        <Link
          to="/product"
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
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Product Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="color"
            >
              Color
            </label>
            <input
              type="text"
              name="color"
              id="color"
              placeholder="Enter Color"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Enter Price"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="stock"
            >
              Stock
            </label>
            <input
              type="number"
              name="stock"
              id="stock"
              placeholder="Enter Stock"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
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

export default EditProducts;
