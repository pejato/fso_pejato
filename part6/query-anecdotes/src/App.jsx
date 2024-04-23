import { useQuery } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAll } from "./requests";

const App = () => {
  const handleVote = (anecdote) => {
    console.log("vote");
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
