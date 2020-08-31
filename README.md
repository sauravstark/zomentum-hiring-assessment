# Zomentum Hiring Assessment

A backend api for movie ticket bookings

---
## Requirements

For development, you will only need Node.js and npm, installed in your environement

## Install

    $ git clone https://github.com/sauravstark/zomentum-hiring-assessment
    $ cd zomentum-hiring-assessment
    $ npm install

## Configure app

Open `.env` then edit it with your settings. You will need:

- PORT: port where the app will run;
- DB_URI:  The location where mongoDB will run;

## Documentation

### book tickets

#### url

    localhost:PORT/ticket/book/

#### method

    POST

#### input

    {
        name: string,
        contact: string,
        movie: string,
        time: string,
    }

#### output

    {
        status: string,
        message: string,
        ticket: {
            user_name: string,
            user_contact: string,
            expired: boolean,
            timing: string,
        }
    }

### update timing

#### url

    localhost:PORT/ticket/update/

#### method

    POST

#### input

    {
        name: string,
        contact: string,
        movie: string,
        old_time: string,
        new_time: string,
    }

#### output

    {
        status: string,
        message: string,
        updated: {
            user_name: string,
            user_contact: string,
            expired: boolean,
            timing: string,
        }
    }

### all tickets
#### url

    localhost:PORT/ticket/all/

#### method

    POST

#### input

    {
        movie: string,
        time: string,
    }

#### output

    {
        status: string,
        message: string,
        bookings: {
            user: string,
            contact: string,
            movie: string,
            director: string,
            time: string,
        }
    }

### delete ticket

#### url

    localhost:PORT/ticket/remove/

#### method

    POST

#### input

    {
        name: string,
        contact: string,
        movie: string,
        time: string,
    }

#### output

    {
        status: string,
        message: string,
    }

### user details

#### url

    localhost:PORT/ticket/user-detail/

#### method

    POST

#### input

    {
        id: string,
    }

#### output

    {
        status: string,
        message: string,
        user:
        {
            name: string,
            contact: string,
        }
    }