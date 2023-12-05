const { Room, Booking } = require("./index.js");
const roomsJson = require("./rooms.json");
const bookingsJson = require("./bookings.json");

describe("Room", () => {
  test("Comprobar tipos de propiedades", () => {
    const room1 = new Room(
      roomsJson[0].name,
      bookingsJson,
      roomsJson[0].rate,
      roomsJson[0].discount
    );
    expect(typeof room1.name).toBe("string");
    expect(typeof room1.booking).toBe("object");
    expect(typeof room1.rate).toBe("number");
    expect(typeof room1.discount).toBe("number");
  });
  test("isOccupied(fecha) devuelve falso si no está ocupado.", () => {
    const room1 = new Room(
      roomsJson[0].name,
      bookingsJson[0],
      roomsJson[0].rate,
      roomsJson[0].discount
    );
    const DentroRango = "2023-01-13";

    expect(room1.isOcupped(DentroRango)).toBeFalsy();
  });
  test("isOccupied(fecha) devuelve true si está Libre.", () => {
    const room1 = new Room(
      roomsJson[2].name,
      bookingsJson[2],
      roomsJson[2].rate,
      roomsJson[2].discount
    );

    const fueraRango = "2023-12-16";
    expect(room1.isOcupped(fueraRango)).toBe(true);
  });
  test("occupancyPercentage devuelve el porcentaje correcto de ocupación", () => {
    const room5 = new Room(
      roomsJson[2].name,
      bookingsJson,
      roomsJson[2].rate,
      roomsJson[2].discount
    );

    expect(room5.occupancyPercentage("2023-1-1", "2023-12-31")).toBe(18);
  });
});

describe("Booking", () => {
  test("Comprobar tipos de propiedades", () => {
    const room2 = new Room(
      roomsJson[0].name,
      bookingsJson,
      roomsJson[0].rate,
      roomsJson[0].discount
    );
    const booking1 = new Booking(
      bookingsJson[0].nombre,
      bookingsJson[0].email,
      new Date(bookingsJson[0].check_in),
      new Date(bookingsJson[0].check_out),
      bookingsJson[0].discount,
      room2
    );

    expect(typeof booking1.name).toBe("string");
    expect(typeof booking1.email).toBe("string");
    expect(booking1.check_in instanceof Date).toBe(true);
    expect(booking1.check_out instanceof Date).toBe(true);
    expect(typeof booking1.discount).toBe("number");
  });
  test("devuelve la tarifa, incluidos los descuentos en habitaciones y reservas", () => {
    const booking3 = new Booking(
      bookingsJson[3].nombre,
      bookingsJson[3].email,
      new Date(bookingsJson[3].check_in),
      new Date(bookingsJson[3].check_out),
      bookingsJson[3].discount
    );
    const discountBooking = 10;
    const discountRoom = 10;
    const rateRoom = 100;
    const actualFee = booking3.getFee(discountBooking, discountRoom, rateRoom);

    expect(actualFee).toBe(81);
  });
});
