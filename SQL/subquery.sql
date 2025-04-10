SELECT 
    id,
    name,
    
    (SELECT count(*) 
        FROM hotel_bookings 
        WHERE guest_id = hg.id) AS visits
        
FROM hotel_guests hg
WHERE name in ('Jane', 'John')

