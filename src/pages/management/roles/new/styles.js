import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  newRolesForm: {
      background: '#fff',
      marginTop: '40px',
      border: '1px solid rgba(224, 224, 224, 1)',
      borderRadius: '4px',
      padding: '15px',
  },
  newRolesItem: {
      width: '40%',
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
  newRolesType: {
      height: '40px',
      borderRadius: '5px',
      fontSize: '15px',
  },
  newRoleBtn: {
      marginTop: '20px',
  },
  listPermission: {
    display: "flex",
  },
  itemPermisstion: {
    marginRight: '40px',
  }
}));
