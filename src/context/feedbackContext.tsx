import React, { useState, createContext } from 'react';
export const FeedbackContext = createContext<FeedbackContextType>(null);

export const FeedbackProvider = (props) => {
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  return (
    <FeedbackContext.Provider value={{ feedback, setFeedback }}>
      {props.children}
    </FeedbackContext.Provider>
  );
};