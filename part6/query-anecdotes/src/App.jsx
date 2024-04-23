import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAll, update } from "./requests";
import {
  createNotification,
  useNotificationDispatch,
} from "./NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const voteMutation = useMutation({
    mutationFn: update,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((a) => (a.id === anecdote.id ? anecdote : a)),
      );
      notificationDispatch(
        createNotification(`Voted for '${anecdote.content}'`),
      );
    },
  });
  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () => getAll(),
  });

  if (isError) {
    return (
      <div>Anecdotes are not available due to a problem with the server</div>
    );
  } else if (isLoading || !data) {
    return <div>Loading anecdotes...</div>;
  }

  const anecdotes = data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
