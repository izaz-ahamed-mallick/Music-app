import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="hide-scrollbar relative bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-200 overflow-auto max-h-[90vh] z-60">
                <button
                    onClick={onClose}
                    className="absolute top-0 text-4xl right-2 text-gray-200 hover:text-gray-400"
                >
                    &times;
                </button>
                {/* Ensure modal content is scrollable if needed */}
                {children}
            </div>
        </div>
    );
};

export default Modal;
