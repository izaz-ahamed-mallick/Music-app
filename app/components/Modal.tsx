import React from "react";
import { motion } from "framer-motion";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50" // Darkened overlay
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="relative modal bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-4xl h-auto max-h-[90vh] border border-gray-300 overflow-auto z-60"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-0 text-4xl right-2 text-gray-200 hover:text-gray-400 transition-all duration-300"
                >
                    &times;
                </button>
                {children}
            </motion.div>
        </motion.div>
    );
};

export default Modal;
