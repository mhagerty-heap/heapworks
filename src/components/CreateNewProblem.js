import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { CustomerService } from '../service/CustomerService';
import '../assets/layout/supportForm/SupportForm.css';



const CreateNewProblem = () => {

    const customerService = new CustomerService(); // CustomerService is used to request ticket json data
    const [initiallyRetrievedTicketData, setInitiallyRetrievedTicketData] = useState('');

    useEffect(() => {
        customerService.getProblems().then(data => { setInitiallyRetrievedTicketData(data)}); // get ticket data from locally stored json file
    },[]);
    if ("problemsLocalCopy" in sessionStorage && sessionStorage.getItem("problemsLocalCopy") !== null && sessionStorage.getItem("problemsLocalCopy") !== '""') { // check if data already exists in sessionStorage
      //console.log('problemsLocalCopy already exists and is not null, so will use existing value from sessionStorage'); // placeholder
    } else {
      const ticketsString = JSON.stringify(initiallyRetrievedTicketData); // stringify initiallyRetrievedTicketData, required for sessionStorage
      const problemsLocalCopy = sessionStorage.setItem('problemsLocalCopy', ticketsString); // store problemsLocalCopy key data in localStorage
    }
    const ticketsLocalCopyParsed = JSON.parse(sessionStorage.getItem("problemsLocalCopy")); // parse object from sessionStorage "problemsLocalCopy" string to use in DataTable

    const statusOptions = [
     { value: 'Open', label: 'Open'},
     { value: 'Pending', label: 'Pending'},
     { value: 'Resolved', label: 'Resolved'},
     { value: 'Closed', label: 'Closed'},
    ];

    const urgencyOptions = [
     { value: 'Low', label: 'Low'},
     { value: 'Medium', label: 'Medium'},
     { value: 'High', label: 'High'},
    ];

    const impactOptions = [
     { value: 'Low', label: 'Low'},
     { value: 'Medium', label: 'Medium'},
     { value: 'High', label: 'High'},
    ];

    const priorityOptions = [
      { value: 'Low', label: 'Low'},
      { value: 'Medium', label: 'Medium'},
      { value: 'High', label: 'High'},
      { value: 'Urgent', label: 'Urgent'},
    ];

    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const defaultValues = {
        requestorName: '',
        requestorEmail: '',
        subject: '',
        impact: null,
        priority: null,
        status: null,
        urgency: null,
        detailedDescription: '',
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    var todaysDate = new Date().toLocaleDateString('en-US', {day: '2-digit', month: '2-digit', year: 'numeric'});

    const [newTicketNumber, setNewTicketNumber] = useState("");

    //const newTicketNumber = Math.floor(Math.random() * (699999 - 800000 + 1)) + 699999; //define random value between 69999 and 80000

    const onSubmit = (data) => {
        var newTicket = Math.floor(Math.random() * (699999 - 800000 + 1)) + 699999; //define random value between 69999 and 80000
        setNewTicketNumber(newTicket);
        data.ticketNumber = newTicket; // add randomly generated ticket number to form data array
        data.requestedDate = todaysDate; // add todaysDate to form data array
        ticketsLocalCopyParsed.push(data); // add form data array to local copy of ticket data
        console.log(data);
        const ticketsString = JSON.stringify(ticketsLocalCopyParsed); // stringify local copy of ticket data, required for sessionStorage
        const problemsLocalCopy = sessionStorage.setItem('problemsLocalCopy', ticketsString); // store updated problemsLocalCopy sessionStorage
        setFormData(data);
        setShowMessage(true);
        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Problem { newTicketNumber } Has Been Created!</h5>
                </div>
            </Dialog>

            <div className="grid p-fluid">
                <div className="card">
                    <h5>Create A Problem</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="requestorName" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="requestorName" className={classNames({ 'p-error': errors.name })}>Requestor Name*</label>
                            </span>
                            {getFormErrorMessage('requestorName')}
                        </div>

                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <Controller name="requestorEmail" control={control}
                                    rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' }}}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="requestorEmail" className={classNames({ 'p-error': !!errors.email })}>Requestor Email*</label>
                            </span>
                            {getFormErrorMessage('requestorEmail')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="subject" control={control} rules={{ required: 'Subject is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="subject" className={classNames({ 'p-error': errors.name })}>Subject*</label>
                            </span>
                            {getFormErrorMessage('subject')}
                        </div>
                        <h5> </h5>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="status" control={control} rules={{ required: 'Status is required.' }} render={({ field, fieldState }) => (
                                    <Dropdown id={field.name} options={statusOptions} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="status" className={classNames({ 'p-error': errors.name })}>Status*</label>
                            </span>
                            {getFormErrorMessage('status')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="urgency" control={control} rules={{ required: 'Urgency is required.' }} render={({ field, fieldState }) => (
                                    <Dropdown id={field.name} options={urgencyOptions} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="urgency" className={classNames({ 'p-error': errors.name })}>Urgency*</label>
                            </span>
                            {getFormErrorMessage('urgency')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="impact" control={control} rules={{ required: 'Impact is required.' }} render={({ field, fieldState }) => (
                                    <Dropdown id={field.name} options={impactOptions} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="impact" className={classNames({ 'p-error': errors.name })}>Impact*</label>
                            </span>
                            {getFormErrorMessage('impact')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="priority" control={control} rules={{ required: 'Priority is required.' }} render={({ field, fieldState }) => (
                                    <Dropdown id={field.name} options={priorityOptions} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="priority" className={classNames({ 'p-error': errors.name })}>Priority*</label>
                            </span>
                            {getFormErrorMessage('priority')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="detailedDescription" control={control} rules={{ required: 'ticketIssue is required.' }} render={({ field, fieldState }) => (
                                    <InputTextarea rows={10} cols={70} id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="detailedDescription" className={classNames({ 'p-error': errors.ticketIssue })}>Please describe your technical issue.</label>
                            </span>
                            {getFormErrorMessage('detailedDescription')}
                        </div>
                        <Button type="submit" label="Submit" className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(CreateNewProblem, comparisonFn);
