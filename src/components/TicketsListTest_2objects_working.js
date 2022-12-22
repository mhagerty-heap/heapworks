import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { CustomerService } from '../service/CustomerService';
import { Divider } from 'primereact/divider';
import { Ticket } from './Ticket';
import { Calendar } from 'primereact/calendar';

const TicketsListTest = (props) => {
    const [ticket, setTicket] = useState(null);  // ticket data pulled from CustomerService
    const [selectedTicket, setSelectedTicket] = useState("");  // selected ticket in DataTable
    const customerService = new CustomerService(); // CustomerService is used to request ticket json data

    useEffect(() => {
        customerService.getTickets().then(data => { setTicket(data)});  // make request to get data using CustomerService, and set to ticket
    });

    const onRowSelect = (event) => {
      console.log("onRowSelect event.data.ticketNumber =  " + event.data.ticketNumber);
    };

    const onRowUnselect = (event) => {
      console.log("ticket unselected");
    };

    const dateBodyTemplate = (rowData) => {
        //console.log("rowData.value" + rowData.requestedDate);
        return rowData.requestedDate;
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }

    return (
        <div className="grid p-fluid">
          <div className="col-12 card">
              <h5>Tickets &nbsp;&nbsp;
                <a href="/createNewTicket">
                  <button className="p-link layout-topbar-button" >
                    <i className="pi pi-plus"/>
                    </button>
                </a>
              </h5>
              <DataTable value={ticket} selectionMode="single" selection={selectedTicket} onSelectionChange={event => setSelectedTicket(event.value)} onRowSelect={onRowSelect} onRowUnselect={onRowUnselect} paginator className="p-datatable-gridlines" showGridlines rows={5}>
                    <Column header="Ticket Number" field="ticketNumber" filter filterPlaceholder="Search by Ticket Number" style={{ minWidth: '10rem' }} />
                    <Column header="Requestor Name" field="requestorName" filter filterPlaceholder="Search by Requestor Name" style={{ minWidth: '12rem' }} />
                    <Column header="Date" filterField="requestedDate" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
                    <Column header="Status" field="status" filter filterPlaceholder="Search by Status" style={{ minWidth: '12rem' }} />
              </DataTable>

              <Divider align="left">
                <div className="inline-flex align-items-center">
                  <i className="pi pi-ticket mr-2"></i>
                  <b>Ticket Detail</b>
                </div>
              </Divider>
              <Ticket displayedTicket={selectedTicket} />
          </div>

        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return (prevProps.location.pathname === nextProps.location.pathname) && (prevProps.colorMode === nextProps.colorMode);
};

export default React.memo(TicketsListTest, comparisonFn);
