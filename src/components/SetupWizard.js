import React, { useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';

import { Wizard } from "react-wizardry";
import "react-wizardry/dist/react-wizardry.css";
import "./onboardingForm/styles.css";

import {useHistory} from 'react-router-dom';



function SetupWizard() {

  const history = useHistory();

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const navigateToDashboard = async () => {
    // navigate to dashboard
    await sleep(2000);
    history.push("/");
  };







  return (
    <div className="OnboardingForm grid p-fluid">
      <Wizard
        stepperItemWidth="170px"
        bodyHeight={650}
        onFinish={navigateToDashboard}
        showStepperTitles
        silent
        finishMessage="Great job! Your Account has been configured! Navigating to Dashboard..."
        pages={[
          {
            title: "Setup Support Email",
            fields: [
              {
                label: "Support Email Username",
                name: "email",
                type: "text",
                placeholder: "ex: \"test\" = test@heapworks.com",
                isRequired: true,
              },

            ]
          },
          {
            title: "Rebrand Your Helpdesk",
            fields: [
              {
                label: "Helpdesk Name",
                name: "helpdeskName",
                type: "text",
                isRequired: true
              },
              {
                label: "Helpdesk Domain (ex: TestCompany)",
                name: "helpdeskUrl",
                type: "text",
                isRequired: true
              }
            ]
          },
          {
            title: "Invite a Team Member",
            fields: [
              {
                name: "memberEmail",
                label: "Enter a team member's email address to invite",
                type: "email",
                validate: true,
              }
            ]
          },
          {
            title: "Add Business Days",
            fields: [
              {
                label: "Select Your Support Days (Select All Days that Apply)",
                name: "supportDays",
                type: "checkbox",
                isRequired: true,
                options: [
                  {
                    name: "Monday",
                    value: "Monday"
                  },
                  {
                    name: "Tuesday",
                    value: "Tuesday"
                  },
                  {
                    name: "Wednesday",
                    value: "Wednesday"
                  },
                  {
                    name: "Thursday",
                    value: "Thursday"
                  },
                  {
                    name: "Friday",
                    value: "Friday"
                  },
                  {
                    name: "Saturday",
                    value: "Saturday"
                  },
                  {
                    name: "Sunday",
                    value: "Sunday"
                  },
                ]
              },
              {
                label: "Select Your Support Hours (Select One)",
                name: "supportDays",
                type: "select",
                isRequired: true,
                options: [
                  {
                    name: "24 hours a day",
                    value: "24-7"
                  },
                  {
                    name: "9am-5pm EST",
                    value: "9to5"
                  },
                  {
                    name: "12pm-8pm EST",
                    value: "12to8"
                  },
                  {
                    name: "9am-8pm EST",
                    value: "9to8"
                  },
                ]
              },

            ]
          },
          {
            title: "Configure SLA",
            fields: [
              {
                label: "SLA Policy Name",
                name: "slaPolicyName",
                type: "text",
                isRequired: true,
                placeholder: "ex: Default Policy Name"
              },
              {
                label: "Urgent Respond Within Time",
                name: "urgentRespondWithin",
                type: "select",
                isRequired: true,
                options: [
                  {
                    name: "1-2 hours",
                    value: "1to2"
                  },
                  {
                    name: "3-5 hours",
                    value: "3to5"
                  },
                  {
                    name: "5-10 hours",
                    value: "5to10"
                  },
                  {
                    name: "10-24 hours",
                    value: "10to24"
                  },
                ]
              },
              {
                label: "Urgent Resolve Within Time",
                name: "urgentResolveWithin",
                type: "select",
                isRequired: true,
                options: [
                  {
                    name: "1-2 hours",
                    value: "1to2"
                  },
                  {
                    name: "3-5 hours",
                    value: "3to5"
                  },
                  {
                    name: "5-10 hours",
                    value: "5to10"
                  },
                  {
                    name: "10-24 hours",
                    value: "10to24"
                  },
                ]
              },
              {
                label: "High Respond Within Time",
                name: "highRespondWithin",
                type: "select",
                isRequired: true,
                options: [
                  {
                    name: "1-2 hours",
                    value: "1to2"
                  },
                  {
                    name: "3-5 hours",
                    value: "3to5"
                  },
                  {
                    name: "5-10 hours",
                    value: "5to10"
                  },
                  {
                    name: "10-24 hours",
                    value: "10to24"
                  },
                ]
              },
              {
                label: "High Resolve Within Time",
                name: "highResolveWithin",
                type: "select",
                isRequired: true,
                options: [
                  {
                    name: "1-2 hours",
                    value: "1to2"
                  },
                  {
                    name: "3-5 hours",
                    value: "3to5"
                  },
                  {
                    name: "5-10 hours",
                    value: "5to10"
                  },
                  {
                    name: "10-24 hours",
                    value: "10to24"
                  },
                ]
              },

            ]
          }
        ]}
      />
    </div>
  );
}

export default SetupWizard;
