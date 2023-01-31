import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { CustomerService } from '../service/CustomerService';
import { Divider } from 'primereact/divider';
import { Ticket } from './Ticket';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';


const TicketsList = (props) => {
    const [initiallyRetrievedTicketData, setInitiallyRetrievedTicketData] = useState('');  // initially retrieved ticket data pulled from CustomerService
    const [selectedTicket, setSelectedTicket] = useState('');  // selected ticket in DataTable
    const customerService = new CustomerService(); // CustomerService is used to request ticket json data
    const [ticketNumber, setTicketNumber] = useState('');
    const [requestorName, setRequestorName] = useState('');
    const [requestorEmail, setRequestorEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [status, setStatus] = useState('');
    const [urgency, setUrgency] = useState('');
    const [impact, setImpact] = useState('');
    const [priority, setPriority] = useState('');
    const [detailedDescription, setDetailedDescription] = useState('');
    const [requestedDate, setRequestedDate] = useState('');
    const [requestedTime, setRequestedTime] = useState('');
    const updateTicketSuccessMessage = useRef(null);
    const updateTicketFailureMessage = useRef(null);
    const [filters, setFilters] = useState('');

    // make request to get local JSON data using CustomerService, and set to localTicketData, passing blank [] method to only load this data once on render...this was preventing change to sessionStorage

    useEffect(() => {
        customerService.getTickets().then(data => { setInitiallyRetrievedTicketData(data)}); // get ticket data from locally stored json file
    },[]);
    if ("ticketsLocalCopy" in sessionStorage && sessionStorage.getItem("ticketsLocalCopy") !== null && sessionStorage.getItem("ticketsLocalCopy") !== '""') { // check if data already exists in sessionStorage
      //console.log('ticketsLocalCopy already exists and is not null, so will use existing value from sessionStorage'); // placeholder
    } else {
      const ticketsString = JSON.stringify(initiallyRetrievedTicketData); // stringify initiallyRetrievedTicketData, required for sessionStorage
      const ticketsLocalCopy = sessionStorage.setItem('ticketsLocalCopy', ticketsString); // store ticketsLocalCopy key data in localStorage
    }
    const ticketsLocalCopyParsed = JSON.parse(sessionStorage.getItem("ticketsLocalCopy")); // parse object from sessionStorage "ticketsLocalCopy" string to use in DataTable


    const statusDropdownOptions = [
      {label: 'Open', value: 'Open'},
      {label: 'Pending', value: 'Pending'},
      {label: 'Resolved', value: 'Resolved'},
      {label: 'Closed', value: 'Closed'}
    ];

    const impactUrgencyDropdownOptions = [
      {label: 'Low', value: 'Low'},
      {label: 'Medium', value: 'Medium'},
      {label: 'High', value: 'High'}
    ];

    const priorityDropdownOptions = [
      {label: 'Low', value: 'Low'},
      {label: 'Medium', value: 'Medium'},
      {label: 'High', value: 'High'},
      {label: 'Urgent', value: 'Urgent'}
    ];

    const onRowSelect = (event) => {
      console.log("onRowSelect event.data.ticketNumber =  " + event.data.ticketNumber);
      setTicketNumber(event.data.ticketNumber);
      setRequestorName(event.data.requestorName);
      setRequestorEmail(event.data.requestorEmail);
      setRequestedDate(event.data.requestedDate);
      setRequestedTime(event.data.requestedTime);
      setSubject(event.data.subject);
      setStatus(event.data.status);
      setUrgency(event.data.urgency);
      setImpact(event.data.impact);
      setPriority(event.data.priority);
    };

    const onRowUnselect = (event) => {
      console.log("ticket unselected");
    };

    const formatDate = (value) => {
        return new Date(value).toLocaleDateString('en-US', {day: '2-digit', month: '2-digit', year: 'numeric'});
    }

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.requestedDate);
        //return rowData.requestedDate;
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }

    const updateTicket = (event) => { //submits ticket form entry data into sessionStorage
      //event.preventDefault();
      var ticketIndex = ticketsLocalCopyParsed.findIndex(item => item.ticketNumber === ticketNumber);
      if (ticketIndex == "-1") { // if no item selected then index is -1
        updateTicketFailureMessage.current.show({severity: 'info', summary: 'No Change', detail: 'Please select a Ticket'});
      } else {
        ticketsLocalCopyParsed[ticketIndex].subject = subject;
        ticketsLocalCopyParsed[ticketIndex].status = status;
        ticketsLocalCopyParsed[ticketIndex].urgency = urgency;
        ticketsLocalCopyParsed[ticketIndex].impact = impact;
        ticketsLocalCopyParsed[ticketIndex].priority = priority;
        ticketsLocalCopyParsed[ticketIndex].detailedDescription = detailedDescription;
        const updatedTicketsString = JSON.stringify(ticketsLocalCopyParsed); //  array into json string to store
        sessionStorage.setItem('ticketsLocalCopy', updatedTicketsString); // store updated ticket data in localStorage
        console.log("Ticket Updated");
        updateTicketSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Ticket Updated'});
      }
    };

    const clearSessionStorage = () => {
      sessionStorage.removeItem('ticketsLocalCopy');
    }

    return (
        <div className="grid p-fluid">
          <div className="col-12 card">
              <h5>Tickets &nbsp;&nbsp;
                <a href="/createNewTicket">
                  <button className="p-link layout-topbar-button" >
                    <i className="pi pi-plus"/>
                    </button>
                </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="p-link layout-topbar-button" style={{ color: 'transparent' }} onClick={clearSessionStorage} >
                  <i className="pi pi-minus"/>
                </button>
              </h5>
              <DataTable sortField="ticketNumber" sortOrder={-1} filters={filters} value={ticketsLocalCopyParsed} selectionMode="single" selection={selectedTicket} onSelectionChange={event => setSelectedTicket(event.value)} onRowSelect={onRowSelect} onRowUnselect={onRowUnselect} paginator className="p-datatable-gridlines" showGridlines rows={5} dataKey="ticketNumber">
                    <Column sortable header="Ticket Number" field="ticketNumber" filter filterPlaceholder="Search by Ticket Number" style={{ minWidth: '10rem' }} />
                    <Column sortable header="Requestor Name" field="requestorName" filter filterPlaceholder="Search by Requestor Name" style={{ minWidth: '12rem' }} />
                    <Column sortable header="Status" field="status" filter filterPlaceholder="Search by Status" style={{ minWidth: '12rem' }} />
                    <Column header="Date" filterField="requestedDate" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} filterElement={dateFilterTemplate} />
              </DataTable>

              <Divider align="left">
                <div className="inline-flex align-items-center">
                  <i className="pi pi-ticket mr-2"></i>
                  <b>Ticket Detail</b>
                </div>
              </Divider>
              <form id="updateTicketForm" name="updateTicketForm">
              <Toast ref={updateTicketSuccessMessage} />
              <Toast ref={updateTicketFailureMessage} />
              <div className="grid">
                  <div className="col-2">
                    <label htmlFor="ticketNumberField">Ticket Number</label>
                    <InputText disabled id="ticketNumberField" name="ticketNumberField" value={ticketNumber} onChange={(e) => setTicketNumber(e.target.value)} />
                  </div>
                  <div className="col-2">
                    <label htmlFor="requestorNameField">Requestor Name</label>
                    <InputText disabled id="requestorNameField" name="requestorNameField" value={requestorName} onChange={(e) => setRequestorName(e.target.value)} />
                  </div>
                  <div className="col-2">
                    <label htmlFor="requestorEmailField">Requestor Email</label>
                    <InputText disabled id="requestorEmailField" name="requestorEmailField" value={requestorEmail} onChange={(e) => setRequestorEmail(e.target.value)} />
                  </div>
                  <div className="col-2">
                    <label htmlFor="requestedDateField">Requested Date</label>
                    <InputText disabled id="requestedDateField" name="requestedDateField" value={requestedDate} onChange={(e) => setRequestedDate(e.target.value)} />
                  </div>
                  <div className="col-2">
                  </div>
                  <div className="col-2">
                  </div>
                  <div className="col-2">
                    <label htmlFor="subjectField">Ticket Subject</label>
                    <InputText id="subjectField" name="subjectField" value={subject} onChange={(e) => setSubject(e.target.value)} />
                  </div>
                  <div className="col-2">
                    <label htmlFor="statusField">Ticket Status</label>
                    <Dropdown value={status} id="statusField" name="statusField" options={statusDropdownOptions} onChange={(e) => setStatus(e.target.value)} placeholder="Status"/>
                  </div>
                  <div className="col-2">
                    <label htmlFor="urgencyField">Ticket Urgency</label>
                    <Dropdown value={urgency} id="urgencyField" name="urgencyField" options={impactUrgencyDropdownOptions} onChange={(e) => setUrgency(e.value)} placeholder="Urgency"/>
                  </div>
                  <div className="col-2">
                    <label htmlFor="impactField">Ticket Impact</label>
                    <Dropdown value={impact} id="impactField" name="impactField" options={impactUrgencyDropdownOptions} onChange={(e) => setImpact(e.value)} placeholder="Impact"/>
                  </div>
                  <div className="col-2">
                    <label htmlFor="priorityField">Ticket Priority</label>
                    <Dropdown value={priority} id="priorityField" name="priorityField" options={priorityDropdownOptions} onChange={(e) => setPriority(e.value)} placeholder="Priority"/>
                  </div>
                  <div className="col-3">
                  </div>
                  <div className="col-3">
                  </div>
                  <div className="col-12">
                    <label htmlFor="detailedDescriptionField">Detailed Description</label>
                    <Editor style={{height:'75px'}} id="detailedDescriptionField" name="detailedDescriptionField" value={selectedTicket.detailedDescription} onTextChange={(e) => setDetailedDescription(e.htmlValue)} />
                  </div>
                  <div className="col-2">
                    <Button id="updateTicket" name="updateTicket" label="Update Ticket" onClick={updateTicket}/>
                  </div>

              </div>
              </form>
          </div>

        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return (prevProps.location.pathname === nextProps.location.pathname) && (prevProps.colorMode === nextProps.colorMode);
};

export default React.memo(TicketsList, comparisonFn);
