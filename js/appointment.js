const service = JSON.parse(localStorage.getItem("bookingService"));

if (!service) {
    alert("No service selected");
    window.location.href = "../index.html";
}

document.getElementById("service-img").src = service.image;
document.getElementById("service-title").textContent = service.title;
document.getElementById("service-price").textContent = service.price;

const today = new Date().toISOString().split("T")[0];
document.getElementById("date").setAttribute("min", today);

document.getElementById("appointmentForm").addEventListener("submit", function(e){
    e.preventDefault();

    const booking = {
        service: service.title,
        image: service.image,
        price: service.price,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        location: document.getElementById("location").value,
        notes: document.getElementById("notes").value
    };

    let bookings = JSON.parse(localStorage.getItem("appointments")) || [];
    bookings.push(booking);

    localStorage.setItem("appointments", JSON.stringify(bookings));

    alert("Appointment booked successfully 🎉");

    window.location.href = "../index.html";
});