import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { CustomerService } from '../service/CustomerService';
import '../assets/layout/supportForm/SupportForm.css';

const CreateNewArticle = () => {

    // Pull article data from json and set to local copy
    const customerService = new CustomerService(); // CustomerService is used to request ticket json data
    const [initiallyRetrievedArticleData, setInitiallyRetrievedArticleData] = useState('');  // initially retrieved ticket data pulled from CustomerService
    
    useEffect(() => {
        customerService.getArticles().then(data => { setInitiallyRetrievedArticleData(data)}); // get ticket data from locally stored json file
    },[]);
    if ("articlesLocalCopy" in sessionStorage && sessionStorage.getItem("articlesLocalCopy") !== null && sessionStorage.getItem("articlesLocalCopy") !== '""') { // check if data already exists in sessionStorage
      //console.log('ticketsLocalCopy already exists and is not null, so will use existing value from sessionStorage'); // placeholder
    } else {
      const articlesString = JSON.stringify(initiallyRetrievedArticleData); // stringify initiallyRetrievedTicketData, required for sessionStorage
      const articlesLocalCopy = sessionStorage.setItem('articlesLocalCopy', articlesString); // store ticketsLocalCopy key data in localStorage
    }
    const articlesLocalCopyParsed = JSON.parse(sessionStorage.getItem("articlesLocalCopy")); // parse object from sessionStorage "ticketsLocalCopy" string to use in DataTable

    var todaysDate = new Date().toLocaleDateString('en-US', {day: '2-digit', month: '2-digit', year: 'numeric'});
    const [newArticleNumber, setNewArticleNumber] = useState("");


    const [text, setText] = useState([]);

    const categoryOptions = [
     { value: 'general', label: 'General'},
     { value: 'desktop', label: 'Desktop'},
    ];

    const typeOptions = [
     { value: 'permanent', label: 'Permanent'},
     { value: 'workaround', label: 'Workaround'},
    ];

    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const defaultValues = {
        articleContent: '',
        title: '',
        category: '',
        author: '',
        type: ''

    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        console.log(data);
        var newArticle = Math.floor(Math.random() * (2999 - 4000 + 1)) + 2999; //define random value between 69999 and 80000
        setNewArticleNumber(newArticle);
        data.id = newArticle; // add randomly generated ticket number to form data array
        data.publishDate = todaysDate; // add todaysDate to form data array
        articlesLocalCopyParsed.push(data); // add form data array to local copy of ticket data
        console.log(data);
        const articlesString = JSON.stringify(articlesLocalCopyParsed); // stringify local copy of ticket data, required for sessionStorage
        const articlesLocalCopy = sessionStorage.setItem('articlesLocalCopy', articlesString); // store updated ticketsLocalCopy sessionStorage
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
                    <h5>Article { newArticleNumber } Has Been Created!</h5>
                </div>
            </Dialog>

            <div className="grid p-fluid">
                <div className="card">
                    <h5>Create A New Article</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="author" control={control} rules={{ required: 'Author Name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="author" className={classNames({ 'p-error': errors.name })}>Author Name*</label>
                            </span>
                            {getFormErrorMessage('author')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="title" control={control} rules={{ required: 'title is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="title" className={classNames({ 'p-error': errors.name })}>Title*</label>
                            </span>
                            {getFormErrorMessage('title')}
                        </div>
                        <h5> </h5>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="category" control={control} rules={{ required: 'Category is required.' }} render={({ field, fieldState }) => (
                                    <Dropdown id={field.name} options={categoryOptions} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="category" className={classNames({ 'p-error': errors.name })}>Category*</label>
                            </span>
                            {getFormErrorMessage('category')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="type" control={control} rules={{ required: 'Type is required.' }} render={({ field, fieldState }) => (
                                    <Dropdown id={field.name} options={typeOptions} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="type" className={classNames({ 'p-error': errors.name })}>Type*</label>
                            </span>
                            {getFormErrorMessage('type')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="articleContent" control={control} rules={{ required: 'Article Content is required.' }} render={({ field, fieldState }) => (
                                    <InputTextarea rows={10} cols={70} id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="articleContent" className={classNames({ 'p-error': errors.ticketIssue })}>Please write your article</label>
                            </span>
                            {getFormErrorMessage('articleContent')}
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

export default React.memo(CreateNewArticle, comparisonFn);
