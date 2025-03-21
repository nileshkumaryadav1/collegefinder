"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="w-5 h-5 bg-blue-500 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop",
              delay: index * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
