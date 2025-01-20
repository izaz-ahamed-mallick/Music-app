import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed min-h-full inset-0 flex items-center justify-center bg-black bg-opacity-70 z-100">
            <div className="relative bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-200">
                <button
                    onClick={onClose}
                    className="absolute top-0 text-4xl right-2 text-gray-200 hover:text-gray-400"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
