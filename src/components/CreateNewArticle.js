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
import { CountryService } from '../service/CountryService';
import '../assets/layout/supportForm/SupportForm.css';

const CreateNewArticle = () => {

    const [text, setText] = useState('');

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
        name: '',
        email: '',
        ticketIssue: '',
        date: null,
        country: null,
        accept: false
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
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
                    <h5>An Article Has Been Created!</h5>
                </div>
            </Dialog>

            <div className="grid p-fluid">
                <div className="card">
                    <h5>Create A New Article</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="authorName" control={control} rules={{ required: 'Author Name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="authorName" className={classNames({ 'p-error': errors.name })}>Author Name*</label>
                            </span>
                            {getFormErrorMessage('authorName')}
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

                        <Editor style={{height:'320px'}} value={text} onTextChange={(e) => setText(e.htmlValue)} />



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
