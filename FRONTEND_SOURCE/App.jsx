import React, { useState, useEffect } from "react";
import { PREBUILT_TEMPLATES } from "./data/prebuiltTemplates";
import { PatentApiService } from "./services/patentApiService";
import { FormsListView } from "./components/forms/FormsListView";
import { FilledPatentFormsHub } from "./components/forms/FilledPatentFormsHub";
import { FormRuntime } from "./components/runtime/FormRuntime";
import { OfficialPaperPrintModal } from "./components/print/OfficialPaperPrintModal";
import { DashboardHeader } from "./components/builder/DashboardHeader";
import { PaletteSidebar } from "./components/builder/PaletteSidebar";
import { DashboardCanvas } from "./components/builder/DashboardCanvas";
import { PropertyInspector } from "./components/builder/PropertyInspector";
import { FormsGalleryModal } from "./components/forms/FormsGalleryModal";
import { BrainiacPortalLayout } from "./components/layout/BrainiacPortalLayout";
import { AddPatentDesignView } from "./components/patent/AddPatentDesignView";
import { PatentListView } from "./components/patent/PatentListView";
import { PatentReminderView } from "./components/patent/PatentReminderView";

export default function App() {
  const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const initialModeFromUrl = urlParams ? urlParams.get("mode") : null;
  const initialNavFromUrl = urlParams ? urlParams.get("nav") : null;
  const initialFileNoFromEnv = (typeof window !== "undefined" && (window.INITIAL_FILE_NO || urlParams?.get("fileNo"))) || "645P";

  // Default to patent_list so patent records are immediately presented
  const [activePortalNav, setActivePortalNav] = useState(
    initialNavFromUrl ||
    (initialModeFromUrl === "fill" ? "patent_fill" :
     initialModeFromUrl === "builder" ? "patent_builder" : "patent_list")
  );

  const [viewMode, setViewMode] = useState(
    initialModeFromUrl === "fill" ? "fill" :
    initialModeFromUrl === "builder" ? "builder" : "list"
  ); // "list" | "builder" | "fill"

  const [fillSubMode, setFillSubMode] = useState("hub"); // "hub" | "canvas"
  const [allForms, setAllForms] = useState(PREBUILT_TEMPLATES);
  const [currentForm, setCurrentForm] = useState(PREBUILT_TEMPLATES[0]); // Defaults to Indian Patent Form 3!
  const [selectedFieldId, setSelectedFieldId] = useState(currentForm.fields[1]?.id || null);
  const [topTab, setTopTab] = useState("form");
  const [selectedFileNo, setSelectedFileNo] = useState(initialFileNoFromEnv);
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [liveValues, setLiveValues] = useState({});
  const [populatedFieldIds, setPopulatedFieldIds] = useState(new Set());
  const [lastPopulatedCount, setLastPopulatedCount] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showFormsGallery, setShowFormsGallery] = useState(false);
  const [dbPatents, setDbPatents] = useState([]);

  useEffect(() => {
    PatentApiService.fetchPatentsList().then(list => {
      if (list && list.length > 0) {
        setDbPatents(list);
      }
    });

    if (initialFileNoFromEnv) {
      handleAutoFetchApi(initialFileNoFromEnv);
    }
  }, []);

  const handleSelectField = (fieldId) => {
    setSelectedFieldId(fieldId);
  };

  const handleUpdateField = (fieldId, updates) => {
    setCurrentForm(prev => ({
      ...prev,
      fields: prev.fields.map(f => f.id === fieldId ? { ...f, ...updates } : f)
    }));
  };

  const handleDeleteField = (fieldId) => {
    setCurrentForm(prev => ({
      ...prev,
      fields: prev.fields.filter(f => f.id !== fieldId)
    }));
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    }
  };

  const handleCloneField = (fieldId) => {
    const original = currentForm.fields.find(f => f.id === fieldId);
    if (!original) return;
    const cloned = {
      ...original,
      id: `${original.id}_copy_${Date.now().toString(36).slice(-4)}`,
      label: `${original.label} (Copy)`
    };
    const index = currentForm.fields.findIndex(f => f.id === fieldId);
    const newFields = [...currentForm.fields];
    newFields.splice(index + 1, 0, cloned);
    setCurrentForm(prev => ({ ...prev, fields: newFields }));
    setSelectedFieldId(cloned.id);
  };

  const handleDropField = (paletteItem, targetSectionId, beforeFieldId) => {
    const uniqueId = `f_${paletteItem.id}_${Date.now().toString(36).slice(-4)}`;
    const targetSec = targetSectionId || currentForm.sections[0]?.id;
    
    let newField;
    if (paletteItem.type === "dynamic_table" || paletteItem.isTable) {
      newField = {
        id: uniqueId,
        name: paletteItem.label,
        label: paletteItem.label,
        type: "dynamic_table",
        tableType: paletteItem.tableType || "applicants",
        width: 100,
        sectionId: targetSec,
        isAutoCaptured: true,
        apiMapping: paletteItem.apiMapping || "table_applicants",
        columns: paletteItem.columns || [
          { key: "name", label: "Name of Applicant / Inventor", type: "text" },
          { key: "nationality", label: "Nationality", type: "text" },
          { key: "address", label: "Registered Statutory Address", type: "textarea" }
        ],
        required: true
      };
    } else if (paletteItem.type === "static_text") {
      newField = {
        id: uniqueId,
        type: "static_text",
        isStatic: true,
        width: 100,
        sectionId: targetSec,
        content: paletteItem.defaultContent || "Statutory Declaration: The applicant hereby declares compliance with statutory patent procedures under the Indian Patents Act, 1970."
      };
    } else {
      newField = {
        id: uniqueId,
        name: paletteItem.label,
        label: paletteItem.label,
        type: paletteItem.type || "text",
        width: paletteItem.defaultWidth || 50,
        sectionId: targetSec,
        isAutoCaptured: !!paletteItem.isAutoCaptured,
        apiMapping: paletteItem.apiMapping || "",
        placeholder: `Enter ${paletteItem.label}...`,
        required: false
      };
    }

    setCurrentForm(prev => {
      const updatedFields = [...prev.fields];
      if (beforeFieldId) {
        const idx = updatedFields.findIndex(f => f.id === beforeFieldId);
        if (idx === -1) updatedFields.push(newField);
        else updatedFields.splice(idx, 0, newField);
      } else {
        updatedFields.push(newField);
      }
      return { ...prev, fields: updatedFields };
    });

    setSelectedFieldId(newField.id);
  };

  const handleReorderField = (fieldId, targetFieldId, newSectionId) => {
    setCurrentForm(prev => {
      const fieldIdx = prev.fields.findIndex(f => f.id === fieldId);
      if (fieldIdx === -1) return prev;
      
      const movedField = { ...prev.fields[fieldIdx] };
      if (newSectionId) movedField.sectionId = newSectionId;
      
      const remaining = prev.fields.filter(f => f.id !== fieldId);
      if (targetFieldId) {
        const targetIdx = remaining.findIndex(f => f.id === targetFieldId);
        if (targetIdx === -1) remaining.push(movedField);
        else remaining.splice(targetIdx, 0, movedField);
      } else {
        remaining.push(movedField);
      }
      return { ...prev, fields: remaining };
    });
  };

  const handleCloneSection = (sectionId) => {
    setCurrentForm(prev => {
      const section = prev.sections.find(s => s.id === sectionId);
      if (!section) return prev;
      const newSecId = `sec_${Date.now().toString(36).slice(-4)}`;
      const clonedSec = { ...section, id: newSecId, title: `${section.title} (Copy)` };
      const clonedFields = prev.fields
        .filter(f => f.sectionId === sectionId)
        .map(f => ({
          ...f,
          id: `${f.id}_copy_${Date.now().toString(36).slice(-4)}`,
          sectionId: newSecId
        }));
      return {
        ...prev,
        sections: [...prev.sections, clonedSec],
        fields: [...prev.fields, ...clonedFields]
      };
    });
  };

  const handleDeleteSection = (sectionId) => {
    if (currentForm.sections.length <= 1) {
      alert("At least one section must remain on the form.");
      return;
    }
    setCurrentForm(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== sectionId),
      fields: prev.fields.filter(f => f.sectionId !== sectionId)
    }));
  };

  const handleUpdateSection = (sectionId, updates) => {
    setCurrentForm(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === sectionId ? { ...s, ...updates } : s)
    }));
  };

  const handleAddSection = () => {
    const newSecId = `sec_${Date.now().toString(36).slice(-4)}`;
    setCurrentForm(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: newSecId,
          title: `Section ${prev.sections.length + 1}: Additional Information`,
          description: "Drag fields or dynamic tables here"
        }
      ]
    }));
  };

  const handleUpdateDynamicTable = (fieldId, updatedRows) => {
    setLiveValues(prev => ({
      ...prev,
      [fieldId]: updatedRows
    }));
  };

  const handleUpdateFieldValue = (fieldId, value) => {
    setLiveValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleAutoFetchApi = async (fileNo) => {
    if (!fileNo) return;
    setIsLoadingApi(true);
    try {
      const patentData = await PatentApiService.fetchByFileNo(fileNo);
      const autoResult = PatentApiService.autoPopulateFormData(patentData, currentForm.fields);
      
      const applicantsData = (patentData.tableApplicants && patentData.tableApplicants.length > 0)
        ? patentData.tableApplicants
        : (patentData.applicants && patentData.applicants.length > 0)
          ? patentData.applicants.map(a => ({ name: a.name || "", nationality: a.nationality || "Indian", address: a.address || "" }))
          : [];
      const defaultApplicants = applicantsData.length > 0 ? applicantsData : [{ name: "", nationality: "Indian", address: "" }];

      const foreignFilingsData = (patentData.tableForeignFilings && patentData.tableForeignFilings.length > 0)
        ? patentData.tableForeignFilings
        : (patentData.foreignFilings && patentData.foreignFilings.length > 0)
          ? patentData.foreignFilings.map(ff => ({
              country: ff.country_name || ff.country || "",
              appDate: ff.app_date || ff.appDate || "",
              appNo: ff.app_no || ff.appNo || "",
              status: ff.status || "Pending Examination",
              pubDate: ff.pub_date || ff.pubDate || "—",
              grantDate: ff.grant_date || ff.grantDate || "—"
            }))
          : [];
      const defaultForeignFilings = foreignFilingsData.length > 0 ? foreignFilingsData : [{ country: "", appDate: "", appNo: "", status: "Pending Examination", pubDate: "", grantDate: "" }];

      setLiveValues(prev => ({
        ...prev,
        ...autoResult.values,
        table_applicants: defaultApplicants,
        table_inventors: defaultApplicants,
        table_foreign_filings: defaultForeignFilings,
        f1_applicant_ref_no: patentData.fileNo || fileNo,
        f1_invention_title: patentData.title || "",
        f1_applicant_category: patentData.entityStatus || "Small Entity",
        f1_inventors_same: "No",
        request_form: `Patent File: ${patentData.fileNo || fileNo}`,
        request_date: patentData.filingDate || "",
        requestor_name: patentData.applicant?.name || defaultApplicants[0]?.name || "",
        subject: patentData.title || "",
        comments: patentData.abstract || "",
        department: `${patentData.applicant?.name || ""} (${patentData.entityStatus || "IPO"})`
      }));

      const allIds = currentForm.fields.map(f => f.id);
      setPopulatedFieldIds(new Set(allIds));
      setTimeout(() => setPopulatedFieldIds(new Set()), 2500);

      const totalPop = autoResult.populatedFieldsCount + defaultApplicants.length + defaultForeignFilings.length;
      setLastPopulatedCount(totalPop);
    } catch (err) {
      console.error("API auto-fetch error:", err);
    } finally {
      setIsLoadingApi(false);
    }
  };

  const handleSelectFileNo = (fileNo) => {
    setSelectedFileNo(fileNo);
    handleAutoFetchApi(fileNo);
  };

  const handleOpenBuilder = (form) => {
    setCurrentForm(form);
    setSelectedFieldId(form.fields[0]?.id || null);
    setViewMode("builder");
    if (selectedFileNo) {
      setTimeout(() => handleAutoFetchApi(selectedFileNo), 60);
    }
  };

  const handleCreateNewForm = (formTitle, templateId, applicationType = "Ordinary Application") => {
    let newForm;
    if (templateId && templateId !== "blank") {
      const template = allForms.find(f => f.id === templateId) || PREBUILT_TEMPLATES[0];
      newForm = {
        ...JSON.parse(JSON.stringify(template)),
        id: `form_${Date.now().toString(36)}`,
        title: formTitle,
        shortName: formTitle.length > 25 ? formTitle.slice(0, 25) + "..." : formTitle,
        applicationType: applicationType,
        lastModified: "Just now"
      };
      if (newForm.fields) {
        newForm.fields = newForm.fields.map(f => f.id === "f1_application_type" ? { ...f, defaultValue: applicationType } : f);
      }
    } else {
      newForm = {
        id: `custom_form_${Date.now().toString(36)}`,
        title: formTitle,
        shortName: formTitle.length > 25 ? formTitle.slice(0, 25) + "..." : formTitle,
        category: "Custom Forms",
        categoryCode: "CUSTOM",
        badgeColor: "#64748b",
        description: "Statutory patent filing form created with visual builder.",
        jurisdiction: "IPO",
        applicationType: applicationType,
        version: "1.0",
        lastModified: "Just now",
        sections: [
          { id: "sec_1", title: "General Information", description: "Form fields & dynamic tables" }
        ],
        fields: []
      };
    }
    setAllForms(prev => [newForm, ...prev]);
    setCurrentForm(newForm);
    setSelectedFieldId(newForm.fields[0]?.id || null);
    setLiveValues({});
    setLastPopulatedCount(0);
    setViewMode("builder");
  };

  const handleDuplicateForm = (form) => {
    const copy = {
      ...JSON.parse(JSON.stringify(form)),
      id: `${form.id}_copy_${Date.now().toString(36).slice(-4)}`,
      title: `${form.title} (Copy)`,
      shortName: `${form.shortName || form.title} (Copy)`,
      lastModified: "Just now"
    };
    setAllForms(prev => [copy, ...prev]);
  };

  const handleDeleteForm = (formIdOrArray) => {
    if (Array.isArray(formIdOrArray)) {
      const toDelete = new Set(formIdOrArray);
      setAllForms(prev => prev.filter(f => !toDelete.has(f.id)));
    } else {
      setAllForms(prev => prev.filter(f => f.id !== formIdOrArray));
    }
  };

  const handleUpdateForm = (updatedForm) => {
    setAllForms(prev => prev.map(f => f.id === updatedForm.id ? updatedForm : f));
    if (currentForm && currentForm.id === updatedForm.id) {
      setCurrentForm(updatedForm);
    }
  };

  const handleOpenPdfReport = async (form, fileNo = selectedFileNo, customValues = null) => {
    try {
      const activeNo = fileNo || selectedFileNo || "645P";
      const patentData = await PatentApiService.fetchByFileNo(activeNo);
      const { values: autoVals } = PatentApiService.autoPopulateFormData(patentData, form?.fields || []);
      if (form) setCurrentForm(form);
      setSelectedFileNo(activeNo);
      setLiveValues({
        ...autoVals,
        ...(customValues || {}),
        patent_file_no: patentData.fileNo,
        app_no: patentData.appNumber,
        app_number: patentData.appNumber,
        patent_title: patentData.title,
        title: patentData.title,
        filing_date: patentData.filingDate,
        type_of_application: patentData.typeOfApplication || "Ordinary Application",
        table_applicants: (customValues && customValues.table_applicants) || patentData.tableApplicants || patentData.applicants || [],
        table_foreign_filings: (customValues && customValues.table_foreign_filings) || patentData.tableForeignFilings || patentData.foreignFilings || []
      });
      setShowReviewModal(true);
    } catch (e) {
      console.warn("Could not prefill before PDF print, opening directly:", e);
      if (form) setCurrentForm(form);
      if (customValues) setLiveValues(customValues);
      setShowReviewModal(true);
    }
  };

  // Top Portal Navigation Handler
  const handlePortalNavigate = (navKey, fileNo) => {
    setActivePortalNav(navKey);
    if (navKey === "patent_builder") {
      setViewMode("list");
    } else if (navKey === "patent_fill") {
      setViewMode("fill");
      if (fileNo) {
        setSelectedFileNo(fileNo);
        handleAutoFetchApi(fileNo);
        setFillSubMode("canvas");
      } else {
        setFillSubMode("hub");
      }
    }
  };

  // Main Content Renderer based on active nav selection
  const renderViewContent = () => {
    // 1. ADD PATENT / DESIGN APPLICATION VIEW
    if (activePortalNav === "add_patent") {
      return (
        <AddPatentDesignView
          onSaveSuccess={(newPatent) => {
            setDbPatents(prev => [newPatent, ...prev]);
            handlePortalNavigate("patent_list");
          }}
          onCancel={() => handlePortalNavigate("patent_list")}
          onGoToFillForm={(fileNo) => handlePortalNavigate("patent_fill", fileNo)}
        />
      );
    }

    // 2. PATENT / DESIGN LIST VIEW
    if (activePortalNav === "patent_list") {
      return (
        <PatentListView
          patentsList={dbPatents}
          onOpenFillForm={(fileNo) => handlePortalNavigate("patent_fill", fileNo)}
          onOpenBuilder={(fileNo) => handlePortalNavigate("patent_builder", fileNo)}
          onAddNewPatent={() => handlePortalNavigate("add_patent")}
        />
      );
    }

    // 3. STATUTORY REMINDER PANEL VIEW
    if (activePortalNav === "patent_reminder") {
      return (
        <PatentReminderView
          onOpenFillForm={(fileNo) => handlePortalNavigate("patent_fill", fileNo)}
        />
      );
    }

    // 4. PATENT FORMS BUILDER (LIST MODE)
    if (viewMode === "list") {
      return (
        <>
          <FormsListView
            forms={allForms}
            onOpenBuilder={handleOpenBuilder}
            onOpenFillForm={(form, fileNo) => {
              if (form) setCurrentForm(form);
              if (fileNo) {
                setSelectedFileNo(fileNo);
                handleAutoFetchApi(fileNo);
              }
              setViewMode("fill");
              setFillSubMode("canvas");
              setActivePortalNav("patent_fill");
            }}
            onCreateNewForm={handleCreateNewForm}
            onDuplicateForm={handleDuplicateForm}
            onDeleteForm={handleDeleteForm}
            onUpdateForm={handleUpdateForm}
          />
          {showReviewModal && (
            <OfficialPaperPrintModal
              form={currentForm}
              formData={liveValues}
              fileNo={selectedFileNo}
              onClose={() => setShowReviewModal(false)}
            />
          )}
        </>
      );
    }

    // 5. FILL PATENT FORM (AUTO-FILL RUNTIME)
    if (viewMode === "fill") {
      if (fillSubMode === "hub") {
        return (
          <>
            <FilledPatentFormsHub
              forms={allForms}
              patentsList={dbPatents}
              selectedFileNo={selectedFileNo}
              onSelectFileNo={(fileNo) => {
                setSelectedFileNo(fileNo);
                handleAutoFetchApi(fileNo);
              }}
              onOpenFillForm={(form, fileNo) => {
                if (form) setCurrentForm(form);
                if (fileNo) {
                  setSelectedFileNo(fileNo);
                  handleAutoFetchApi(fileNo);
                }
                setFillSubMode("canvas");
                setActivePortalNav("patent_fill");
              }}
              onOpenPdfReport={handleOpenPdfReport}
            />
            {showReviewModal && (
              <OfficialPaperPrintModal
                form={currentForm}
                formData={liveValues}
                fileNo={selectedFileNo}
                onClose={() => setShowReviewModal(false)}
              />
            )}
          </>
        );
      }

      return (
        <>
          <FormRuntime
            forms={allForms}
            currentForm={currentForm}
            onSelectForm={(form) => setCurrentForm(form)}
            patentsList={dbPatents}
            selectedFileNo={selectedFileNo}
            onSelectFileNo={(fileNo) => {
              setSelectedFileNo(fileNo);
              handleAutoFetchApi(fileNo);
            }}
            onBackToList={() => setFillSubMode("hub")}
            onGoToBuilder={() => {
              setViewMode("builder");
              setActivePortalNav("patent_builder");
            }}
            onOpenPdfReport={handleOpenPdfReport}
          />
          {showReviewModal && (
            <OfficialPaperPrintModal
              form={currentForm}
              formData={liveValues}
              fileNo={selectedFileNo}
              onClose={() => setShowReviewModal(false)}
            />
          )}
        </>
      );
    }

    // 6. BUILDER MODE (VISUAL FORM DESIGNER)
    const activeSelectedField = currentForm.fields.find(f => f.id === selectedFieldId);

    return (
      <div className="desktop-viewport">
        <div className="builder-modal-shell">
          <DashboardHeader
            title={currentForm.title}
            onTitleChange={(newTitle) => setCurrentForm(prev => ({ ...prev, title: newTitle }))}
            activeTab={topTab}
            onTabChange={setTopTab}
            onReviewChanges={() => setShowReviewModal(true)}
            onBackToList={() => {
              setViewMode("list");
              setActivePortalNav("patent_builder");
            }}
            onGoToFill={() => {
              setViewMode("fill");
              setActivePortalNav("patent_fill");
            }}
            onSaveDraft={async () => {
              try {
                const res = await PatentApiService.saveSubmission({
                  formSchemaId: currentForm.id,
                  formTitle: currentForm.title,
                  fileNo: selectedFileNo,
                  data: liveValues,
                  status: "draft"
                });
                alert(res.message || "Draft and dynamic SQL tables saved successfully to database!");
              } catch (e) {
                console.error(e);
                alert("Draft saved to memory state.");
              }
            }}
            onNewBlankForm={() => {
              const blankForm = {
                id: `custom_form_${Date.now().toString(36)}`,
                title: "Untitled Custom Patent Form",
                shortName: "Custom Form",
                category: "Custom Forms",
                categoryCode: "CUSTOM",
                badgeColor: "#64748b",
                description: "New custom patent form created without technical development.",
                jurisdiction: "Custom",
                version: "1.0",
                sections: [
                  { id: "sec_1", title: "General Information", description: "Form fields" }
                ],
                fields: []
              };
              setCurrentForm(blankForm);
              setSelectedFieldId(null);
              setLiveValues({});
              setLastPopulatedCount(0);
            }}
            onAutoFetchApi={handleAutoFetchApi}
            isLoadingApi={isLoadingApi}
            selectedFileNo={selectedFileNo}
            onSelectFileNo={handleSelectFileNo}
            lastPopulatedCount={lastPopulatedCount}
            patentsList={dbPatents}
            currentFormId={currentForm.id}
            availableForms={PREBUILT_TEMPLATES}
            onSelectFormById={(formId) => {
              const found = PREBUILT_TEMPLATES.find(t => t.id === formId);
              if (found) {
                setCurrentForm(found);
                setSelectedFieldId(found.fields[0]?.id || null);
                setLiveValues({});
                setLastPopulatedCount(0);
                if (selectedFileNo) {
                  setTimeout(() => handleAutoFetchApi(selectedFileNo), 100);
                }
              }
            }}
          />

          <div className="builder-body">
            <PaletteSidebar
              onAddField={(item) => handleDropField(item, currentForm.sections[0]?.id)}
              currentFormId={currentForm.id}
              onSelectForm={(form) => {
                setCurrentForm(form);
                setSelectedFieldId(form.fields[0]?.id || null);
                if (form.categoryCode === "IN") {
                  setSelectedFileNo("IN-202411039821");
                } else {
                  setSelectedFileNo("US-11823901-B2");
                }
                setLiveValues({});
                setLastPopulatedCount(0);
              }}
              onOpenFormsGallery={() => setShowFormsGallery(true)}
              onNewBlankForm={() => {
                const blank = {
                  id: `custom_form_${Date.now().toString(36)}`,
                  title: "New Patent Form",
                  shortName: "New Form",
                  category: "Custom Forms",
                  categoryCode: "CUSTOM",
                  badgeColor: "#64748b",
                  description: "New custom patent form created without technical development.",
                  jurisdiction: "IPO",
                  version: "1.0",
                  sections: [
                    { id: "sec_1", title: "General Information", description: "Form fields" }
                  ],
                  fields: []
                };
                setCurrentForm(blank);
                setSelectedFieldId(null);
                setLiveValues({});
                setLastPopulatedCount(0);
              }}
            />

            <DashboardCanvas
              form={currentForm}
              selectedFieldId={selectedFieldId}
              onSelectField={handleSelectField}
              onUpdateField={handleUpdateField}
              onDeleteField={handleDeleteField}
              onCloneField={handleCloneField}
              onDropField={handleDropField}
              onReorderField={handleReorderField}
              onUpdateFieldValue={handleUpdateFieldValue}
              populatedFieldIds={populatedFieldIds}
              liveValues={liveValues}
              onUpdateDynamicTable={handleUpdateDynamicTable}
              onCloneSection={handleCloneSection}
              onDeleteSection={handleDeleteSection}
              onUpdateSection={handleUpdateSection}
              onAddSection={handleAddSection}
              onSaveAndClose={() => setShowReviewModal(true)}
            />

            <PropertyInspector
              selectedField={activeSelectedField}
              allFields={currentForm.fields}
              onUpdateField={handleUpdateField}
              onDeleteField={handleDeleteField}
              onClose={() => setSelectedFieldId(null)}
            />
          </div>
        </div>

        {showReviewModal && (
          <OfficialPaperPrintModal
            form={currentForm}
            formData={liveValues}
            fileNo={selectedFileNo}
            onClose={() => setShowReviewModal(false)}
          />
        )}

        {showFormsGallery && (
          <FormsGalleryModal
            currentFormId={currentForm.id}
            onSelectForm={(form) => {
              setCurrentForm(form);
              setSelectedFieldId(form.fields[0]?.id || null);
              if (form.categoryCode === "IN") {
                setSelectedFileNo("IN-202411039821");
              } else {
                setSelectedFileNo("US-11823901-B2");
              }
              setLiveValues({});
              setLastPopulatedCount(0);
            }}
            onClose={() => setShowFormsGallery(false)}
            onCreateBlankForm={() => {
              const blank = {
                id: `custom_form_${Date.now().toString(36)}`,
                title: "Untitled Custom Patent Form",
                shortName: "Custom Form",
                category: "Custom Forms",
                categoryCode: "CUSTOM",
                badgeColor: "#64748b",
                description: "Custom visual form created with drag & drop.",
                jurisdiction: "Custom",
                version: "1.0",
                sections: [
                  { id: "sec_1", title: "General Information", description: "Form fields" }
                ],
                fields: []
              };
              setCurrentForm(blank);
              setSelectedFieldId(null);
            }}
          />
        )}
      </div>
    );
  };

  // If embedded in CodeIgniter iframe without portal shell, render main content directly
  const isEmbed = typeof window !== "undefined" && window.self !== window.top;
  if (urlParams?.get("embed") === "true" || (isEmbed && urlParams?.get("shell") !== "true")) {
    return renderViewContent();
  }

  return (
    <BrainiacPortalLayout
      activeNav={activePortalNav}
      onNavigate={handlePortalNavigate}
    >
      {renderViewContent()}
    </BrainiacPortalLayout>
  );
}
