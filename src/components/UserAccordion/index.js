import React from "react";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  StyledCoursesList,
  StyledCourseItem,
  StyledProjectsList,
  StyledCourseInfo,
  StyledCourseKey,
  StyledLessonOpenedKey,
  StyledLessonValue,
  StyledLessonCompletedKey,
  StyledTypographyHeading,
  Accordion,
  AccordionSummary,
} from "./StyledUserAccordion";

const UserAccordion = ({ email, usersProjects }) => {
  const renderCourseList = (courses) => (
    <Typography component={"span"}>
      <StyledCoursesList>
        {courses.map(({ courseName, lessonsOpen, lessonsCompleted }, index) => {
          return (
            <StyledCourseItem key={index}>
              <StyledCourseInfo>
                <StyledCourseKey>Course:</StyledCourseKey>
                <p>{courseName}</p>
              </StyledCourseInfo>
              <StyledCourseInfo>
                <StyledLessonOpenedKey>Lessons opened:</StyledLessonOpenedKey>
                <StyledLessonValue>{lessonsOpen}</StyledLessonValue>
              </StyledCourseInfo>
              <StyledCourseInfo>
                <StyledLessonCompletedKey>
                  Lessons completed:
                </StyledLessonCompletedKey>
                <p>{lessonsCompleted}</p>
              </StyledCourseInfo>
            </StyledCourseItem>
          );
        })}
      </StyledCoursesList>
    </Typography>
  );

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <StyledTypographyHeading>User</StyledTypographyHeading>
          <StyledTypographyHeading secondary="true">
            {email}
          </StyledTypographyHeading>
        </AccordionSummary>
        <Typography component={"span"}>
          <StyledProjectsList>
            {usersProjects.map(({ projectName, courses }, index) => {
              return (
                <li key={index}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <StyledTypographyHeading>
                        Project name
                      </StyledTypographyHeading>
                      <StyledTypographyHeading secondary="true">
                        {projectName}
                      </StyledTypographyHeading>
                    </AccordionSummary>
                    {renderCourseList(courses)}
                  </Accordion>
                </li>
              );
            })}
          </StyledProjectsList>
        </Typography>
      </Accordion>
    </>
  );
};

export default UserAccordion;
