# Hotel Auroriel

A small hotel booking app built with Node.js, Express, MySQL and React.

Guests choose a Single or Double room, fill in a booking form and get a confirmation with their booking number. Bookings are saved in a MySQL database. An admin page lets the hotel list, update and delete bookings.

## Tech stack

- **Backend:** Node.js, Express 5, mysql2, dotenv, cors
- **Database:** MySQL
- **Frontend:** React 19 (Create React App)
- **Pattern:** DAO (all SQL lives in `backend/dao/bookingDao.js`)

## Project structure

```
hotel-booking-app/
├── backend/
│   ├── dao/bookingDao.js
│   ├── functions/validation.js
│   ├── db.js
│   ├── schema.sql
│   └── server.js
└── frontend/
    ├── public/
    └── src/
```

## Requirements

- Node.js 18 or later
- MySQL 8 running locally

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/jkatariina/hotel-booking-app.git
cd hotel-booking-app
```

### 2. Create the database

```bash
mysql -u root -p < backend/schema.sql
```

This creates the database `hotel_booking` and the table `bookings`.

### 3. Configure the backend

Create a file called `.env` in the `backend` folder:

```
PORT=5001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_NAME=hotel_booking
DB_PASSWORD=
```

Leave `DB_PASSWORD` empty. The password is given when the server starts (see below), so it is never saved in a file. `.env` is listed in `.gitignore`.

### 4. Install dependencies

```bash
cd backend
npm install
cd ../frontend
npm install
```

## Running the app

### Backend

```bash
cd backend
read -s "DB_PASSWORD?MySQL password: "; export DB_PASSWORD; npm start
```

The command above is for zsh (the default shell on macOS). In bash, use:

```bash
read -s -p "MySQL password: " DB_PASSWORD; export DB_PASSWORD; npm start
```

The terminal should show:

```
Server running on http://localhost:5001
Connected to MySQL
```

### Frontend

In a second terminal:

```bash
cd frontend
npm start
```

The app opens on http://localhost:3000.

## API endpoints

Base URL: `http://localhost:5001`

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | Check that the API is running |
| POST | `/bookings` | Create a booking |
| GET | `/bookings/:id` | Get one booking |
| GET | `/admin-secret-bookings` | List all bookings (admin) |
| PUT | `/admin-secret-bookings/:id` | Update a booking (admin) |
| DELETE | `/admin-secret-bookings/:id` | Delete a booking (admin) |

### Create a booking

`POST /bookings`

```json
{
  "room_type": "Double",
  "guest_name": "Emma Johnson",
  "guest_email": "emma@example.com",
  "guest_phone": "070-123 45 67",
  "check_in": "2026-12-10",
  "check_out": "2026-12-12"
}
```

Response `201 Created`:

```json
{
  "id": 1,
  "room_type": "Double",
  "guest_name": "Emma Johnson",
  "guest_email": "emma@example.com",
  "guest_phone": "070-123 45 67",
  "check_in": "2026-12-10",
  "check_out": "2026-12-12",
  "created_at": "2026-10-22 14:30:00"
}
```

### Get one booking

`GET /bookings/1` returns the booking as above, or `404` if it does not exist.

### Update a booking (admin)

`PUT /admin-secret-bookings/1` takes the same body as `POST /bookings`, with all six fields:

```json
{
  "room_type": "Single",
  "guest_name": "Emma Johnson",
  "guest_email": "emma@example.com",
  "guest_phone": "070-123 45 67",
  "check_in": "2026-12-11",
  "check_out": "2026-12-13"
}
```

Response `200 OK` with the updated booking.

### Delete a booking (admin)

`DELETE /admin-secret-bookings/1`

Response `200 OK`:

```json
{
  "message": "Booking 1 was deleted."
}
```

### Validation

`POST` and `PUT` check that:

- `room_type` is `Single` or `Double`
- `guest_name`, `guest_email` and `guest_phone` are filled in
- `guest_email` is a valid email address
- `guest_phone` only contains digits, spaces, `+` and `-`
- `check_in` and `check_out` are valid dates (`YYYY-MM-DD`)
- `check_out` is after `check_in`

If something is wrong, the API responds with `400 Bad Request`:

```json
{
  "message": "Check-out must be after check-in.",
  "errors": ["Check-out must be after check-in."]
}
```

## Admin page

The admin page is at:

```
http://localhost:3000/admin-secret-bookings
```

It is not linked anywhere in the app. On the page you can see all bookings, edit a booking and delete a booking.
