import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

// styles
import useStyles from "./styles";

// logo
import scloud from './logo-scloud.png';

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [loginValue, setLoginValue] = useState("admin");
  var [passwordValue, setPasswordValue] = useState("admin");

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={scloud} alt="scloud" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>SCLOUD ADMIN</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Xin chào,
              </Typography>
              <Typography variant="h3" className={classes.greeting}>
                Vui lòng đăng nhập
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Username hoặc mật khẩu không đúng. Vui lòng nhập lại!
                </Typography>
              </Fade>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Username"
                type="text"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Đăng nhập
                  </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  Quên mật khẩu
                </Button>
              </div>
            </React.Fragment>
        </div>
        <Typography color="primary" className={classes.copyright}>
        Copyright © 2021 <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://scloud.vn/" rel="noopener noreferrer" target="_blank">ITV SCLOUD.</a>
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
