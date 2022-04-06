import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    newConstructionForm: {
        background: '#fff',
        marginTop: '40px',
        border: '1px solid rgba(224, 224, 224, 1)',
        borderRadius: '4px',
        padding: '15px',
    },
    newConstructionItem: {
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
    newConstructionType: {
        height: '40px',
        borderRadius: '5px',
        fontSize: '15px',
    },
    newConstructionBtn: {
        marginTop: '20px',
    }
}));
