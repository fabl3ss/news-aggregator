CREATE TABLE users
(
    id          serial,
    name        varchar(255) not null,
    username    varchar(255) not null unique,
    password_hash varchar(255) not null
);