const MineTile = (props) => {
  return (
    <div
      onClick={(e) => {
        e.target.style.animation = "wave 1s";
        setTimeout(() => {
          e.target.style.animation = "";
        }, 1000);
        props.handleClick(e, props.value);
      }}
      key={props.value}
      style={{
        width: "70px",
        height: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",
        margin: "2px",
        borderRadius: "10px",
        backgroundColor:
          props.board[props.value] == 0
            ? "#B288C0"
            : props.board[props.value] == 1
            ? "green"
            : "red",
      }}
      className={"hover:cursor-pointer shadow-md"}
    ></div>
  );
};
export default MineTile;
