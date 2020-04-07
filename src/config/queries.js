export const _users = `
CREATE TABLE users (
    email varchar,
    firstName varchar,
    lastName varchar,
    age int
);
`;
export const _users_insert = `
INSERT INTO users (email, firstName, lastName, age)
VALUES ('test@gmail.com', 'Test', 'Baugit', 26)
`;
