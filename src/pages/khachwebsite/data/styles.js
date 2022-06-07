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
    marginLeft: '20px',
  },
  newServiceType: {
    height: '38px',
  },
  boxUse: {
    float: 'left',
    background: '#2196f3',
    color: '#fff',
    marginRight: '20px',
    padding: '7px 20px 7px 20px',
    borderRadius: '4px'
  },
  boxAbout: {
    float: 'left',
    background: '#ff7043',
    color: '#fff',
    marginRight: '20px',
    padding: '7px 20px 7px 20px',
    borderRadius: '4px'
  },
  boxExpire: {
    float: 'left',
    background: '#f44336',
    color: '#fff',
    marginRight: '20px',
    padding: '7px 20px 7px 20px',
    borderRadius: '4px'
  },
}));
