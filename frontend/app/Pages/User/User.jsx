import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { app, db } from "../../Services/firebase";
import { collection, onSnapshot, deleteDoc, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Layout from "@/app/Components/Layout";

const MySwal = withReactContent(Swal);

const User = () => {

    const token = localStorage.getItem("token");

    const [user, setUser] = useState([]);

    const getUserData = async () => {
        const response = await axios.get("http://localhost:8000/api/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUser(response.data.data);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/user/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            MySwal.fire({
                icon: "success",
                title: "Success",
                text: response.data.message,
            });
            getUserData();
        } catch (error) {
            console.log(error.response.data);
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
            });
        }
    };

    useEffect(() => {
        if (!token) {
            window.location.href = "/";
        }
        getUserData();
    }, []);

  return (
    <Layout>
      <div className="p-6 sm:p-10 space-y-6">
        <div className="mr-6">
          <h1 className="text-4xl font-semibold mb-2">Data User</h1>
        </div>
        <Link
          to="/user/add"
          className="bg-purple-600 hover:bg-purple-500 focus:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg"
        >
          Add User
        </Link>
        <div className="w-full bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
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
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
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
              {user.map((item, index) => (
                <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-1">
                  <Link to={`/user/edit/${item.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
  )
}

export default User