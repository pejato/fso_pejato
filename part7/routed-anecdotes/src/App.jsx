import { useState } from 'react';
import Menu from './components/Menu';
import AnecdoteList from './components/AnecdoteList';
import About from './components/About';
import CreateNew from './components/CreateNew';
import Footer from './components/Footer';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import Anecdote from './components/Anecdote';
import Notification from './components/Notification';

const App = () => {
  const match = useMatch('/anecdotes/:id');
  const navigate = useNavigate();
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState(null);
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    navigate('/');
    showNotification(`New anecdote created \u2018${anecdote.content}\u2019`);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const selectedAnecdote = match
    ? anecdotes.find((a) => a.id === Number(match.params.id))
    : null;

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} />
      <Routes>
        <Route
          element={<Anecdote anecdote={selectedAnecdote} />}
          path="/anecdotes/:id"
        />
        <Route element={<AnecdoteList anecdotes={anecdotes} />} path="/" />
        <Route element={<About />} path="/about" />
        <Route element={<CreateNew addNew={addNew} />} path="create" />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
