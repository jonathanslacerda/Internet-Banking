create database digitalbank;

create table client (
    id serial primary key,
    fullname text not null,
    email text not null unique,
    register varchar(11) not null unique,
    passcode text not null,
    fund integer not null
);

create table deposits (
    id serial primary key,
    client_id integer not null references client(id),
    transaction_date text not null,
    amount integer not null
);

create table withdraws (
    id serial primary key,
    client_id integer not null references client(id),
    transaction_date text not null,
    amount integer not null
);

create table transfers (
    id serial primary key,
    client_id_origin integer not null references client(id),
    client_id_destiny integer not null references client(id),
    transaction_date text not null,
    amount integer not null
);
