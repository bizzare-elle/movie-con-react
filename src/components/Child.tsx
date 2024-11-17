import { useState, useEffect } from "react";
import { Button } from "./ui/button";

const Child = () => {
  const [count, setCount] = useState(0);

  const getProducts = () => {};


  return (
    <div className="flex items-center justify-center gap-x-3 mt-10">
      <Button onClick={() => setCount((prev) => prev - 1)}>-</Button>
      <h1>{count}</h1>
      <Button onClick={() => setCount((prev) => prev - 1)}>+</Button>
    </div>
  );
};

export default Child;
