# weteam-mern

> A task management application built with the MERN stack and Redux.
> [Live Demo](https://weteam-mern.herokuapp.com/)

## Features

- Modal Popup form
- Searching and Filtering
- Pagination
- Add collaborative member

## Live demo login
These are exmaples of user and password for live demo. (Or create your own)

```
johnnny@gmail.com
123456

mary@gmail.com
123456

andrew@gmail.com
123456
```

### Setup (frontend & backend)

```
npm i
cd frontend
npm i
```

### Environment setting

Create a .env file in the root (outside the folders of frontend and backend)
and copy the following below then paste into .env file (custom your own if you want)

```
NODE_ENV = development
PORT = 4000
MONGO_URI = mongodb://localhost/weteam
JWT_SECRET = 1234
```

### Seeder
Please make sure to run seeder first before run the application. If not, there will be no select options in the create/edit form. 

```
npm run seeder
```

### Run application

```
npm run dev
```
