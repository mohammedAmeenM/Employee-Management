import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { BsPersonFillAdd } from "react-icons/bs";

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

const ViewEmployee = ({ handleClose, isOpen, employeeData }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  console.log(employeeData);

  useEffect(() => {
    if (employeeData) {
      setProfilePic(employeeData.image);
      setPreviewImage(employeeData.image);
    }
  }, [employeeData]);

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
                <div className="w-16 h-16 bg-gray-100 rounded-full flex justify-center items-center text-2xl text-center">
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
                </div>
                <div className="mt-4 w-full max-w-sm text-left">
                  <p className="p-2 mb-2 border rounded w-full">
                    <strong>Name:</strong> {employeeData?.name}
                  </p>
                  <p className="p-2 mb-2 border rounded w-full">
                    <strong>Email:</strong> {employeeData?.email}
                  </p>
                  <p className="p-2 mb-2 border rounded w-full">
                    <strong>Phone Number:</strong> {employeeData?.phone_number}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-end gap-3 mt-4">
                <button
                  className="p-1 px-4 rounded-xl font-semibold text-black hover:bg-gray-200"
                  onClick={() => handleClose(false)}
                >
                  Close
                </button>
              </div>
            </ModalContent>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default ViewEmployee;
