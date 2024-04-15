const ErrorNotification = ({ message }) => {
  if (!message) {
    return null;
  }

  const style = {
    color: "red",
    background: "lightgrey",
    borderRadius: 5,
    borderStyle: "solid",
    padding: 10,
    fontSize: 20,
    marginBottom: 20,
  };

  return <div style={style}>{message}</div>;
};

export default ErrorNotification;
