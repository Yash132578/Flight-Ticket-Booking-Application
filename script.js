let flights = [];

function searchFlights() {
  const results = document.getElementById("results");

  if (!results) {
    console.error("❌ results div not found in HTML");
    return;
  }

  results.innerHTML = "<h3>Loading Flights...</h3>";

  fetch("http://localhost:5000/api/flights")
    .then(res => res.json())
    .then(data => {
      console.log("API DATA:", data);

      flights = data;

      if (!data || data.length === 0) {
        results.innerHTML = "<h3>No Flights Found 😢</h3>";
        return;
      }

      results.innerHTML = "<h3>Available Flights</h3>";

      data.forEach((f, index) => {
        results.innerHTML += `
          <div class="flight-card">
            <h3>${f.airline}</h3>
            <p>${f.from} → ${f.to}</p>
            <p>Departure: ${f.time}</p>
            <p class="price">₹${f.price}</p>
            <button onclick="bookFlight(${index})">Book Now</button>
          </div>
        `;
      });
    })
    .catch(err => {
      console.error("API ERROR:", err);
      results.innerHTML = "❌ Server error";
    });
}

function bookFlight(index) {
  let selectedFlight = flights[index];

  document.getElementById("flightInfo").innerHTML =
    `${selectedFlight.airline} - ₹${selectedFlight.price}`;

  document.getElementById("bookingModal").style.display = "block";
}

function goToPayment() {
  document.getElementById("bookingModal").style.display = "none";
  document.getElementById("paymentModal").style.display = "block";
}

function confirmPayment() {
  alert("Payment Successful ✈️ Ticket Booked!");
  document.getElementById("paymentModal").style.display = "none";
}