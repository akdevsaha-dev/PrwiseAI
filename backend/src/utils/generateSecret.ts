import jwt from "jsonwebtoken";
import fs from "fs";

export const generateSecret = () => {
  let privateKey = process.env.GITHUB_APP_PRIVATE_KEY;
  
  if (!privateKey) {
    const privateKeyPath = process.env.GITHUB_APP_PRIVATE_KEY_PATH;
    if (!privateKeyPath) {
      throw new Error(
        "Neither GITHUB_APP_PRIVATE_KEY nor GITHUB_APP_PRIVATE_KEY_PATH is defined in environment variables",
      );
    }
    privateKey = fs.readFileSync(privateKeyPath, "utf8");
  } else {
    // Replace literal '\n' sequences with actual newlines if configured via env
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  const now = Math.floor(Date.now() / 1000);

  return jwt.sign(
    {
      iat: now - 60,
      exp: now + 60 * 9,
      iss: Number(process.env.GITHUB_APP_ID),
    },
    privateKey,
    {
      algorithm: "RS256",
    },
  );
};
