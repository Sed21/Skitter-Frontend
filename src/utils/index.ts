import { useState, useEffect } from "react";

export function useTitle(title: string) {
  const [appTitle, setAppTitle] = useState(title);
  useEffect(() => {
    document.title = appTitle;
  }, [appTitle]);
  return setAppTitle;
}
