import { useContext } from "react";
import { NavContext } from "../contexts/NavContext";

export function useActive() {
  const value = useContext(NavContext);

  return value;
}