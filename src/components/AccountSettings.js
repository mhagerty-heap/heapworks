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
import { Divider } from 'primereact/divider';
import { Link } from "react-router-dom";


function AccountSettings() {

  const [displayBasic, setDisplayBasic] = useState(false);
  const [position, setPosition] = useState('center');
  const wizardFormSuccessMessage = useRef(null);
  const wizardFormFailMessage = useRef(null);
  const nonWizardFormSuccessMessage = useRef(null);
  const nonWizardFormFailMessage = useRef(null);
  const [supportUsernameValue, setSupportUsernameValue] = useState('');
  const [helpdeskNameValue, setHelpdeskNameValue] = useState('');
  const [helpdeskDomainValue, setHelpdeskDomainValue] = useState('');
  const [supportDaysValue, setSupportDaysValue] = useState('');
  const [supportHoursValue, setSupportHoursValue] = useState('');
  const [slaPolicyNameValue, setSlaPolicyNameValue] = useState('');
  const [urgentResponseWithinTimeValue, setUrgentResponseWithinTimeValue] = useState('');
  const [urgentResolveWithinTimeValue, setUrgentResolveWithinTimeValue] = useState('');
  const [highResponseWithinTimeValue, setHighResponseWithinTimeValue] = useState('');
  const [highResolveWithinTimeValue, setHighResolveWithinTimeValue] = useState('');


  useEffect(() => {
    if ("accountSettingsLocalCopy" in sessionStorage && sessionStorage.getItem("accountSettingsLocalCopy") !== null && sessionStorage.getItem("accountSettingsLocalCopy") !== '""') { // check if data already exists in sessionStorage
      //console.log('ticketsLocalCopy already exists and is not null, so will use existing value from sessionStorage'); // placeholder
      const accountSettingsLocalCopyParsed = JSON.parse(sessionStorage.getItem("accountSettingsLocalCopy"));
      setFormData(accountSettingsLocalCopyParsed); // set values in wizard formData
      setSupportUsernameValue(accountSettingsLocalCopyParsed.supportUsername);
      setHelpdeskNameValue(accountSettingsLocalCopyParsed.helpdeskName);
      setHelpdeskDomainValue(accountSettingsLocalCopyParsed.helpdeskDomain);
      setSupportDaysValue(accountSettingsLocalCopyParsed.supportDays);
      setSupportHoursValue(accountSettingsLocalCopyParsed.supportHours);
      setSlaPolicyNameValue(accountSettingsLocalCopyParsed.slaName);
      setUrgentResponseWithinTimeValue(accountSettingsLocalCopyParsed.urgentResponseWithinTime);
      setUrgentResolveWithinTimeValue(accountSettingsLocalCopyParsed.urgentResolveWithinTime);
      setHighResponseWithinTimeValue(accountSettingsLocalCopyParsed.highResponseWithinTime);
      setHighResolveWithinTimeValue(accountSettingsLocalCopyParsed.highResolveWithinTime);
    }
  },[]); // closing brackets causes useEffect to run once instead of evevy state change

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

  const wizardFormSubmit = (e) => {
    //e.preventDefault(); // prevents page from reloading
    console.log(e);
    if (formData.supportUsername) {
      wizardFormSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Wizard Account Details Saved!'});
      const accountSettingsString = JSON.stringify(formData); // stringify formData, required for sessionStorage
      const accountSettingsLocalCopy = sessionStorage.setItem('accountSettingsLocalCopy', accountSettingsString);
      setSupportUsernameValue(formData.supportUsername);
      setHelpdeskNameValue(formData.helpdeskName);
      setHelpdeskDomainValue(formData.helpdeskDomain);
      setSupportDaysValue(formData.supportDays);
      setSupportHoursValue(formData.supportHours);
      setSlaPolicyNameValue(formData.slaName);
      setUrgentResponseWithinTimeValue(formData.urgentResponseWithinTime);
      setUrgentResolveWithinTimeValue(formData.urgentResolveWithinTime);
      setHighResponseWithinTimeValue(formData.highResponseWithinTime);
      setHighResolveWithinTimeValue(formData.highResolveWithinTime); // store ticketsLocalCopy key data in localStorage
    } else {
      wizardFormFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'For Demo purposes, at a minimum, enter the Support Username'});
    }
  };

  const nonWizardFormSubmit = (event) => { //submits ticket form entry data into sessionStorage
    event.preventDefault();
    if (supportUsernameValue) {
      nonWizardFormSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Form Account Details Saved!'});
      const formDataJsonObject = {helpdeskDomain: helpdeskDomainValue, helpdeskName: helpdeskNameValue, highResolveWithinTime: highResolveWithinTimeValue, highResponseWithinTime: highResponseWithinTimeValue, slaName: slaPolicyNameValue, supportDays: supportDaysValue, supportHours: supportHoursValue, supportUsername: supportUsernameValue, urgentResolveWithinTime: urgentResolveWithinTimeValue, urgentResponseWithinTime: urgentResponseWithinTimeValue};
      const accountSettingsString = JSON.stringify(formDataJsonObject); // stringify formData, required for sessionStorage
      const accountSettingsLocalCopy = sessionStorage.setItem('accountSettingsLocalCopy', accountSettingsString); // store ticketsLocalCopy key data in localStorage
      console.log(accountSettingsString);
      setFormData(formDataJsonObject);
    } else {
      nonWizardFormFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'For Demo purposes, at a minimum, enter the Support Username'});
    }
  };

  const clearSessionStorage = () => {
    sessionStorage.removeItem('accountSettingsLocalCopy');
  }


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
        <Messages ref={wizardFormSuccessMessage} />
        <Messages ref={wizardFormFailMessage} />

        <form id="accountSettingsNonWizard" name="accountSettingsNonWizard">
          <div className="p-fluid grid">
            <div className="card grid col-12">

              <Divider align="left">
                <div className="inline-flex align-items-center">
                  <i className="pi pi-user mr-2"></i>
                  <b>Username and Domain</b>
                </div>
              </Divider>

              <div className="field col-12 md:col-3">
                <label htmlFor="in">Support Username</label>&nbsp;&nbsp;
                <InputText id="supportUsernameValue" placeholder="ex: test = test@servicedesk.com" value={supportUsernameValue} onChange={(event) => setSupportUsernameValue(event.target.value)}/>
              </div>
              <div className="field col-12 md:col-3">
                <label htmlFor="in">Helpdesk Name</label>&nbsp;&nbsp;
                <InputText id="helpdeskName"  placeholder="ex: ServiceDesk Helpdesk" value={helpdeskNameValue} onChange={(event) => setHelpdeskNameValue(event.target.value)}/>
              </div>
              <div className="field col-12 md:col-3">
                  <label htmlFor="in">Helpdesk Domain</label>&nbsp;&nbsp;
                  <InputText id="helpdeskDomain"  placeholder="ex: test = test.servicedesk.com" value={helpdeskDomainValue} onChange={(event) => setHelpdeskDomainValue(event.target.value)}/>
              </div>
              <div className="field col-12 md:col-3">
              </div>

              <div className="grid col-12">
              <Divider align="left">
                <div className="inline-flex align-items-center">
                  <i className="pi pi-clock mr-2"></i>
                  <b>Business Days & Hours</b>
                </div>
              </Divider>
                <div className="field col-12 md:col-4">
                  <label htmlFor="in">Select Your Support Days (Multiple Allowed)</label>
                  <ListBox id="supportDaysNonWizard" multiple value={supportDaysValue} options={businessDays} onChange={(event) => setSupportDaysValue(event.value)} />
                </div>
                <div className="field col-12 md:col-4">
                  <label htmlFor="in">Select Your Support Hours (One Option Allowed)</label>
                  <ListBox id="supportHoursNonWizard" value={supportHoursValue} options={supportHours} onChange={(event) => setSupportHoursValue(event.value)} />
                </div>
                <div className="field col-12 md:col-4">
                </div>
              </div>

              <div className="grid col-12">
              <Divider align="left">
                <div className="inline-flex align-items-center">
                  <i className="pi pi-globe mr-2"></i>
                  <b>SLA Policy</b>
                </div>
              </Divider>
                  <div className="field col-12 md:col-4">
                    <label htmlFor="in">SLA Policy Name</label>&nbsp;&nbsp;&nbsp;
                    <InputText id="slaName" style={{width: "250px"}} placeholder="SLA Policy Name" value={slaPolicyNameValue} onChange={(event) => setSlaPolicyNameValue(event.target.value)}/>
                  </div>
                  <div className="field col-12 md:col-4">
                  </div>
                  <div className="field col-12 md:col-4">
                  </div>
                  <div className="field col-12 md:col-3">
                    <label htmlFor="in">Urgent Respond Within Time</label>
                    <Dropdown id="urgentResponseWithinTime" options={respondHoursOptions} value={urgentResponseWithinTimeValue} onChange={(event) => setUrgentResponseWithinTimeValue(event.value)}/>
                  </div>
                  <div className="field col-12 md:col-3">
                    <label htmlFor="in">Urgent Resolve Within Time</label>
                    <Dropdown id="urgentResolveWithinTime" options={respondHoursOptions} value={urgentResolveWithinTimeValue} onChange={(event) => setUrgentResolveWithinTimeValue(event.value)}/>
                  </div>
                  <div className="field col-12 md:col-3">
                    <label htmlFor="in">High Respond Within Time</label>
                    <Dropdown id="highResponseWithinTime" options={respondHoursOptions} value={highResponseWithinTimeValue} onChange={(event) => setHighResponseWithinTimeValue(event.value)}/>
                  </div>
                  <div className="field col-12 md:col-3">
                    <label htmlFor="in">High Resolve Within Time</label>
                    <Dropdown id="highResolveWithinTime" options={respondHoursOptions} value={highResolveWithinTimeValue} onChange={(event) => setHighResolveWithinTimeValue(event.value)}/>
                  </div>
                  <div className="col-2">
                    <Button id="updateAccountButtonNonWizard" name="updateAccountButtonNonWizard" label="Update Account" onClick={nonWizardFormSubmit}/>
                  </div>
                  <Toast ref={nonWizardFormSuccessMessage} />
                  <Toast ref={nonWizardFormFailMessage} />

              </div>
            </div>
          </div>
        </form>


        <div className="form">
          <form id="accountSettingsDialog" name="accountSettingsDialog">
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
                  <Button id={page === FormTitles.length - 1 ? "Finish" : "Next"} label={page === FormTitles.length - 1 ? "Finish" : "Next"} onClick={() => {
                    if (page === FormTitles.length - 1) {
                      console.log(formData);
                      setDisplayBasic(false);
                      wizardFormSubmit();
                    } else {
                      setPage((currPage) => currPage + 1);
                    }

                  }} />
                </div>
              </div>
            </Dialog>
          </form>
        </div>


      </div>
    </div>

  );
}

export default AccountSettings;
