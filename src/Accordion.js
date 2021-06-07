import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import MaterialAccordion from "@material-ui/core/Accordion";
import MaterialAccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";

const StyledSecondUl = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const StyledLI = styled.li`
  background: rgba(0, 0, 0, 0.03);
  width: 100%;
  margin: 20px;
`;

const StyledUl = styled.ul`
  width: 80%;
  list-style: none;
  margin: 0 auto;
  padding: 20px 0 20px 0;
`;

const StyledCourseInfo = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
`;

const StyledCourseKey = styled.p`
  color: #757575;
  margin-right: 100px;
`;

const StyledLessonOpenedKey = styled.p`
  color: #757575;
  margin: 0 32px 0 0;
`;

const StyledLessonValue = styled.p`
  margin: 0;
`;

const StyledLessonCompletedKey = styled.p`
  color: #757575;
  margin-right: 11px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: "50px",
    color: theme.palette.text.secondary,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
  },
}));

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    borderRadius: "0px",
    boxShadow: "none",

    "&:not(:last-child)": {
      borderBottom: 0,
    },

    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MaterialAccordion);

const AccordionSummary = withStyles({
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

const UserAccordion = ({ user }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>User</Typography>
          <Typography className={classes.secondaryHeading}>
            {user.email}
          </Typography>
        </AccordionSummary>
        {/* <AccordionDetails> */}
        <Typography component={"span"}>
          <StyledUl>
            {user.newUsersProjects.map((project) => {
              return (
                <li key={project.name}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        Project name
                      </Typography>
                      <Typography className={classes.secondaryHeading}>
                        {project.projectName}
                      </Typography>
                    </AccordionSummary>
                    {/* <AccordionDetails> */}
                    <Typography component={"span"}>
                      <StyledSecondUl>
                        {project.courses.map((course) => {
                          return (
                            <StyledLI key={course.name}>
                              <StyledCourseInfo>
                                <StyledCourseKey>Course:</StyledCourseKey>

                                <p>{course.courseName}</p>
                              </StyledCourseInfo>
                              <StyledCourseInfo>
                                <StyledLessonOpenedKey>
                                  Lessons opened:
                                </StyledLessonOpenedKey>
                                <StyledLessonValue>
                                  {course.lessonsOpen}
                                </StyledLessonValue>
                              </StyledCourseInfo>
                              <StyledCourseInfo>
                                <StyledLessonCompletedKey>
                                  Lessons completed:
                                </StyledLessonCompletedKey>
                                <p>{course.lessonsCompleted}</p>
                              </StyledCourseInfo>
                            </StyledLI>
                          );
                        })}
                      </StyledSecondUl>
                    </Typography>
                    {/* </AccordionDetails> */}
                  </Accordion>
                </li>
              );
            })}
          </StyledUl>
        </Typography>
        {/* </AccordionDetails> */}
      </Accordion>
    </div>
  );
};

export default UserAccordion;
