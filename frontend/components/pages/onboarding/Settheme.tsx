"use client";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Loader, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";

export const SetTheme = () => {
  const { setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<
    "light" | "dark"
  >("light");
  const router = useRouter();
  const handleOnClick = () => {
    setLoading(true);
    router.push("/onboarding/workspace-setup");
  };
  const handleThemeChange = (theme: "light" | "dark") => {
    setAnimationDirection(theme);
    setIsAnimating(true);
    setTimeout(() => {
      setTheme(theme);
    }, 200);

    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };
  return (
    <motion.div
      className="h-screen bg-white dark:bg-black w-full flex items-center justify-center transition-colors duration-500 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className={`absolute inset-0 z-10 ${
              animationDirection === "dark" ? "bg-black" : "bg-white"
            }`}
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
          />
        )}
      </AnimatePresence>

      <div className="w-[600px] h-96 flex flex-col items-center justify-center relative z-20">
        <motion.div
          className="text-3xl dark:text-white text-black transition-colors duration-300"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Choose your style
        </motion.div>
        <motion.div
          className="mt-5 dark:text-neutral-400 text-neutral-600 transition-colors duration-300 text-center px-4"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Change your theme at any time via the command menu or settings.
        </motion.div>
        <motion.div
          className="md:w-full w-[370px] flex mt-5 rounded-md h-48 border-[1px] dark:border-neutral-800 border-neutral-200 overflow-hidden transition-colors duration-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.button
            onClick={() => handleThemeChange("light")}
            className="flex-1 dark:bg-black bg-[#e7e7e7] transition-all duration-300 hover:scale-105 relative"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isAnimating}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Sun className="h-[1.2rem] w-[1.2rem]  text-neutral-500 dark:text-neutral-400 rotate-0 transition-all  dark:-rotate-90" />
              <div className="text-sm mt-1 text-neutral-500 dark:text-neutral-500">
                Light
              </div>
            </div>
          </motion.button>
          <motion.button
            onClick={() => handleThemeChange("dark")}
            className="flex-1 dark:bg-[#18191b] bg-white transition-all duration-300 hover:scale-105 relative"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isAnimating}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Moon className=" h-[1.2rem] w-[1.2rem] rotate-360 transition-all text-neutral-400 dark:text-neutral-500 dark:rotate-0" />
              <div className="text-sm mt-1 text-neutral-500 dark:text-neutral-500">
                dark
              </div>
            </div>
          </motion.button>
        </motion.div>
        <button
          onClick={handleOnClick}
          className="
          flex items-center justify-center
    w-[300px] text-center py-3 rounded-md mt-10
    text-neutral-400
    bg-neutral-200 dark:bg-neutral-900 
    lg:bg-transparent lg:dark:bg-transparent
    lg:hover:bg-neutral-200 lg:dark:hover:bg-neutral-900
  "
        >
          {loading ? <Loader className="animate-spin" /> : "Continue"}
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20"
      >
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.6 + index * 0.1,
              duration: 0.3,
              type: "spring",
            }}
            className={`w-2 h-2 rounded-full ${
              index === 1
                ? "bg-[#5c4cd8]"
                : "bg-neutral-300 dark:bg-neutral-400"
            }`}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
