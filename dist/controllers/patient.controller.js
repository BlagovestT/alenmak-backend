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
exports.unpayPatient = exports.payPatient = exports.deletePatient = exports.updatePatient = exports.createPatient = exports.getSinglePatient = exports.getAllPatients = void 0;
const patient_model_1 = __importDefault(require("../models/patient.model"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
//@desc Get all patients
//?@route GET /api/patient/all
//@access private
exports.getAllPatients = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patients = yield patient_model_1.default.find({});
    res.status(200).json({ success: true, data: patients });
}));
//@desc Get a single patient
//?@route GET /api/patient/:id
//@access private
exports.getSinglePatient = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield patient_model_1.default.findById(req.params.id);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    res.status(200).json({ success: true, data: patient });
}));
//@desc Create a patient
//!@route POST /api/patient/create
//@access private
exports.createPatient = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, gender, age, group } = req.body;
    if (!first_name || !last_name || !age) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const patient = new patient_model_1.default({
        first_name,
        last_name,
        gender,
        age,
        group,
    });
    const createdPatient = yield patient.save();
    res.status(201).json({ success: true, data: createdPatient });
}));
//@desc Update a patient
//!@route PUT /api/patient/:id
//@access private
exports.updatePatient = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, gender, age, group, status, paid } = req.body;
    const patient = yield patient_model_1.default.findByIdAndUpdate(req.params.id, {
        first_name,
        last_name,
        age,
        paid,
        status,
        gender,
        group,
    }, { new: true });
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    res.status(200).json({ success: true, data: patient });
}));
//@desc Delete a patient
//!@route DELETE /api/patient/:id
//@access private
exports.deletePatient = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield patient_model_1.default.findByIdAndDelete(req.params.id);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    res.status(200).json({ success: true, message: "Patient deleted" });
}));
//@desc Pay a patient
//!@route PUT /api/patient/pay/:id
//@access private
exports.payPatient = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield patient_model_1.default.findByIdAndUpdate(req.params.id, {
        paid: "paid",
    }, { new: true });
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    res.status(200).json({ success: true, data: patient });
}));
//@desc Unpay a patient
//!@route PUT /api/patient/unpay/:id
//@access private
exports.unpayPatient = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield patient_model_1.default.findByIdAndUpdate(req.params.id, {
        paid: "unpaid",
    }, { new: true });
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    res.status(200).json({ success: true, data: patient });
}));
//# sourceMappingURL=patient.controller.js.map