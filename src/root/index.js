import axios from "axios";
import { useEffect, useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserAccordion from "../components/UserAccordion";
import { StyledUserList, useStyles } from "./StyledRoot";

const Root = () => {
  const [usersData, setUsersData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getApi = () => {
    axios
      .get(
        `https://xtramile.azure-api.net/stats/lukaszcoding?apiSecret=${process.env.REACT_APP_API_SECRET}`
      )
      .then(({ data }) => {
        setUsersData(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getApi();
  }, []);

  const formatData = () => {
    //creating not repeating emails + anonymous user array
    const usersEmailsArray = [
      ...new Set(
        usersData.map(({ email, person }) =>
          email.length !== 0 ? email : person
        )
      ),
    ];

    const newData = usersEmailsArray.map((email) => {
      let userProjects = [];

      // creating not repeating projects array
      usersData.forEach((item) => {
        if (item.email === email || email === "Anonymous user") {
          userProjects = [...new Set([...userProjects, item.project])];
        }
      });

      // creating project and course arrays
      userProjects = userProjects.map((project) => {
        let projectWithCourses = {};
        let tempCourses = [];
        let tempLessonsOpen = [];
        let tempLessonsCompleted = [];

        //when email and project exist in the object we find and add courses with lessons opened and completed
        usersData.forEach((item) => {
          if (
            (item.project === project && item.email === email) ||
            (item.project === project &&
              email === "Anonymous user" &&
              item.person === "Anonymous user")
          ) {
            tempCourses = [...tempCourses, item.course];
            tempLessonsOpen = [...tempLessonsOpen, item.openedLessonsCount];
            tempLessonsCompleted = [
              ...tempLessonsCompleted,
              item.completedLessonsCount,
            ];
            // creating a course object
            const courses = tempCourses.map((course, i) => {
              const courseWithLessons = {
                courseName: course,
                lessonsOpen: parseInt(tempLessonsOpen[i]),
                lessonsCompleted: tempLessonsCompleted[i],
              };
              return courseWithLessons;
            });
            //creating project object
            projectWithCourses = {
              projectName: project,
              courses,
            };
          }
        });

        return projectWithCourses;
      });

      //removing empty objects from projects array
      const formattedUsersProjects = userProjects.filter(
        (value) => Object.keys(value).length !== 0
      );

      const dataItem = {
        email,
        usersProjects: formattedUsersProjects,
      };
      return dataItem;
    });

    setFormattedData([...newData]);
  };

  useEffect(() => {
    formatData();
  }, [usersData]);

  const classes = useStyles();

  return (
    <>
      {loading ? (
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <StyledUserList>
          {formattedData.map((user, index) => {
            return (
              <li key={index}>
                <UserAccordion {...user} />
              </li>
            );
          })}
        </StyledUserList>
      )}
    </>
  );
};

export default Root;
