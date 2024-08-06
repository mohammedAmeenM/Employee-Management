import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axiosInterceptors";

const Register = () => {
  const navigate = useNavigate();

  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:''
  })

  const handleChange =(e)=>{
    const {name,value}=e.target;
    setFormData({
        ...formData,
        [name]:value
    })
  }
  const handleSubmit= async(e)=>{
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    const response = await api.post('/auth/register',formData)
    console.log(response,"succss")
    if(response.status===201){
        navigate('/login')
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">

     
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2><hr />

        <form onSubmit={handleSubmit} className="space-y-4" >
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 bg-white text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Name"
            />
          </div>
          <div>
            <input
              id="email"
              name="email"
              required
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="relative block w-full px-3 py-2 border bg-white border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              className="relative bg-white block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <span 
          className="pb-3 flex justify-end opacity-30 cursor-pointer"
          onClick={()=>navigate('/login')}
          >
            login!
          </span>
          <button 
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          type="submit"
          >
            Register
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Register;
