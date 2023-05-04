import { useState, useEffect } from "react";

const StoreColorThemes = () => {
  const [colorThemes, setColorThemes] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("/api/store/getcolorthemes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
        setIsLoading(false);
        setColorThemes(data);
      });
  }, []);
  return <div>Color Themes</div>;
};

export default StoreColorThemes;
