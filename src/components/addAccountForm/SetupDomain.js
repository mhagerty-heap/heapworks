import React from "react";
import { InputText } from 'primereact/inputtext';


function SetupDomain({ formData, setFormData }) {
  return (

    <div className="sign-up-container">
      <div className="field col-12 md:col-4">
      <label htmlFor="in">Support Username</label>
        <InputText style={{width: "325px"}} placeholder="ex: play = play@playworks.com" value={formData.supportUsername} onChange={(event) => setFormData({ ...formData, supportUsername: event.target.value } )}/>
      </div>
      <div className="field col-12 md:col-4">
      <label htmlFor="in">Helpdesk Name</label>
        <InputText style={{width: "325px"}} placeholder="ex: Play Helpdesk" value={formData.helpdeskName} onChange={(event) => setFormData({ ...formData, helpdeskName: event.target.value } )}/>
      </div>
      <div className="field col-12 md:col-4">
        <label htmlFor="in">Helpdesk Domain</label>
          <InputText style={{width: "325px"}} placeholder="ex: play = play.playworks.com" value={formData.helpdeskDomain} onChange={(event) => setFormData({ ...formData, helpdeskDomain: event.target.value } )}/>
      </div>
    </div>

  );
}

export default SetupDomain;
