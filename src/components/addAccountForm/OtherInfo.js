import React from "react";
import { ListBox } from 'primereact/listbox';

function OtherInfo({ formData, setFormData }) {

  const otherFinancialInterestItems = [
    {label: 'IT Assets', value: 'itAssets'},
    {label: 'Ticket Routing', value: 'ticketRouting'},
    {label: 'Automated Workflow', value: 'automatedWorkflow'},
    {label: 'Technical Articles', value: 'technicalArticles'},
    {label: 'Release Notes', value: 'releaseNotes'}
  ];

  return (

    <div className="personal-info-container">
      <div className="field col-12 md:col-4">

        <ListBox id="otherFinancialInterests" multiple value={formData.otherFinancialInterests} options={otherFinancialInterestItems} onChange={(e) => setFormData({ ...formData, otherFinancialInterests: e.target.value })} />
      </div>
    </div>

  );
}

export default OtherInfo;
