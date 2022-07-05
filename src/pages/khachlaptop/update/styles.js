import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  newUserForm: {
      background: '#fff',
      marginTop: '40px',
      border: '1px solid rgba(224, 224, 224, 1)',
      borderRadius: '4px',
      padding: '15px',
  },
  newUserItem: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '10px',
      marginRight: '20px',
  },
  label: {
      marginBottom: '10px',
      fontSize: '18px',
      fontWeight: 'bold',
  },
  inputName: {
      padding: '10px',
      border: '1px solid gray',
      borderRadius: '5px',
      fontSize: '15px',
  },
  newUserType: {
      height: '40px',
      borderRadius: '5px',
      fontSize: '15px',
  },
  newUserBtn: {
      marginTop: '20px',
  }
}));
