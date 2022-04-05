DROP TABLE IF EXISTS exercises CASCADE;

CREATE TABLE exercises (
    id smallserial PRIMARY KEY,
    title varchar,
    text varchar,
    versionLeft int NOT NULL,
    versionRight int NOT NULL,
    leftCode text NOT NULL,
    rightCode text,
    editLeft boolean NOT NULL,
    test text NOT NULL
);