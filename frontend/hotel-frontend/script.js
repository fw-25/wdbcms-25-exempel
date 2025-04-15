// Denna kunde också gärna sättas i LocalStorage
const API_URL = 'http://vm4430.kaj.pouta.csc.fi:8004';

// Funkar men kan göras på snyggare sätt en med prompt()...
let api_key = localStorage.getItem('hotel_api_key') || prompt("Enter API-key");
localStorage.setItem('hotel_api_key', api_key);

async function getRooms() {
    const resp = await fetch(`${API_URL}/rooms`);
    const rooms = await resp.json();

    for (r of rooms) {
        document.querySelector('#room_id').innerHTML += `
            <option value="${r.id}">
                (id:${r.id})
                ${r.room_number}
                ${r.type}
                ${r.price} €
            </option>
        `;
    }
};
getRooms();


async function getBookings() {
    
    try {
        const resp = await fetch(`${API_URL}/bookings?api_key=${api_key}`);
        const bookings = await resp.json();
        
        document.querySelector('#bookings').innerHTML = '';
        for (b of bookings) {
            document.querySelector('#bookings').innerHTML += `
                <tr>
                    <td>${b.id}</td>
                    <td>${b.room_number}</td>
                    <td>${b.guest_name}</td>
                    <td>${b.total_price} €</td>
                    <td>${b.datefrom}</td>
                    <td>${b.dateto}</td>
                    <td>${b.addinfo || ''}</td>
                    <td>
                        <select class="stars" data-id="${b.id}">
                            <option value="">Please review!</option>
                            <option value="1" ${(b.stars == 1) ? 'selected' : '' }>⭐</option>
                            <option value="2" ${(b.stars == 2) ? 'selected' : '' }>⭐⭐</option>
                            <option value="3" ${(b.stars == 3) ? 'selected' : '' }>⭐⭐⭐</option>
                            <option value="4" ${(b.stars == 4) ? 'selected' : '' }>⭐⭐⭐⭐</option>
                            <option value="5" ${(b.stars == 5) ? 'selected' : '' }>⭐⭐⭐⭐⭐</option>
                        </select>
                    </td>
                </tr>
            `;
        }

        // skapa change-lyssnare för varje stars-select:
        document.querySelectorAll("select.stars").forEach((starSelect) => {
            starSelect.addEventListener('change', () => {
                console.log("change")

                if (!starSelect.value) return;

                const bookingId = starSelect.getAttribute("data-id");
                updateBooking(bookingId, { stars: starSelect.value });
            });

        });
        
    } catch (err) {
        document.querySelector('#bookings').innerHTML = `
            <span style="color:red;">ERROR, could not fetch bookings</span>
        `;
        console.log(err)
    }


};
getBookings();


async function updateBooking(booking_id, data) {
    
    try {
        const resp = await fetch(`${API_URL}/bookings/${booking_id}?api_key=${api_key}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const respData = await resp.json();
    
        console.log(respData);


    } catch (err) {
        console.log(err);
        alert("Uppdatering misslyckades!");
    }

    getBookings();

}

async function saveBooking() {
    datefrom = document.querySelector('#datefrom').value;
    dateto = document.querySelector('#dateto').value;
    if (!datefrom) return alert('Du måste välja startdatum');

    const booking = {
        room_id: Number(document.querySelector('#room_id').value),
        datefrom: datefrom,
        addinfo: document.querySelector('#addinfo').value
    }

    if (dateto) {
        booking.dateto = dateto;
    }

    const resp = await fetch(`${API_URL}/bookings?api_key=${api_key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    });

    console.log(await resp.json());

    getBookings();
}

document.querySelector("#btn-submit").addEventListener('click', saveBooking);

