import React from "react";
import { OfficialPaperPrintModal } from "./OfficialPaperPrintModal";

export function PatentPrintView({
  form,
  formData,
  fileNo,
  onBackToRuntime
}) {
  return (
    <OfficialPaperPrintModal
      form={form}
      formData={formData}
      fileNo={fileNo || formData.patent_file_no || "IN-202411039821"}
      onClose={onBackToRuntime}
    />
  );
}
