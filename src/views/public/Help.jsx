import React, { useState } from 'react';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  // Card,
} from 'reactstrap';

const HelpPage = () => {
  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  // const toggle = () => setOpen(open);

  return (
    <div className="pt-4 sticky-top">
      <h1 className="mt-3 text-primary text-center mx-auto d-block">FAQs</h1>

      <div>
        <Accordion open={open} toggle={toggle}>
          <AccordionItem data-cy="help-visa-question">
            <AccordionHeader targetId="1">
              Do you offer visa sponsorship?
            </AccordionHeader>
            <AccordionBody accordionId="1" className="sticky-top">
              Visa sponsorship is dependent on the role and company you are
              applying for. This will be mentioned in the job description sent
              to you and can be discussed further during the pre-screening with
              Loop Not Luck or the interview with the company you are applying
              to.
            </AccordionBody>
          </AccordionItem>
          <AccordionItem data-cy="help-unsuccessful-doubt">
            <AccordionHeader targetId="2">
              Will you send me roles even if I am not successful in the current
              one I am applying to?
            </AccordionHeader>
            <AccordionBody accordionId="2">
              Yes. You will be matched to roles based on your selected
              preferences, skills and experience. Every role you are matched
              with will be sent to you regardless of the level of success you
              achieve in previous roles you’ve been sent.
            </AccordionBody>
          </AccordionItem>
          <AccordionItem data-cy="help-review-cv">
            <AccordionHeader targetId="3">
              Can you review my CV?
            </AccordionHeader>
            <AccordionBody accordionId="3" className="sticky-top">
              We do not provide an independent CV review service. However,
              during the application process we do provide some feedback to make
              candidates’ CV more competitive. You can also review our CV
              checklist{' '}
              <a
                href="/assets/PDF/cv-checklist.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-primary"
              >
                here
              </a>{' '}
              to improve your chances of success when applying.
            </AccordionBody>
          </AccordionItem>{' '}
          <AccordionItem data-cy="help-with-interview">
            <AccordionHeader targetId="4">
              Can you help me with the upcoming interview?
            </AccordionHeader>
            <AccordionBody accordionId="4" className="sticky-top">
              We do not provide independent interview prep sessions. However, we
              usually walk through basic prep with candidates prior to the
              interview.
            </AccordionBody>
          </AccordionItem>
          <AccordionItem data-cy="help-interview-result-waiting-doubt">
            <AccordionHeader targetId="5">
              How long until I hear back regarding an interview?
            </AccordionHeader>
            <AccordionBody accordionId="5">
              We usually take between 2-7 days to get back to you regarding any
              updates, feedback or next steps. This is usually dependent on us
              receiving feedback from employers which at times, is out of our
              control.
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default HelpPage;
