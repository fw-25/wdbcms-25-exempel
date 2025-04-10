CREATE TABLE public.hotel_rooms ( 
  id SERIAL,
  room_number INT NOT NULL,
  type VARCHAR NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT PK_hotel_rooms PRIMARY KEY (id)
);

CREATE TABLE public.hotel_bookings ( 
  id SERIAL,
  guest_id INT NOT NULL,
  room_id INT NOT NULL,
  datefrom DATE NOT NULL DEFAULT now(),
  dateto DATE NOT NULL DEFAULT now(),
  addinfo VARCHAR NULL,
  CONSTRAINT PK_hotel_bookings PRIMARY KEY (id)
);

ALTER TABLE public.hotel_bookings ADD CONSTRAINT guest_key FOREIGN KEY (guest_id) REFERENCES public.hotel_guests (id);
ALTER TABLE public.hotel_bookings ADD CONSTRAINT room_key FOREIGN KEY (room_id) REFERENCES public.hotel_rooms (id);
