import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "../requests";
import {
  useNotificationDispatch,
  createNotification,
} from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: create,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(anecdote));
      notificationDispatch(
        createNotification(`Created new anecdote, '${anecdote.content}'`),
      );
    },
    onError: (error) => {
      const errorText =
        error.response?.data?.error ?? "An unknown error occurred";
      notificationDispatch(createNotification(errorText));
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
