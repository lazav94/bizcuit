const ErrorMessage = ({ message }) => {
  return (
    message.length > 0 && <p className="error-message">Error: {message}</p>
  );
};

export default ErrorMessage;
