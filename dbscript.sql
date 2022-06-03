DROP TABLE IF EXISTS exercises CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE exercises (
    id smallserial PRIMARY KEY,
    title varchar,
    text varchar,
    version_left int NOT NULL,
    version_right int NOT NULL,
    left_code text NOT NULL,
    right_code text,
    test text NOT NULL,
    deadline DATE
);

CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar,
    surname varchar,
    email varchar,
    password varchar,
    is_admin boolean
);

CREATE TABLE results (
    id serial,
    user_id int,
    exercise_id int,
    left_code text,
    right_code text,
    left_result text,
    right_result text,
    passed boolean,
    saved_on DATE,
    CONSTRAINT fk_exercise
    FOREIGN KEY(exercise_id)
    REFERENCES exercises(id)
);

CREATE TABLE saved_exercises (
    id serial,
    left_code text,
    right_code text,
    user_id int,
    exercise_id int,
    CONSTRAINT exercise_user_unique UNIQUE (user_id, exercise_id)
);

CREATE TABLE CMakeFiles (
    id serial,
    version int,
    text text,
);