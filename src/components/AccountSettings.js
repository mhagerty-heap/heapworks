import React, { useState, useRef, useEffect } from "react";
import SetupDomain from "./addAccountForm/SetupDomain";
import SetupBusinessDays from "./addAccountForm/SetupBusinessDays";
import SetupSla from "./addAccountForm/SetupSla";
import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';
import { ListBox } from 'primereact/listbox';
import { Dropdown } from 'primereact/dropdown';
import { Link } from "react-router-dom";


function AccountSettings() {

  const [displayBasic, setDisplayBasic] = useState(false);
  const [position, setPosition] = useState('center');
  const formSuccessMessage = useRef(null);
  const formFailMessage = useRef(null);

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
  }

  const onClick = (name, position) => {
      dialogFuncMap[`${name}`](true);

      if (position) {
          setPosition(position);
      }
  }

  const onHide = (name) => {
      dialogFuncMap[`${name}`](false);
  }

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

  const respondHoursOptions = [
    {label: '1-2 Hours', value: '1-2'},
    {label: '3-5 Hours', value: '3-5'},
    {label: '5-10 Hours', value: '5-10'},
    {label: '10-24 Hours', value: '10-24'}
  ];

  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    supportUsername: "",
    helpdeskName: "",
    helpdeskDomain: "",
    supportDays: [],
    supportHours: "",
    slaName: "",
    urgentResponseWithinTime: "",
    urgentResolveWithinTime: "",
    highResponseWithinTime: "",
    highResolveWithinTime: ""
  });

  const FormTitles = ["Setup User & Domain", "Setup Business Days", "Setup SLA"];

  const PageDisplay = () => {
    if (page === 0) {
      return <SetupDomain formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <SetupBusinessDays formData={formData} setFormData={setFormData} />;
    } else {
      return <SetupSla formData={formData} setFormData={setFormData} />;
    }
  };

  const formSubmitMessage = (e) => {
    //e.preventDefault(); // prevents page from reloading
    console.log(e);
    if (formData.supportUsername) {
      formSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: ' Account Details Saved!'});
      const accountSettingsString = JSON.stringify(formData); // stringify formData, required for sessionStorage
      const accountSettingsLocalCopy = sessionStorage.setItem('accountSettingsLocalCopy', accountSettingsString); // store ticketsLocalCopy key data in localStorage
    } else {
      formFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'For Demo purposes, at a minimum, enter the Support Username'});
    }
  };

  const clearSessionStorage = () => {
    sessionStorage.removeItem('accountSettingsLocalCopy');
  }


  useEffect(() => {
    if ("accountSettingsLocalCopy" in sessionStorage && sessionStorage.getItem("accountSettingsLocalCopy") !== null && sessionStorage.getItem("accountSettingsLocalCopy") !== '""') { // check if data already exists in sessionStorage
      console.log('accountSettingsLocalCopy exists in sessionStorage'); // placeholder
      const accountSettingsLocalCopyParsed = JSON.parse(sessionStorage.getItem("accountSettingsLocalCopy"));
      setFormData(accountSettingsLocalCopyParsed);
    } else {
      console.log('accountSettingsLocalCopy does not exist in sessionStorage');
      //const settingsString = JSON.stringify(initiallyRetrievedTicketData); // stringify initiallyRetrievedTicketData, required for sessionStorage
      //const settingsLocalCopy = sessionStorage.setItem('ticketsLocalCopy', ticketsString); // store ticketsLocalCopy key data in localStorage
    }
  });


  return (

    <div >
      <div className=" card">

        <h5>Account Settings &nbsp;&nbsp;
          <Button label="Start Wizard" icon="pi pi-bolt" className="p-button-sm" onClick={() => onClick('displayBasic')}></Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button className="p-link layout-topbar-button" style={{ color: 'transparent' }} onClick={clearSessionStorage} >
            <i className="pi pi-minus"/>
          </button>
        </h5>
        <div className="field col-12 md:col-4"></div>
        <Messages ref={formSuccessMessage} />
        <Messages ref={formFailMessage} />

        <div className="p-fluid grid">
          <div className="card grid col-12">
            <h5>Username & Domain Settings</h5>
            <div className="field col-12 md:col-4"></div>
            <div className="field col-12 md:col-4"></div>
            <div className="field col-12 md:col-4">
              <label htmlFor="in">Support Username</label>&nbsp;&nbsp;
              <InputText id="supportUsername" style={{width: "250px"}} placeholder="ex: play = play@playworks.com" value={formData.supportUsername} onChange={(event) => setFormData({ ...formData, supportUsername: event.target.value } )}/>
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="in">Helpdesk Name</label>&nbsp;&nbsp;
              <InputText id="helpdeskName" style={{width: "250px"}} placeholder="ex: Play Helpdesk" value={formData.helpdeskName} onChange={(event) => setFormData({ ...formData, helpdeskName: event.target.value } )}/>
            </div>
            <div className="field col-12 md:col-4">
                <label htmlFor="in">Helpdesk Domain</label>&nbsp;&nbsp;
                <InputText id="helpdeskDomain" style={{width: "250px"}} placeholder="ex: play = play.playworks.com" value={formData.helpdeskDomain} onChange={(event) => setFormData({ ...formData, helpdeskDomain: event.target.value } )}/>
            </div>
          </div>

          <div className="card grid col-12">
          <h5>Business Day & Hours Settings</h5>
          <div className="field col-12 md:col-4"></div>
          <div className="field col-12 md:col-4"></div>
            <div className="field col-12 md:col-4">
              <label htmlFor="in">Select Your Support Days (Multiple Allowed)</label>
              <ListBox id="supportDays" multiple value={formData.supportDays} options={businessDays} onChange={(event) => setFormData({ ...formData, supportDays: event.target.value } )} />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="in">Select Your Support Hours (One Option Allowed)</label>
              <ListBox id="supportHours" value={formData.supportHours} options={supportHours} onChange={(event) => setFormData({ ...formData, supportHours: event.target.value } )} />
            </div>
            <div className="field col-12 md:col-4">
            </div>
          </div>

          <div className="card grid col-12">
          <h5>SLA Policy Settings</h5>
          <div className="field col-12 md:col-4"></div>
          <div className="field col-12 md:col-4"></div>
            <div className="field col-12 md:col-4">
              <label htmlFor="in">SLA Policy Name</label>&nbsp;&nbsp;
              <InputText id="slaName" style={{width: "250px"}} placeholder="ex: Our Default Policy" value={formData.slaName} onChange={(event) => setFormData({ ...formData, slaName: event.target.value } )}/>
            </div>
            <div className="field col-12 md:col-4">
            </div>
            <div className="field col-12 md:col-4">
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="in">Urgent Respond Within Time</label>
              <Dropdown id="urgentResponseWithinTime" options={respondHoursOptions} value={formData.urgentResponseWithinTime} onChange={(event) => setFormData({ ...formData, urgentResponseWithinTime: event.target.value } )}/>
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="in">Urgent Resolve Within Time</label>
              <Dropdown id="urgentResolveWithinTime" options={respondHoursOptions} value={formData.urgentResolveWithinTime} onChange={(event) => setFormData({ ...formData, urgentResolveWithinTime: event.target.value } )}/>
            </div>
            <div className="field col-12 md:col-4">
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="in">High Respond Within Time</label>
              <Dropdown id="highResponseWithinTime" options={respondHoursOptions} value={formData.highResponseWithinTime} onChange={(event) => setFormData({ ...formData, highResponseWithinTime: event.target.value } )}/>
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="in">High Resolve Within Time</label>
              <Dropdown id="highResolveWithinTime" options={respondHoursOptions} value={formData.highResolveWithinTime} onChange={(event) => setFormData({ ...formData, highResolveWithinTime: event.target.value } )}/>
            </div>
            <div className="field col-12 md:col-4">
            </div>
          </div>


        </div>


        <div className="form">
          <Dialog header="Configure your account" visible={displayBasic} style={{ width: '40vw' }} onHide={() => {console.log("clicked close button"); setDisplayBasic(false);}}>
            <div className="progressbar">
              <div style={{ width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%" }}></div>
            </div>
            <div className="form-container">
              <div className="header">
                <h5>{FormTitles[page]}</h5>
              </div>
              <div className="body">{PageDisplay()}</div><h5></h5>
              <div className="footer">

                <Button id="Previous" disabled={page == 0} label="Previous" onClick={() => {setPage((currPage) => currPage - 1)}} />
                &nbsp;&nbsp;
                <Button id={page === FormTitles.length - 1 ? "Submit" : "Next"} label={page === FormTitles.length - 1 ? "Submit" : "Next"} onClick={() => {
                  if (page === FormTitles.length - 1) {
                    console.log(formData);
                    setDisplayBasic(false);
                    formSubmitMessage();
                  } else {
                    setPage((currPage) => currPage + 1);
                  }

                }} />
              </div>
            </div>
          </Dialog>
        </div>


      </div>
    </div>

  );
}

export default AccountSettings;
