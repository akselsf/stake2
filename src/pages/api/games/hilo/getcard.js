const getCard = () => {
  return {
    card: Math.floor(Math.random() * 13) + 1,
    skipped: false,
    choice: "",
    type: Math.floor(Math.random() * 4),
  };
};
export default getCard;
