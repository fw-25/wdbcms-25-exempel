SELECT 
    hb.guest_id,
    count(*) as visits,
    min(hb.datefrom) as first_visit,
    sum(hr.price) as money_spent
FROM hotel_bookings hb
INNER JOIN hotel_rooms hr
ON hr.id = hb.room_id
GROUP BY guest_id