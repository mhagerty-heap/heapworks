import React, {useState, useRef} from 'react';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export const Ticket = (props) => {

    const ticketData = props.displayedTicket;
    const [ticketNumber, setTicketNumber] = useState(ticketData.ticketNumber);
    const [requestorName, setRequestorName] = useState(ticketData.requestorName);
    const [requestorEmail, setRequestorEmail] = useState(ticketData.requestorEmail);
    const [subject, setSubject] = useState(ticketData.subject);
    const [status, setStatus] = useState(ticketData.status);
    const [urgency, setUrgency] = useState(ticketData.urgency);
    const [impact, setImpact] = useState(ticketData.impact);
    const [priority, setPriority] = useState(ticketData.priority);
    const [detailedDescription, setDetailedDescription] = useState(ticketData.detailedDescription);
    const [requestedDate, setRequestedDate] = useState(ticketData.requestedDate);
    const [requestedTime, setRequestedTime] = useState(ticketData.requestedTime);
    const updateTicketSuccessMessage = useRef(null);
    const updateTicketFailMessage = useRef(null);

    const updateTicket = (event) => {
      event.preventDefault();
      console.log("Ticket Updated");
      updateTicketSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Ticket Updated'});
    };

    return (
      <div className="">
          <div className="col-12">
              <div className="card">
                  {
                    ticketData == ""
                      ?
                        <div></div>
                      :

                        <form>
                        <Toast ref={updateTicketSuccessMessage} />
                        <div className="grid">
                            <div className="col-2">

                              <label htmlFor="ticketNumberField">Ticket Number</label>
                              <InputText id="ticketNumberField" value={props.displayedTicket.ticketNumber} onChange={(e) => setTicketNumber(e.target.value)} />
                            </div>
                            <div className="col-2">
                              <label htmlFor="requestorNameField">Requestor Name</label>
                              <InputText id="requestorNameField" value={props.displayedTicket.requestorName} onChange={(e) => setRequestorName(e.target.value)} />
                            </div>
                            <div className="col-2">
                              <label htmlFor="requestorEmailField">Requestor Email</label>
                              <InputText id="requestorEmailField" value={props.displayedTicket.requestorEmail} onChange={(e) => setRequestorEmail(e.target.value)} />
                            </div>
                            <div className="col-2">
                              <label htmlFor="subjectField">Ticket Subject</label>
                              <InputText id="subjectField" value={props.displayedTicket.subject} onChange={(e) => setSubject(e.target.value)} />
                            </div>
                            <div className="col-2">
                              <label htmlFor="statusField">Ticket Status</label>
                              <InputText id="statusField" value={props.displayedTicket.status} onChange={(e) => setStatus(e.target.value)} />
                            </div>
                            <div className="col-2">
                              <label htmlFor="urgencyField">Ticket Urgency</label>
                              <InputText id="urgencyField" value={props.displayedTicket.urgency} onChange={(e) => setUrgency(e.target.value)} />
                            </div>
                            <div className="col-2">
                              <label htmlFor="impactField">Ticket Impact</label>
                              <InputText id="impactField" value={props.displayedTicket.impact} onChange={(e) => setImpact(e.target.value)} />
                            </div>
                            <div className="col-2">
                              <label htmlFor="priorityField">Ticket Priority</label>
                              <InputText id="priorityField" value={props.displayedTicket.priority} onChange={(e) => setPriority(e.target.value)} />
                            </div>
                            <div className="col-2">
                              <label htmlFor="requestedDateField">Requested Date</label>
                              <InputText id="requestedDateField" value={props.displayedTicket.requestedDate} onChange={(e) => setRequestedDate(e.target.value)} />
                            </div>
                            <div className="col-2">
                              <label htmlFor="requestedTimeField">Requested Time</label>
                              <InputText id="requestedTimeField" value={props.displayedTicket.requestedTime} onChange={(e) => setRequestedTime(e.target.value)} />
                            </div>
                            <div className="col-3">
                            </div>
                            <div className="col-3">
                            </div>
                            <div className="col-12">
                              <label htmlFor="detailedDescriptionField">Detailed Description</label>
                              <Editor style={{height:'75px'}} id="detailedDescriptionField" value={props.displayedTicket.detailedDescription} onTextChange={(e) => setDetailedDescription(e.htmlValue)} />
                            </div>
                            <div className="col-1">
                              <Button id="updateTicket" name="updateTicket" label="Update Ticket" onClick={updateTicket}/>
                            </div>

                        </div>
                        </form>
                  }
              </div>
          </div>
      </div>
    );
}
