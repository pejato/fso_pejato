const Notification = (props) => {
  if (!props.message) {
    return null;
  }

  const style = {
    color: props.isError ? "red" : "green",
    background: "lightgrey",
    borderRadius: 5,
    borderStyle: "solid",
    padding: 10,
    fontSize: 20,
    marginBottom: 20,
  };

  return <div style={style}>{props.message}</div>;
};

export default Notification;
