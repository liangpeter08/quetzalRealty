-- Up
create TABLE PersonTest (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
);

INSERT INTO PersonTest (name, email) values ('peter', 'peter@email.com');
INSERT INTO PersonTest (name, email) values ('justin', 'justin@email.com');

-- Down
DROP TABLE PersonTest;