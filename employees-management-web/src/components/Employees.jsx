import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Button, IconButton } from "@mui/material";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { FaRegEdit } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import { FaEye } from "react-icons/fa6";
import EmployeeCreate from "./modal/EmployeeCreate";
import EditEmployee from "./modal/EditEmployee";
import api from "../axiosInterceptors";
import ViewEmployee from "./modal/ViewEmployee";
import { toast } from "react-toastify";

const Employees = () => {
  const [active, setActive] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [employee, setEmployee] = useState([]);

  const getEmployees = async () => {
    try {
      const response = await api.get("/employees/");
      if (response.status === 200) {
        setEmployee(response.data.employees);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getEmployees();
  }, []);

  const totalPageCount = Math.ceil(employee.length / 5);

  const handlePageChange = (action) => {
    setLoading(true);
    let newActive = active;
    if (action === "prev") {
      newActive = Math.max(active - 1, 1);
    } else if (action === "next") {
      newActive = Math.min(active + 1, totalPageCount);
    } else {
      newActive = action;
    }

    setActive(newActive);
    setLoading(false);
  };

  const itemsPerPage = 6;
  const startIndex = (active - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, employee.length);
  const currentPageData = employee.slice(startIndex, endIndex);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: active === index ? "red" : "black",
    onClick: () => setActive(index),
    className: "rounded-full",
    style: {
      fontSize: "1rem",
      textAlign: "center",
    },
  });

  const Search = currentPageData.filter((item) => {
    if (search === "") {
      return item;
    } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
      return item;
    } else {
      return null;
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setEdit(true);
  };

  let handleDelete = async (employeeId) => {
    try {
      const response = await api.delete(`/employees/${employeeId}`);
      console.log(response);
      if (response.status === 200) {
        toast.success("Delete Employee");
        getEmployees();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleViewClick = (employee) => {
    setSelected(employee);
    setIsModalOpen(true);
    console.log(employee);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelected(null);
  };

  return (
    <div className="flex h-screen justify-center">
      <div className="w-[90%] h-screen">
        <div className="flex w-full h-28 justify-between items-center">
          <p className="ml-5 text-2xl font-bold">Manage Employees</p>
          <div className="flex mr-2">
            <input
              type="text"
              className="w-3/4 rounded-lg h-8 mr-2 p-2 bg-[#f1f1f4]"
              placeholder={`Search Users`}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="w-28 h-8 rounded-md text-white bg-[#624DE3] flex justify-center items-center">
              <CiSearch />
            </button>
          </div>
        </div>
        <div className="m-2 p-5 bg-[#F7F6FE] rounded-md overflow-auto">
          <div>
            <button
              onClick={handleOpen}
              className="mx-2 flex gap-3 pb-2 text-blue-400 m-2"
            >
              <IoIosPersonAdd size={25} />
              Add New Employee
            </button>
          </div>
          <EmployeeCreate
            handleClose={handleClose}
            getEmployees={getEmployees}
            isOpen={isOpen}
          />
          <EditEmployee
            edit={edit}
            setEdit={setEdit}
            employeeData={selectedEmployee}
            getEmployees={getEmployees}
          />
          <ViewEmployee
            isOpen={isModalOpen}
            handleClose={handleCloseModal}
            employeeData={selected}
            getEmployees={getEmployees}
          />
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50 ">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-l font-medium"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-l font-medium"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-l font-medium"
                >
                  E-mail
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left  text-l font-medium"
                >
                  {" "}
                  Edit
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-l font-medium"
                >
                  Delete
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-l font-medium"
                >
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Search.map((employee, index) => (
                <tr
                  key={employee._id}
                  className={index % 2 === 1 ? "bg-[#F7F6FE]" : "bg-white "}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <img src={employee.image} width={35} alt={employee.name} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="btn  w-20 flex justify-center rounded-md">
                      {employee.email}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => openEditModal(employee)}
                      className="btn w-20 flex justify-center rounded-md"
                    >
                      <FaRegEdit />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className="btn rounded-full bg-slate-300-400  w-20 flex justify-center text-red-500"
                      onClick={() => handleDelete(employee._id)}
                    >
                      <MdDeleteOutline />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className="btn rounded-full bg-slate-300-400  w-30 flex justify-center text-blue-500"
                      onClick={() => handleViewClick(employee)}
                    >
                      <FaEye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!isOpen && !edit && (
            <div className="flex justify-end gap-4">
              <Button
                variant="text"
                className="flex items-center gap-2 rounded-full"
                onClick={() => handlePageChange("prev")}
                disabled={active === 1}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
              </Button>
              <div className="flex items-center gap-2">
                {[...Array(totalPageCount)].map((_, index) => (
                  <IconButton
                    style={{ textAlign: "center" }}
                    key={index}
                    {...getItemProps(index + 1)}
                  >
                    {index + 1}
                  </IconButton>
                ))}
              </div>
              <Button
                variant="text"
                className="flex items-center gap-2 rounded-full"
                onClick={() => handlePageChange("next")}
                disabled={active === totalPageCount}
              >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employees;
