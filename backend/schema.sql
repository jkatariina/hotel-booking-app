CREATE DATABASE IF NOT EXISTS hotel_booking;
USE hotel_booking;

CREATE TABLE IF NOT EXISTS bookings (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  room_type   ENUM('Single', 'Double') NOT NULL,
  guest_name  VARCHAR(100) NOT NULL,
  guest_email VARCHAR(150) NOT NULL,
  guest_phone VARCHAR(30)  NOT NULL,
  check_in    DATE NOT NULL,
  check_out   DATE NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_dates CHECK (check_out > check_in)
);
