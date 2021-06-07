import axios from "axios";
import { useEffect, useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const App = () => {
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
        console.log(data);
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
        let projectObj = {};
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
            const newTempCourses = tempCourses.map((el, i) => {
              const courseObj = {
                courseName: el,
                lessonsOpen: parseInt(tempLessonsOpen[i]),
                lessonsCompleted: tempLessonsCompleted[i],
              };
              return courseObj;
            });
            //creating project object
            projectObj = {
              projectName: project,
              courses: newTempCourses,
            };
          }
        });

        return projectObj;
      });

      //removing empty objects from projects array
      const newUsersProjects = userProjects.filter(
        (value) => Object.keys(value).length !== 0
      );

      const dataItem = {
        email,
        newUsersProjects,
      };
      return dataItem;
    });

    console.log("TUTAJ", newData);
    setFormattedData(newData);
  };

  //formatData triggers when usersData exists
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
        <ul>
          {formattedData.map((user, index) => {
            return (
              <li key={index}>
                <p>{user.email}</p>
                --------------------
                {user.newUsersProjects.map((project) => {
                  return (
                    <li>
                      <p>{project.projectName}</p>
                    </li>
                  );
                })}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default App;
