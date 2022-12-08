import React, { useState, useRef } from "react";
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



function AddAccountForm() {

  const [displayBasic, setDisplayBasic] = useState(true);
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
    {label: 'Friday', value: 'Friday'},
    {label: 'Saturday', value: 'Saturday'},
    {label: 'Sunday', value: 'Sunday'}
  ];

  const supportHours = [
    {label: '24 Hours a Day', value: '24'},
    {label: '9am-5pm EST', value: '9-5est'},
    {label: '12pm-8pm EST', value: '12-8est'},
    {label: '9am-8pm EST', value: '9-8est'}
  ];

  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    nickname: "",
    birthday: "",
    otherFinancialInterests: "",
    supportUsername: "",
    helpdeskName: "",
    helpdeskDomain: "",
    supportDays: "",
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
    if (formData.supportUsername) {
      formSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: ' Personal Details Saved!'});
    } else {
      formFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'For Demo purposes, at a minimum, enter the Support Username'});
    }
  };

  return (

    <div className="grid p-fluid">
      <div className="col-12 card">

        <h5>Account Settings</h5>
        <Messages ref={formSuccessMessage} />
        <Messages ref={formFailMessage} />

        <div className="field col-12 md:col-4">
          <label htmlFor="in">Support Username</label>
          <InputText id="supportUsername" style={{width: "325px"}} placeholder="ex: play = play@playworks.com" value={formData.supportUsername} onChange={(event) => setFormData({ ...formData, supportUsername: event.target.value } )}/>
        </div>
        <div className="field col-12 md:col-4">
          <label htmlFor="in">Helpdesk Name</label>
          <InputText id="helpdeskName" style={{width: "325px"}} placeholder="ex: Play Helpdesk" value={formData.helpdeskName} onChange={(event) => setFormData({ ...formData, helpdeskName: event.target.value } )}/>
        </div>
        <div className="field col-12 md:col-4">
            <label htmlFor="in">Helpdesk Domain</label>
            <InputText id="helpdeskDomain" style={{width: "325px"}} placeholder="ex: play = play.playworks.com" value={formData.helpdeskDomain} onChange={(event) => setFormData({ ...formData, helpdeskDomain: event.target.value } )}/>
        </div>


        <div className="field col-12 md:col-4">
          <label htmlFor="in">Select Your Support Days (Multiple Allowed)</label>
          <ListBox id="supportDays" multiple value={formData.supportDays} options={businessDays} onChange={(event) => setFormData({ ...formData, supportDays: event.target.value } )} />

        </div>
        <div className="field col-12 md:col-4">
          <label htmlFor="in">Select Your Support Hours (One Option Allowed)</label>
          <ListBox id="supportHours" value={formData.supportHours} options={supportHours} onChange={(event) => setFormData({ ...formData, supportHours: event.target.value } )} />
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

export default AddAccountForm;
