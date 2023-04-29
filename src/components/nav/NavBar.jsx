import { signOut } from "next-auth/react";
import Link from "next/link";
const NavBar = (props) => {
  return (
    <div
      className={"h-24 w-full flex items-center justify-between"}
      style={{ backgroundColor: "#9A48D0" }}
    >
      <Link href="/" className={"m-5 text-4xl font-semibold "}>
        Gamble.com
      </Link>

      <div className="flex items-center justify-end">
        <p className={"m-5 mr-2 text-xl font-semibold"}>
          ${Math.round(props.balance * 100) / 100}
        </p>
        <button
          onClick={() => props.showWithdraw()}
          className="m-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Withdraw
        </button>
        <button
          onClick={() => props.showDeposit()}
          className="m-3 mr-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Deposit
        </button>
        <button
          onClick={() => {
            signOut();
          }}
          className="bg-purple-200 m-3 mr-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default NavBar;
