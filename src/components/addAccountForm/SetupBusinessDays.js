import React from "react";
import { InputText } from 'primereact/inputtext';
import { ListBox } from 'primereact/listbox';

function SetupBusinessDays({ formData, setFormData }) {

  const businessDays = [
    {label: 'Monday', value: 'Monday'},
    {label: 'Tuesday', value: 'Tuesday'},
    {label: 'Wednesday', value: 'Wednesday'},
    {label: 'Thursday', value: 'Thursday'},
    {label: 'Friday', value: 'Friday'}
  ];

  const supportHours = [
    {label: '24 Hours a Day', value: '24'},
    {label: '9am-5pm EST', value: '9-5est'},
    {label: '12pm-8pm EST', value: '12-8est'},
    {label: '9am-8pm EST', value: '9-8est'}
  ];


  return (

    <div className="sign-up-container">
      <div className="field col-12 md:col-4">
        <label htmlFor="in">Select Your Support Days (Multiple Allowed)</label>
        <ListBox id="supportDaysWizard" multiple value={formData.supportDays} options={businessDays} onChange={(event) => setFormData({ ...formData, supportDays: event.target.value } )} />

      </div>
      <div className="field col-12 md:col-4">
        <label htmlFor="in">Select Your Support Hours (One Option Allowed)</label>
        <ListBox id="supportHoursWizard" value={formData.supportHours} options={supportHours} onChange={(event) => setFormData({ ...formData, supportHours: event.target.value } )} />
      </div>
    </div>

  );
}

export default SetupBusinessDays;
