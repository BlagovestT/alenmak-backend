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
exports.unpayStaffMember = exports.payStaffMember = exports.deleteStaffMember = exports.updateStaffMember = exports.createStaffMember = exports.getSingleStaffMember = exports.getAllStaffMembers = void 0;
const staff_model_1 = __importDefault(require("../models/staff.model"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
//@desc Get all staff members
//?@route GET /api/staff/members
//@access private
exports.getAllStaffMembers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const staffMembers = yield staff_model_1.default.find({});
    res.status(200).json({ success: true, data: staffMembers });
}));
//@desc Get a single staff member
//?@route GET /api/staff/member/:id
//@access private
exports.getSingleStaffMember = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const staffMember = yield staff_model_1.default.findById(req.params.id);
    if (!staffMember) {
        res.status(404);
        throw new Error("Staff member not found");
    }
    res.status(200).json({ success: true, data: staffMember });
}));
//@desc Create a staff member
//!@route POST /api/staff/member/create
//@access private
exports.createStaffMember = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, gender, occupation, salary } = req.body;
    if (!first_name || !last_name || !salary) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const staffMember = new staff_model_1.default({
        first_name,
        last_name,
        gender,
        occupation,
        salary,
    });
    const createdStaffMember = yield staffMember.save();
    res.status(201).json({ success: true, data: createdStaffMember });
}));
//@desc Update a staff member
//!@route PUT /api/staff/member/:id
//@access private
exports.updateStaffMember = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, gender, occupation, salary } = req.body;
    const staffMember = yield staff_model_1.default.findByIdAndUpdate(req.params.id, {
        first_name,
        last_name,
        gender,
        occupation,
        salary,
    }, { new: true });
    if (!staffMember) {
        res.status(404);
        throw new Error("Staff member not found");
    }
    res.status(200).json({ success: true, data: staffMember });
}));
//@desc Delete a staff member
//!@route DELETE /api/staff/member/:id
//@access private
exports.deleteStaffMember = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const staffMember = yield staff_model_1.default.findByIdAndDelete(req.params.id);
    if (!staffMember) {
        res.status(404);
        throw new Error("Staff member not found");
    }
    res.status(200).json({ success: true, message: "Staff member deleted" });
}));
//@desc Pay a staff member
//!@route PUT /api/staff/member/:id/pay
//@access private
exports.payStaffMember = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const staffMember = yield staff_model_1.default.findByIdAndUpdate(req.params.id, {
        status: "paid",
    }, { new: true });
    if (!staffMember) {
        res.status(404);
        throw new Error("Staff member not found");
    }
    res.status(200).json({ success: true, data: staffMember });
}));
//@desc Unpay a staff member
//!@route PUT /api/staff/member/:id/unpay
//@access private
exports.unpayStaffMember = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const staffMember = yield staff_model_1.default.findByIdAndUpdate(req.params.id, {
        status: "unpaid",
    }, { new: true });
    if (!staffMember) {
        res.status(404);
        throw new Error("Staff member not found");
    }
    res.status(200).json({ success: true, data: staffMember });
}));
//# sourceMappingURL=staff.controller.js.map