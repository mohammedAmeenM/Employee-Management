import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { BsPersonFillAdd } from "react-icons/bs";
import api from "../../axiosInterceptors"; // Adjust the path if needed
import { toast } from "react-toastify";
import Loader from "../Loader";


//fremer-motion ------------

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

const ModalContainer = styled(motion.div)`
  width: 90%;
  max-width: 600px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  overflow: hidden;
  @media (min-width: 640px) {
    width: 80%;
  }
  @media (min-width: 768px) {
    width: 70%;
  }
`;

const CloseButton = styled.svg`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 18px;
  top: 18px;
  cursor: pointer;
`;

const ModalContent = styled.div`
  padding: 20px;
  h1 {
    color: #5c3aff;
  }
`;

const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  exit: { opacity: 0 },
};

const containerVariant = {
  initial: { top: "-50%", transition: { type: "spring" } },
  isOpen: { top: "50%" },
  exit: { top: "-50%" },
};

const EditEmployee = ({ setEdit, edit, employeeData, getEmployees }) => {

  //states ---------- 
  
  const [formDatas, setFormDatas] = useState({
    name: "",
    email: "",
    phone_number: "",
    image: "",
  });
  const [profilePic, setProfilePic] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null); 

  useEffect(() => {
    if (employeeData) {
      setFormDatas(employeeData);
      setProfilePic(employeeData.image);
      setPreviewImage(employeeData.image);
    }
  }, [employeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDatas((prevState) => ({ ...prevState, [name]: value }));
  };



  const handleImageClick = (e) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...formDatas };
      if (profilePic && typeof profilePic !== "string") {
        updatedData.image = profilePic;
      }
      setLoading(true);
      const response = await api.patch(
        `/employees/${employeeData._id}`,
        updatedData
      );
      setLoading(false);
      if (response.status === 200) {
        toast.success("Successfully Edited");
        getEmployees();
        setEdit(false);
      } else {
        toast.warning("Failed to edit employee");
      }
    } catch (error) {
      console.error(error);
    }
  };
  let handleClose = () => {
    setEdit(false);
    setFormDatas("");
  };

  return (
    <AnimatePresence>
      {edit && (
        <Overlay
          initial="initial"
          animate="isOpen"
          exit="exit"
          variants={modalVariant}
        >
          <ModalContainer variants={containerVariant}>
            <CloseButton
              onClick={handleClose}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20.39 20.39"
            >
              <title>Close</title>
              <line
                x1="19.39"
                y1="19.39"
                x2="1"
                y2="1"
                fill="none"
                stroke="#5c3aff"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <line
                x1="1"
                y1="19.39"
                x2="19.39"
                y2="1"
                fill="none"
                stroke="#5c3aff"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
            </CloseButton>
            <ModalContent className="flex flex-col">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                  <button
                    className="w-24 h-24 bg-gray-100 rounded-full flex justify-center items-center text-3xl text-center relative overflow-hidden"
                    onClick={handleImageClick}
                  >
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <BsPersonFillAdd className="text-4xl text-gray-500" />
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                  </button>
                  <div className="mt-4 w-full max-w-sm">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formDatas.name}
                      onChange={handleChange}
                      className="p-2 mb-2 border rounded w-full"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formDatas.email}
                      onChange={handleChange}
                      className="p-2 mb-2 border rounded w-full"
                    />
                    <input
                      type="text"
                      name="phone_number"
                      placeholder="Phone Number"
                      value={formDatas.phone_number}
                      onChange={handleChange}
                      className="p-2 mb-2 border rounded w-full"
                    />
                  </div>
                </div>
                <div className="w-full flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    className="p-2 px-4 rounded-xl font-semibold text-black hover:bg-gray-200"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="border p-2 px-4 rounded-xl bg-blue-400 font-semibold text-white hover:bg-blue-800"
                  >
                    {loading ? <Loader /> : "Edit"}
                  </button>
                </div>
              </form>
            </ModalContent>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default EditEmployee;
