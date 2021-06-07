import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

export const StyledUserList = styled.ul`
  list-style: none;
  width: 800px;
  max-width: 90%;
  padding: 0;
  margin: 0 auto;
  margin-top: 10vh;
`;

export const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
