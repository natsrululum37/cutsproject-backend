import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const { name, phone, date, time, serviceId, notes } = req.body;

    const booking = await prisma.booking.create({
      data: {
        name,
        phone,
        date: new Date(date),
        time,
        serviceId: parseInt(serviceId),
        notes: notes || null,
        status: 'PENDING'
      },
      include: {
        service: true
      }
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
      include: {
        service: true
      }
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Check available time slots
export const checkAvailability = async (req, res) => {
  try {
    const { date, serviceId } = req.query;
    const selectedDate = new Date(date);

    // Get all bookings for the selected date
    const bookings = await prisma.booking.findMany({
      where: {
        date: {
          equals: selectedDate
        },
        status: {
          not: 'CANCELLED'
        }
      },
      select: {
        time: true
      }
    });

    // Get service duration
    const service = await prisma.service.findUnique({
      where: { id: parseInt(serviceId) },
      select: { duration: true }
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Generate available time slots (9 AM to 6 PM)
    const timeSlots = [];
    const startTime = 9;
    const endTime = 18;

    for (let hour = startTime; hour < endTime; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      if (!bookings.some(booking => booking.time === time)) {
        timeSlots.push(time);
      }
    }

    res.json({ availableTimeSlots: timeSlots });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
