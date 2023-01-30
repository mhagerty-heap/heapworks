import React from "react";
import { InputText } from 'primereact/inputtext';


function SetupDomain({ formData, setFormData }) {
  return (

    <div className="sign-up-container">
      <div className="field col-12 md:col-4" name="supportUsername">
      <label htmlFor="in">Support Username</label>
        <InputText id="supportUsername" style={{width: "325px"}} placeholder="ex: test = test@servicedesk.com" value={formData.supportUsername} onChange={(event) => setFormData({ ...formData, supportUsername: event.target.value } )}/>
      </div>
      <div className="field col-12 md:col-4" name="helpdeskName">
      <label htmlFor="in">Helpdesk Name</label>
        <InputText id="helpdeskName" style={{width: "325px"}} placeholder="ex: ServiceDesk Helpdesk" value={formData.helpdeskName} onChange={(event) => setFormData({ ...formData, helpdeskName: event.target.value } )}/>
      </div>
      <div className="field col-12 md:col-4" name="helpdeskDomain">
        <label htmlFor="in">Helpdesk Domain</label>
          <InputText id="helpdeskDomain" style={{width: "325px"}} placeholder="ex: test = test.servicedesk.com" value={formData.helpdeskDomain} onChange={(event) => setFormData({ ...formData, helpdeskDomain: event.target.value } )}/>
      </div>
    </div>

  );
}

export default SetupDomain;
