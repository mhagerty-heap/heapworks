import React from "react";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';



function SetupSla({ formData, setFormData }) {

  const respondHoursOptions = [
    {label: '1-2 Hours', value: '1-2'},
    {label: '3-5 Hours', value: '3-5'},
    {label: '5-10 Hours', value: '5-10'},
    {label: '10-24 Hours', value: '10-24'}
  ];

  return (

    <div className="sign-up-container">
      <div className="field col-12 md:col-4">
        <label htmlFor="in">SLA Policy Name</label>
        <InputText id="slaName" style={{width: "325px"}} placeholder="ServiceDesk Default Policy" value={formData.slaName} onChange={(event) => setFormData({ ...formData, slaName: event.target.value } )}/>
      </div>
      <div className="field col-12 md:col-4">
        <label htmlFor="in">Urgent Respond Within Time</label>
        <Dropdown id="urgentResponseWithinTine" value={formData.urgentResponseWithinTime} options={respondHoursOptions} onChange={(event) => setFormData({ ...formData, urgentResponseWithinTime: event.target.value } )}/>
      </div>
      <div className="field col-12 md:col-4">
        <label htmlFor="in">Urgent Resolve Within Time</label>
        <Dropdown id="urgentResolveWithinTime" value={formData.urgentResolveWithinTime} options={respondHoursOptions} onChange={(event) => setFormData({ ...formData, urgentResolveWithinTime: event.target.value } )}/>
      </div>
      <div className="field col-12 md:col-4">
        <label htmlFor="in">High Respond Within Time</label>
        <Dropdown id="highResponseWithinTime" value={formData.highResponseWithinTime} options={respondHoursOptions} onChange={(event) => setFormData({ ...formData, highResponseWithinTime: event.target.value } )}/>
      </div>
      <div className="field col-12 md:col-4">
        <label htmlFor="in">High Resolve Within Time</label>
        <Dropdown id="highResolveWithinTime" value={formData.highResolveWithinTime} options={respondHoursOptions} onChange={(event) => setFormData({ ...formData, highResolveWithinTime: event.target.value } )}/>
      </div>
    </div>

  );
}

export default SetupSla;
