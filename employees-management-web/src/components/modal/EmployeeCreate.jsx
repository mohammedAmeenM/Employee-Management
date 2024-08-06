import { useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { BsPersonFillAdd } from "react-icons/bs";
import api from "../../axiosInterceptors";
import Loader from "../Loader";
import { toast } from "react-toastify";

//framer-motion---

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

const EmployeeCreate = ({ handleClose, isOpen, getEmployees }) => {


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    image: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
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
      setFormData((prevState) => ({ ...prevState, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone_number", formData.phone_number);
    if (profilePic) {
      form.append("image", profilePic);
    }

    try {
      setLoading(true);
      const response = await api.post("/employees", form);
      setLoading(false);
      if (response.status === 201) {
        getEmployees();
        toast.success("Employee successfully created");
        setFormData({
            name: "",
            email: "",
            phone_number: "",
            image: "",
        })
        setProfilePic(null)
        setPreviewImage(null)
        handleClose(false);
      } else {
        toast.warning("Failed to create employee");
      }
    } catch (error) {
      console.error(error);
      toast.warning("An error occurred while creating the employee");
      handleClose(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial="initial"
          animate="isOpen"
          exit="exit"
          variants={modalVariant}
        >
          <ModalContainer variants={containerVariant}>
            <CloseButton
              onClick={() => handleClose(false)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20.39 20.39"
            >
              <title>close</title>
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
              <div className="flex flex-col items-center">
                <button
                  className="w-16 h-16 bg-gray-100 rounded-full flex justify-center items-center text-2xl text-center"
                  onClick={handleImageClick}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile"
                      width={64}
                      height={64}
                      className="rounded-3xl"
                    />
                  ) : profilePic ? (
                    <img
                      src={URL.createObjectURL(profilePic)}
                      alt="Profile"
                      width={64}
                      height={64}
                      className="rounded-3xl"
                    />
                  ) : (
                    <BsPersonFillAdd />
                  )}
                </button>
                <input
                  type="file"
                  name="image"
                  id="fileInput"
                  required
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="mt-4 w-full max-w-sm">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-2 mb-2 border rounded w-full"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-2 mb-2 border rounded w-full"
                  />
                  <input
                    type="text"
                    name="phone_number"
                    required
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="p-2 mb-2 border rounded w-full"
                  />
                </div>
              </div>
              <div className="w-full flex justify-end gap-3 mt-4">
                <button
                  className="p-1 px-4 rounded-xl font-semibold text-black hover:bg-gray-200"
                  onClick={() => handleClose(false)}
                >
                  Close
                </button>
                <button
                  className={`border p-1 px-4 rounded-xl ${
                    loading ? "bg-white border-none" : "bg-blue-400"
                  } font-semibold text-white hover:bg-blue-800`}
                  onClick={handleSubmit}
                >
                  {loading ? <Loader /> : "Save"}
                </button>
              </div>
            </ModalContent>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default EmployeeCreate;
