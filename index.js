class Room {
  constructor(name, booking, rate, discount) {
    this.name = name;
    this.booking = booking;
    this.rate = rate;
    this.discount = discount;
  }

  isOcupped(date) {
    return this.booking.check_in <= date && date <= this.booking.check_out;
  }

  occupancyPercentage(startDate, endDate) {
    const diferenciaMS = new Date(endDate) - new Date(startDate);
    const diasFecha = Math.ceil(diferenciaMS / (1000 * 60 * 60 * 24));
    let occupiedDays = 0;

    this.booking.forEach((booking_element) => {
      const reservaStartDate = new Date(booking_element.check_in);
      const reservaEndDate = new Date(booking_element.check_out);

      if (
        reservaStartDate <= new Date(endDate) &&
        reservaEndDate >= new Date(startDate)
      ) {
        const overlapStartDate = Math.max(
          new Date(startDate),
          reservaStartDate
        );
        const overlapEndDate = Math.min(new Date(endDate), reservaEndDate);
        const overlapDays = Math.ceil(
          (overlapEndDate - overlapStartDate + 1) / (1000 * 60 * 60 * 24)
        );
        occupiedDays += overlapDays;
      }
    });

    const occupancyPercentage = Math.round((occupiedDays / diasFecha) * 100);
    return occupancyPercentage;
  }
}

class Booking {
  constructor(name, email, check_in, check_out, discount, room) {
    this.name = name;
    this.email = email;
    this.check_in = check_in;
    this.check_out = check_out;
    this.discount = discount;
    this.room = room;
  }

  getFee(disconuntBooking, disconuntRoom, rateRoom) {
    const precioPrimerDescuento =
      rateRoom - (rateRoom * disconuntBooking) / 100;
    const precioFinal =
      precioPrimerDescuento - (precioPrimerDescuento * disconuntRoom) / 100;
    return precioFinal;
  }
}
module.exports = {
  Room: Room,
  Booking: Booking,
};
