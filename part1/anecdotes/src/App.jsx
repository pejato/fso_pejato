import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [anecdoteVotes, setAnecdoteVotes] = useState(new Map());
  const [mostVoted, setMostVoted] = useState({anecdoteKey: 0, votes: 0});

  const setRandomAnecdote = () => {
    setSelected(getRandomInt(0, anecdotes.length));
  };
  const voteForAnecdote = () => {
    const newAnecdoteVotes = new Map(anecdoteVotes);
    const newVotes = 1 + anecdoteVotes.get(selected) || 0
    newAnecdoteVotes.set(selected, newVotes);
    setAnecdoteVotes(newAnecdoteVotes);
    if (mostVoted.votes < newVotes) {
      setMostVoted({anecdoteKey: selected, votes: newVotes});
    }
  };

  return (
    <>
      <AnecdoteOfTheDay anecdote={anecdotes[selected]} />
      <button onClick={voteForAnecdote}>Vote for this anecdote</button>
      <button onClick={setRandomAnecdote}>Random anecdote</button>
      <MostVotedAnecdote anecdote={anecdotes[mostVoted.anecdoteKey]} />
    </>
  )
}

const AnecdoteOfTheDay = ({anecdote}) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdote}</div>
    </>
  );
}

const MostVotedAnecdote = ({anecdote}) => {
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <div>{anecdote}</div>
    </>
  )
}

const getRandomInt = (min, max) => {
  return Math.floor(
    Math.random() * (max - min) + min
  );
}

export default App