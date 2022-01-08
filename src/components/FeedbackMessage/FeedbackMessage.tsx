import { useContext, useEffect } from 'react';
import { FeedbackContext } from '../../context/feedbackContext';

/**
 * Renders User Feedback Message
 */
const FeedbackMessage = () => {
  const { feedback, setFeedback } = useContext(FeedbackContext);

  const success = feedback?.type === 'success';
  // Fade out message
  useEffect(() => {
    const fadeTimeout = setTimeout(
      () => {
        setFeedback(null);
      },
      5000,
    );

    return () => {
      clearTimeout(fadeTimeout);
    };
  }, [feedback]);

  return (
    feedback && (
      <div className={`feedback feedback-${feedback.type}`} onClick={() => setFeedback(null)}>
        {success ? <i className="fas fa-check-circle"></i> : <i className="fas fa-exclamation-triangle"></i>}
        <p className='feedback__message'>{feedback.message}</p>
      </div>
    )
  );
};

export default FeedbackMessage;