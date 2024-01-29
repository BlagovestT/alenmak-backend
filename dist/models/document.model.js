"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const documentSchema = new mongoose_1.Schema({
    owner: { type: String, required: true },
    file_name: { type: String, required: true },
    file_size: { type: Number, required: true },
    file_type: { type: String, required: true },
}, { timestamps: true });
const Document = mongoose_1.models.Document || (0, mongoose_1.model)("Document", documentSchema);
exports.default = Document;
//# sourceMappingURL=document.model.js.map