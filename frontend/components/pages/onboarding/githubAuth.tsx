"use client";
import { Check } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { useParams } from "next/navigation";
export const GithubAuth = () => {
  const { workspaceId } = useParams();
  return (
    <motion.div
      className="h-screen w-full dark:text-white text-black dark:bg-black bg-white flex items-center justify-center transition-colors duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-150 w-100 md:w-150 flex items-center flex-col">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Image
            src={"/images/github.png"}
            alt="github.logo"
            height={40}
            width={40}
            className="mt-8"
          />
        </motion.div>

        <motion.div
          className="mt-6 text-2xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Connect with GitHub
        </motion.div>

        <motion.div
          className="text-md text-center mt-3 text-neutral-500"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Automate code reviews with PRwise when GitHub pull requests are
          opened.
        </motion.div>

        <motion.div
          className="bg-white dark:bg-neutral-950 border px-8 py-8 rounded-md flex flex-col border-neutral-200 dark:border-neutral-800 w-92.5 shadow-2xl shadow-neutral-200 dark:shadow-neutral-900 md:w-137.5 mt-6"
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.6,
            type: "spring",
            stiffness: 100,
          }}
        >
          {[
            "Every pull request gets an AI-powered summary instantly.",
            "Detect potential issues early with a bug risk score.",
            "Get test case suggestions to improve coverage.",
          ].map((text, index) => (
            <motion.div key={index}>
              <motion.div
                className="flex flex-row items-start gap-6 dark:text-white text-black"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              >
                <Check className="h-5 w-5 mt-0.5 text-[#5c4cd8] shrink-0" />
                <div>{text}</div>
              </motion.div>
              {index < 2 && (
                <motion.div
                  className="h-px bg-neutral-200 dark:bg-neutral-800 my-6"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 w-70 rounded-md flex items-center justify-center bg-[#5c4cd8] hover:bg-[#8979ff] h-12 text-white font-medium cursor-pointer transition-colors duration-200"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5, type: "spring" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href={`https://github.com/apps/prwise-ai/installations/new?state=${workspaceId}`}
          >
            Authenticate with GitHub
          </Link>
        </motion.div>
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
              index === 3
                ? "bg-[#5c4cd8]"
                : "bg-neutral-300 dark:bg-neutral-400"
            }`}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
