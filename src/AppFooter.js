import React from 'react';

export const AppFooter = (props) => {

    return (
        <div className="layout-footer">
            <a href="https://docs.google.com/document/d/1ykR7qO8WesjHqvRk1Hi3nINibqTnT83qDkcs4Z9dV30/edit?usp=sharing">
              <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/heapLogo.png' : 'assets/layout/images/heapLogo.png'} alt="Logo" height="15" className="mr-2" />Demo By Heap
            </a>
        </div>
    );
}
