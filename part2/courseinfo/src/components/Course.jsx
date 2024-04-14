const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Total = (props) => {
  const numExercises = props.parts.reduce(
    (acc, part) => acc + part.exercises,
    0
  );
  return (
    <div>
      <b>Number of exercises {numExercises}</b>
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.name} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
