create table users
(
    id      int auto_increment,
    name    varchar(25) not null,
    surname varchar(45) not null,
    status  tinyint(1)  not null,
    role    varchar(10) not null,
    constraint users_pk
        unique (id)
);

INSERT INTO test.users (id, name, surname, status, role) VALUES (152, 'Olga', '  Tkachiv sdfgfds s', 1, 'admin');
INSERT INTO test.users (id, name, surname, status, role) VALUES (153, 'Olga', 'Tkachiv', 1, 'admin');
INSERT INTO test.users (id, name, surname, status, role) VALUES (154, 'Olga', 'Tkachiv', 1, 'admin');
INSERT INTO test.users (id, name, surname, status, role) VALUES (155, 'Olga', 'Tkachiv', 1, 'admin');