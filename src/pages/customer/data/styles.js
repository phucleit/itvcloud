import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  userData: {
    background: '#fff',
  },
  userListEdit: {
    border: 'none',
    borderRadius: '10px',
    padding: '5px 10px',
    backgroundColor: '#3bb077',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '10px',
  },
  userListDelete: {
    color: '#f00',
    cursor: 'pointer',
  },
  buttonAction: {
    display: 'flex',
    alignItems: 'center',
  },
  search: {
    marginBottom: '30px',
  },
  searchTerm: {
    height: '38px',
    marginLeft: '20px',
    marginRight: '20px',
  },
  searchButton: {
    width: '3%',
    height: '40px',
  },
  boxSearch: {
    marginBottom: '20px',
  },
  newStatusType: {
    height: '38px',
  }
}));
