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

### Site preview
![weteam_preview_1](https://user-images.githubusercontent.com/31787554/131009905-80b73666-ed01-49a3-aa7b-fb82c53d08c7.png)


![weteam_preview_2](https://user-images.githubusercontent.com/31787554/131009918-712e3ed5-c24d-494f-8c64-776a462d2945.png)

