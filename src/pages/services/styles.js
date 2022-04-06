import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  serviceData: {
    background: '#fff',
  },
  serviceListEdit: {
    border: 'none',
    borderRadius: '10px',
    padding: '5px 10px',
    backgroundColor: '#3bb077',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '10px',
  },
  serviceListDelete: {
    color: '#f00',
    cursor: 'pointer',
  },
  buttonAction: {
    display: 'flex',
    alignItems: 'center',
  }
}));
