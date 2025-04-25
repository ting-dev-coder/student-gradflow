import { useState, useEffect } from 'react';
export interface Focus {
  id: string;
  text: string;
  completed: boolean;
}

type FocusList = Focus[];

export type FocusContextType = {
  focusList: FocusList;
  addFocus: (text: string) => void;
  deleteFocus: (id: string) => void;
  toggleFocus: (id: string) => void;
};

const STORE_NAME = 'focus-list';
export function useFocusList() {
  const [focusList, setFocusList] = useState<Focus[]>([]);

  // get data from localStorage
  useEffect(() => {
    const savedFocusList = localStorage.getItem(STORE_NAME);
    if (savedFocusList) {
      setFocusList(JSON.parse(savedFocusList));
    }
  }, []);

  // save current tasks to localStorage
  useEffect(() => {
    if (focusList.length) {
      localStorage.setItem(STORE_NAME, JSON.stringify(focusList));
    }
  }, [focusList]);

  // add task
  const addFocus = (text: string) => {
    const newFocus: Focus = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setFocusList([...focusList, newFocus]);
  };

  // delete task
  const deleteFocus = (id: string) => {
    setFocusList(focusList.filter((focus) => focus.id !== id));
  };

  // mark task as done
  const toggleFocus = (id: string) => {
    setFocusList(
      focusList.map((focus) =>
        focus.id === id ? { ...focus, completed: !focus.completed } : focus
      )
    );
  };

  return {
    focusList,
    addFocus,
    deleteFocus,
    toggleFocus,
  };
}
