import {React, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Layout from '@/app/Components/Layout';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const AddEmployee = () => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const data = {
            name: name,
            username: username,
            email: email,
            phone: phone
        }
        try {
            const response = await axios.post('http://localhost:8000/api/employee', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            MySwal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Data berhasil ditambahkan',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/employee');
            
        } catch (error) {
            console.error(error);
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Data gagal ditambahkan',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }


  return (
    <Layout>
        <div className="p-6 sm:p-10 space-y-6 mb-5">
        <div className="mr-6">
        <h1 className="text-4xl font-semibold mb-2">Add Employee</h1>
      </div>
      <Link to="/employee" className="bg-purple-600 hover:bg-purple-500 focus:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg">
        Back
      </Link>
        <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter Username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Phone
                </label>
                <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Enter Phone"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                </div>
                <button 
                onClick={handleSubmit}
                className="bg-purple-600 hover:bg-purple-500 focus:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg">
                    Add
                </button>
                </form>
    </div>
    </Layout>
  )
}

export default AddEmployee