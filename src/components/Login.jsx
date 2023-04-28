import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p className={"text-4xl font-bold mt-5"}>Gamble.com</p>
      <button
        className={
          "mt-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        }
        onClick={() => signIn()}
      >
        Log in / Registrer
      </button>
    </div>
  );
};
export default Login;
