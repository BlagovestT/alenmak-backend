import Staff from "../models/staff.models";
import expressAsyncHandler from "express-async-handler";

//@desc Get all staff members
//?@route GET /api/staff/members
//@access private
export const getAllStaffMembers = expressAsyncHandler(async (req, res) => {
  const staffMembers = await Staff.find({});
  res.status(200).json({ success: true, data: staffMembers });
});

//@desc Get a single staff member
//?@route GET /api/staff/member/:id
//@access private
export const getSingleStaffMember = expressAsyncHandler(async (req, res) => {
  const staffMember = await Staff.findById(req.params.id);
  if (!staffMember) {
    res.status(404);
    throw new Error("Staff member not found");
  }
  res.status(200).json({ success: true, data: staffMember });
});

//@desc Create a staff member
//!@route POST /api/staff/member/create
//@access private
export const createStaffMember = expressAsyncHandler(async (req, res) => {
  const { first_name, last_name, salary } = req.body;

  if (!first_name || !last_name || !salary) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const staffMember = new Staff({
    first_name,
    last_name,
    salary,
  });

  const createdStaffMember = await staffMember.save();

  res.status(201).json({ success: true, data: createdStaffMember });
});

//@desc Update a staff member
//!@route PUT /api/staff/member/:id
//@access private
export const updateStaffMember = expressAsyncHandler(async (req, res) => {
  const { first_name, last_name, salary, status } = req.body;

  const staffMember = await Staff.findByIdAndUpdate(
    req.params.id,
    {
      first_name,
      last_name,
      salary,
      status,
    },
    { new: true }
  );

  if (!staffMember) {
    res.status(404);
    throw new Error("Staff member not found");
  }

  res.status(200).json({ success: true, data: staffMember });
});

//@desc Delete a staff member
//!@route DELETE /api/staff/member/:id
//@access private
export const deleteStaffMember = expressAsyncHandler(async (req, res) => {
  const staffMember = await Staff.findByIdAndDelete(req.params.id);

  if (!staffMember) {
    res.status(404);
    throw new Error("Staff member not found");
  }

  res.status(200).json({ success: true, message: "Staff member deleted" });
});

//@desc Pay a staff member
//!@route PUT /api/staff/member/:id/pay
//@access private
export const payStaffMember = expressAsyncHandler(async (req, res) => {
  const staffMember = await Staff.findByIdAndUpdate(
    req.params.id,
    {
      status: "paid",
    },
    { new: true }
  );

  if (!staffMember) {
    res.status(404);
    throw new Error("Staff member not found");
  }

  res.status(200).json({ success: true, data: staffMember });
});

//@desc Unpay a staff member
//!@route PUT /api/staff/member/:id/unpay
//@access private
export const unpayStaffMember = expressAsyncHandler(async (req, res) => {
  const staffMember = await Staff.findByIdAndUpdate(
    req.params.id,
    {
      status: "unpaid",
    },
    { new: true }
  );

  if (!staffMember) {
    res.status(404);
    throw new Error("Staff member not found");
  }

  res.status(200).json({ success: true, data: staffMember });
});
