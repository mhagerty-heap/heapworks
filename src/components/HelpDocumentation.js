import React, { useState, useEffect } from 'react';

const HelpDocumentation = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false); //this helps

  // <iframe src="https://play-digital-merch-documentation.vercel.app" height="800" width="1000"/>


  useEffect(() => {
    // callback function to call when event triggers
    const onPageLoad = () => {

        setTimeout(function(){  // set a 1 second timeout to wait for heap to load, not a great way to do this, but it works for now
          console.log('page loaded');
          var heapIdentity = window.heap.identity;
          // console.log('Heap Identity on play-digital-merch.vercel.app = ' + heapIdentity);

          if (heapIdentity == null) {
              // add child iFrame to docsIframe parent without heapId as query string
              var iFrameWithoutIdentity = document.createElement('iFrame');
              iFrameWithoutIdentity.setAttribute("width", "1000px");
              iFrameWithoutIdentity.setAttribute("height", "800px");
              iFrameWithoutIdentity.setAttribute("src", "https://play-digital-merch-documentation.vercel.app/");
              console.log("No Heap Identity Set on play-digital-merch.vercel.app domain");
              console.log("requesting in iFrame: https://play-digital-merch-documentation.vercel.app/");
              document.getElementById("docsIframe").appendChild(iFrameWithoutIdentity);
          } else {
              // add child iFrame to docsIframe parent with heapId as query string
              var iFrameWithIdentity = document.createElement('iFrame');
              var urlWithIdentity = "https://play-digital-merch-documentation.vercel.app/?heapIdentity=" + heapIdentity;
              iFrameWithIdentity.setAttribute("width", "1000px");
              iFrameWithIdentity.setAttribute("height", "800px");
              iFrameWithIdentity.setAttribute("src", urlWithIdentity);
              console.log("Heap Identity on play-digital-merch.vercel.app domain = " + heapIdentity);
              console.log("requesting in iFrame: " + urlWithIdentity);
              document.getElementById("docsIframe").appendChild(iFrameWithIdentity);
          }
        }, 1000); // where to set timeone, currently set to 1 second


    }

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
        onPageLoad();
    } else {
        window.addEventListener('load', onPageLoad, false);
        // Remove the event listener when component unmounts
        return () => window.removeEventListener('load', onPageLoad);
    }
    }, []);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Help Documentation</h5>
                    <div className="iFrame" id="docsIframe">
                    </div>
                </div>
            </div>
        </div>
    )
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(HelpDocumentation, comparisonFn);
