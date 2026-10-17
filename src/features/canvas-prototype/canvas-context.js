import { createContext, useContext } from "react";

export const CanvasActions = createContext(null);

export function useCanvasActions() {
  const actions = useContext(CanvasActions);
  if (!actions) throw new Error("Canvas controls require CanvasActions.");
  return actions;
}
