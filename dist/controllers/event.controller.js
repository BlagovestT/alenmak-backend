"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getSingleEvent = exports.getAllEvents = void 0;
const event_model_1 = __importDefault(require("../models/event.model"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
//@desc Get all events
//?@route GET /api/event/all
//@access private
exports.getAllEvents = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield event_model_1.default.find({});
    res.status(200).json({ success: true, data: events });
}));
//@desc Get a single event
//?@route GET /api/event/:id
//@access private
exports.getSingleEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield event_model_1.default.findById(req.params.id);
    if (!event) {
        res.status(404);
        throw new Error("Event not found");
    }
    res.status(200).json({ success: true, data: event });
}));
//@desc Create an event
//!@route POST /api/event/create
//@access private
exports.createEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { event_id, title, start, end, staff_id, color } = req.body;
    if (!title || !start || !end || !color || !staff_id || !event_id) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const event = new event_model_1.default({
        event_id,
        title,
        start,
        end,
        staff_id,
        color,
    });
    const createdEvent = yield event.save();
    res.status(201).json({ success: true, data: createdEvent });
}));
//@desc Update an event
//!@route PUT /api/event/:id
//@access private
exports.updateEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, start, end, color, staff_id } = req.body;
    if (!title || !start || !end || !color || !staff_id) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const event = yield event_model_1.default.findByIdAndUpdate(req.params.id, {
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
}));
//@desc Delete an event
//!@route DELETE /api/event/:id
//@access private
exports.deleteEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield event_model_1.default.findOneAndDelete({ event_id: req.params.id });
    if (!event) {
        res.status(404);
        throw new Error("Event not found");
    }
    res.status(200).json({ success: true, message: "Event deleted successfuly" });
}));
//# sourceMappingURL=event.controller.js.map