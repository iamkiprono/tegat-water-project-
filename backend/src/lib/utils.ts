import jwt from "jsonwebtoken";

// Sample payload
const secretKey = "your_secret_key";
export const signJwt = () => {
  const payload = {
    sub: "user123",
    name: "coopooo",
    admin: true,
  };

  // Replace 'your_secret_key' with your actual secret key

  // Create the JWT
  const token = jwt.sign(payload, secretKey);
  console.log(token);
  return token
};

export const decodeJwt = (token: string) => {
  const decoded = jwt.verify(token, secretKey);
  console.log(decoded)
  return decoded;
};
