import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MaterialAccordion from "@material-ui/core/Accordion";
import MaterialAccordionSummary from "@material-ui/core/AccordionSummary";
import styled from "styled-components";

export const StyledCoursesList = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const StyledCourseItem = styled.li`
  background: rgba(0, 0, 0, 0.03);
  width: 100%;
  margin: 20px;
`;

export const StyledProjectsList = styled.ul`
  width: 80%;
  list-style: none;
  margin: 0 auto;
  padding: 20px 0 20px 0;
`;

export const StyledCourseInfo = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
`;

export const StyledCourseKey = styled.p`
  color: #757575;
  margin-right: 100px;
`;

export const StyledLessonOpenedKey = styled.p`
  color: #757575;
  margin: 0 32px 0 0;
`;

export const StyledLessonValue = styled.p`
  margin: 0;
`;

export const StyledLessonCompletedKey = styled.p`
  color: #757575;
  margin-right: 11px;
`;

export const StyledTypographyHeading = styled(Typography)`
  color: ${({ secondary }) => (secondary ? "black" : "#757575")};
  font-size: 0.95rem;
  margin-right: ${({ secondary }) => (secondary ? "0px" : "50px")};
`;

export const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",

    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MaterialAccordion);

export const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,

    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },

  expanded: {},
})(MaterialAccordionSummary);
