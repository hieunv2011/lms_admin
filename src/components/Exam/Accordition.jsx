import React from "react";
import { EuiAccordion, EuiPanel, useGeneratedHtmlId } from "@elastic/eui";

const Accordition = () => {
  const rightArrowAccordionId = useGeneratedHtmlId({
    prefix: "rightArrowAccordion",
  });

  return (
    <EuiAccordion
      id={rightArrowAccordionId}
      arrowDisplay="right"
      buttonContent="This accordion has the arrow on the right"
    >
      <EuiPanel color="subdued">
        Any content inside of <strong>EuiAccordion</strong> will appear here.
      </EuiPanel>
    </EuiAccordion>
  );
};

export default Accordition;
