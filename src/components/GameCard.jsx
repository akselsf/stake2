import Link from "next/link";
import { Children } from "react";
const GameCard = (props) => {
  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        backgroundColor: "#9A48D0",
        margin: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        animation: "gamecardspin 10s infinite",
      }}
    >
      <Link
        className={"text-lg font-bold"}
        style={{
          backgroundColor: "white",

          border: "1px solid black",
          padding: "10px",
          borderRadius: "10px",
        }}
        href={`/${props.gamename.toLowerCase()}`}
      >
        {props.gamename}
      </Link>
    </div>
  );
};

export default GameCard;
