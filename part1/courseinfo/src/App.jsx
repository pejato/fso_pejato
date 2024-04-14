import { PropTypes } from 'prop-types';
import { React } from 'react';

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

// MARK: Header

const Header = (props) => {
  return <h1>{props.course}</h1>;
};
Header.propTypes = {
  course: PropTypes.string.isRequired
};

// MARK: Content

const Content = (props) => {
  return (
    <>
      {props.parts.map((part) => {
        return <Part key={part.name} part={part} />;
      })}
    </>
  );
};
Content.propTypes = {
  parts: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, exercises: PropTypes.number })
  )
};

// MARK: - Part

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};
Part.propTypes = {
  part: PropTypes.shape({ name: PropTypes.string, exercises: PropTypes.number })
};

// MARK: - Total

const Total = (props) => {
  const numExercises = props.parts.reduce(
    (acc, currValue) => acc + currValue.exercises,
    0
  );
  return <p>Number of exercises {numExercises}</p>;
};
Total.propTypes = {
  parts: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, exercises: PropTypes.number })
  )
};

export default App;