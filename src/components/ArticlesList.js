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


const ArticlesList = (props) => {
    const [initiallyRetrievedArticleData, setInitiallyRetrievedArticleData] = useState('');  // initially retrieved ticket data pulled from CustomerService
    const [selectedArticle, setSelectedArticle] = useState('');  // selected ticket in DataTable
    const customerService = new CustomerService(); // CustomerService is used to request ticket json data
    const [articleId, setArticleId] = useState('');
    const [articleTitle, setArticleTitle] = useState('');
    const [articleCategory, setArticleCategory] = useState('');
    const [articleType, setArticleType] = useState('');
    const [articleAuthorName, setArticleAuthorName] = useState('');
    const [articlePublishDate, setArticlePublishDate] = useState('');
    const [articleContent, setArticleContent] = useState('');
    const updateArticleSuccessMessage = useRef(null);
    const updateArticleFailureMessage = useRef(null);
    const [filters, setFilters] = useState('');

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

    const articleCategoryDropdownOptions = [
      {label: 'General', value: 'General'},
      {label: 'Desktop', value: 'Desktop'}
    ];

    const articleTypeDropdownOptions = [
      {label: 'Low', value: 'Low'},
      {label: 'Medium', value: 'Medium'},
      {label: 'High', value: 'High'}
    ];

    const onRowSelect = (event) => {
      console.log("onRowSelect event.data.id =  " + event.data.id);
      setArticleId(event.data.id);
      setArticleTitle(event.data.title);
      setArticleCategory(event.data.category);
      setArticleType(event.data.type);
      setArticleAuthorName(event.data.author);
      setArticlePublishDate(event.data.publishDate);
      setArticleContent(event.data.articleContent);
    };

    const onRowUnselect = (event) => {
      console.log("article unselected");
    };

    const formatDate = (value) => {
        return new Date(value).toLocaleDateString('en-US', {day: '2-digit', month: '2-digit', year: 'numeric'});
    }

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.publishDate);
        //return rowData.requestedDate;
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }

    const updateArticle = (event) => { //submits ticket form entry data into sessionStorage
      //event.preventDefault();
      var articleIndex = articlesLocalCopyParsed.findIndex(item => item.id === articleId);
      if (articleIndex == "-1") { // if no item selected then index is -1
        updateArticleFailureMessage.current.show({severity: 'info', summary: 'No Change', detail: 'Please select an Article'});
      } else {

        articlesLocalCopyParsed[articleIndex].id = articleId;
        articlesLocalCopyParsed[articleIndex].title = articleTitle;
        articlesLocalCopyParsed[articleIndex].category = articleCategory;
        articlesLocalCopyParsed[articleIndex].type = articleType;
        articlesLocalCopyParsed[articleIndex].author = articleAuthorName;
        articlesLocalCopyParsed[articleIndex].publishedDate = articlePublishDate;
        articlesLocalCopyParsed[articleIndex].articleContent = articleContent;

        const updatedArticlesString = JSON.stringify(articlesLocalCopyParsed); //  array into json string to store
        sessionStorage.setItem('articlesLocalCopy', updatedArticlesString); // store updated ticket data in localStorage
        console.log("Article Updated");
        updateArticleSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Article Updated'});
      }
    };

    const clearSessionStorage = () => {
      sessionStorage.removeItem('articlesLocalCopy');
    }

    return (
        <div className="grid p-fluid">
          <div className="col-12 card">
              <h5>Articles &nbsp;&nbsp;
                <a href="/createNewArticle">
                  <button className="p-link layout-topbar-button" >
                    <i className="pi pi-plus"/>
                    </button>
                </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="p-link layout-topbar-button" style={{ color: 'transparent' }} onClick={clearSessionStorage} >
                  <i className="pi pi-minus"/>
                </button>
              </h5>
              <DataTable sortField="id" sortOrder={-1} filters={filters} value={articlesLocalCopyParsed} selectionMode="single" selection={selectedArticle} onSelectionChange={event => setSelectedArticle(event.value)} onRowSelect={onRowSelect} onRowUnselect={onRowUnselect} paginator className="p-datatable-gridlines" showGridlines rows={5} dataKey="id">
                    <Column sortable header="Article ID" field="id" filter filterPlaceholder="Search by Article ID" style={{ minWidth: '10rem' }} />
                    <Column sortable header="Article Title" field="title" filter filterPlaceholder="Search by Title" style={{ minWidth: '12rem' }} />
                    <Column sortable header="Article Author" field="author" filter filterPlaceholder="Search by Author" style={{ minWidth: '12rem' }} />
                    <Column sortable header="Published Date" field="publishDate" filter filterPlaceholder="Search by Date" style={{ minWidth: '12rem' }} />
              </DataTable>

              <Divider align="left">
                <div className="inline-flex align-items-center">
                  <i className="pi pi-ticket mr-2"></i>
                  <b>Article Detail</b>
                </div>
              </Divider>
              <form id="updateArticleForm" name="updateArticleForm">
              <Toast ref={updateArticleSuccessMessage} />
              <Toast ref={updateArticleFailureMessage} />
              <div className="grid">
                  <div className="col-2">
                    <label htmlFor="articleId">Article ID</label>
                    <InputText disabled id="articleId" name="articleId" value={articleId} onChange={(e) => setArticleId(e.target.value)} />
                  </div>
                  <div className="col-2">
                    <label htmlFor="articleTitle">Article Title</label>
                    <InputText disabled id="articleTitle" name="articleTitle" value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} />
                  </div>
                  <div className="col-2">
                    <label htmlFor="articleCategory">Article Category</label>
                    <Dropdown value={articleCategory} id="articleCategory" name="articleCategory" options={articleCategoryDropdownOptions} onChange={(e) => setArticleCategory(e.value)} placeholder="Category"/>
                  </div>
                  <div className="col-2">
                    <label htmlFor="articleAuthorName">Article Author</label>
                    <InputText disabled id="articleAuthorName" name="articleAuthorName" value={articleAuthorName} onChange={(e) => setArticleAuthorName(e.target.value)} />
                  </div>
                  <div className="col-2">
                    <label htmlFor="statusField">Publish Date</label>
                    <InputText disabled id="articlePublishDate" name="articlePublishDate" value={articlePublishDate} onChange={(e) => setArticlePublishDate(e.target.value)} />
                  </div>
                  <div className="col-12">
                    <label htmlFor="articleContent">Article Content</label>
                    <Editor style={{height:'75px'}} id="articleContent" name="articleContent" value={selectedArticle.articleContent} onTextChange={(e) => setArticleContent(e.htmlValue)} />
                  </div>
                  <div className="col-2">
                    <Button id="updateArticle" name="updateArticle" label="Update Article" onClick={updateArticle}/>
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

export default React.memo(ArticlesList, comparisonFn);
