import Patient from "../models/patient.model";
import expressAsyncHandler from "express-async-handler";

//@desc Get all patients
//?@route GET /api/patient/all
//@access private
export const getAllPatients = expressAsyncHandler(async (req, res) => {
  const patients = await Patient.find({});
  res.status(200).json({ success: true, data: patients });
});

//@desc Get a single patient
//?@route GET /api/patient/:id
//@access private
export const getSinglePatient = expressAsyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }
  res.status(200).json({ success: true, data: patient });
});

//@desc Create a patient
//!@route POST /api/patient/create
//@access private
export const createPatient = expressAsyncHandler(async (req, res) => {
  const { first_name, last_name, age } = req.body;

  if (!first_name || !last_name || !age) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const patient = new Patient({
    first_name,
    last_name,
    age,
  });

  const createdPatient = await patient.save();

  res.status(201).json({ success: true, data: createdPatient });
});

//@desc Update a patient
//!@route PUT /api/patient/:id
//@access private
export const updatePatient = expressAsyncHandler(async (req, res) => {
  const { first_name, last_name, age, paid, status } = req.body;

  const patient = await Patient.findByIdAndUpdate(
    req.params.id,
    {
      first_name,
      last_name,
      age,
      paid,
      status,
    },
    { new: true }
  );

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  res.status(200).json({ success: true, data: patient });
});

//@desc Delete a patient
//!@route DELETE /api/patient/:id
//@access private
export const deletePatient = expressAsyncHandler(async (req, res) => {
  const patient = await Patient.findByIdAndDelete(req.params.id);

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  res.status(200).json({ success: true, message: "Patient deleted" });
});

//@desc Pay a patient
//!@route PUT /api/patient/pay/:id
//@access private
export const payPatient = expressAsyncHandler(async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(
    req.params.id,
    {
      status: "paid",
    },
    { new: true }
  );

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  res.status(200).json({ success: true, data: patient });
});

//@desc Unpay a patient
//!@route PUT /api/patient/unpay/:id
//@access private
export const unpayPatient = expressAsyncHandler(async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(
    req.params.id,
    {
      status: "unpaid",
    },
    { new: true }
  );

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  res.status(200).json({ success: true, data: patient });
});
