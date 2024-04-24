import { Link } from 'react-router-dom';

const Footer = () => (
  <div>
    Anecdote app for{' '}
    <a
      target="_blank"
      href="https://fullstackopen.com/"
      rel="noopener noreferrer"
    >
      Full Stack Open
    </a>
    . See
    <Link
      to="https://github.com/pejato/fso_pejato/tree/main/part7/routed-anecdotes"
      target="_blank"
      rel="noopener noreferrer"
    >
      {
        ' https://github.com/pejato/fso_pejato/tree/main/part7/routed-anecdotes '
      }
    </Link>
    for the source code.
  </div>
);

export default Footer;
