import { useState, useEffect } from "react";

export function useTitle(title: string) {
  const [appTitle, setAppTitle] = useState(title);
  useEffect(() => {
    document.title = appTitle;
  }, [appTitle]);
  return setAppTitle;
}

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-GB');
}