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

10;
module.exports = {
  Room: Room,
  Booking: Booking,
};
