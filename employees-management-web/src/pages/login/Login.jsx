import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axiosInterceptors";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await api.post('/auth/login', formData);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        toast.success("Login Successfully");
        navigate('/');
      }
    } catch (error) {
      toast.error("Incorrect email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="relative block w-full px-3 py-2 border bg-white border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="relative bg-white block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
          </div>

          <div>
            <span
              className="pb-3 flex justify-end opacity-30 cursor-pointer"
              onClick={() => navigate('/signup')}
            >
              Signup!
            </span>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
