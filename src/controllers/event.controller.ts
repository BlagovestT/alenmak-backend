import Event from "../models/event.model";
import expressAsyncHandler from "express-async-handler";

//@desc Get all events
//?@route GET /api/event/all
//@access private
export const getAllEvents = expressAsyncHandler(async (req, res) => {
  const events = await Event.find({});
  res.status(200).json({ success: true, data: events });
});

//@desc Get a single event
//?@route GET /api/event/:id
//@access private
export const getSingleEvent = expressAsyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }
  res.status(200).json({ success: true, data: event });
});

//@desc Create an event
//!@route POST /api/event/create
//@access private
export const createEvent = expressAsyncHandler(async (req, res) => {
  const { event_id, title, start, end, staff_id, color } = req.body;

  if (!title || !start || !end || !color || !staff_id || !event_id) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const event = new Event({
    event_id,
    title,
    start,
    end,
    staff_id,
    color,
  });

  const createdEvent = await event.save();

  res.status(201).json({ success: true, data: createdEvent });
});

//@desc Update an event
//!@route PUT /api/event/:id
//@access private
export const updateEvent = expressAsyncHandler(async (req, res) => {
  const { title, start, end, color, staff_id } = req.body;

  if (!title || !start || !end || !color || !staff_id) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const event = await Event.findByIdAndUpdate(req.params.id, {
    title,
    start,
    end,
    staff_id,
    color,
  });

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  res.status(200).json({ success: true, data: event });
});

//@desc Delete an event
//!@route DELETE /api/event/:id
//@access private
export const deleteEvent = expressAsyncHandler(async (req, res) => {
  const event = await Event.findOneAndDelete({ event_id: req.params.id });
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }
  res.status(200).json({ success: true, message: "Event deleted successfuly" });
});
