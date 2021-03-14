import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Popup() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        explore input fields
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          input fields 
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            age - age in years
           
          </Typography>
          <Typography gutterBottom>
            sex - (1 = male; 0 = female)
           
          </Typography>
          <Typography gutterBottom>
            cp - chest pain type
            0: Typical angina: chest pain related decrease blood supply to the heart
            1: Atypical angina: chest pain not related to heart
            2: Non-anginal pain: typically esophageal spasms (non heart related)
            3: Asymptomatic: chest pain not showing signs of disease
            
          </Typography>
          <Typography gutterBottom>
          trestbps - resting blood pressure (in mm Hg on admission to the hospital)
          anything above 130-140 is typically cause for concern
           
          </Typography>
          <Typography gutterBottom>
            chol - serum cholestoral in mg/dl
            serum = LDL + HDL + .2 * triglycerides
            above 200 is cause for concern
            
          </Typography>
          <Typography gutterBottom>
            fbs - (fasting blood sugar > 120 mg/dl) (1 = true; 0 = false)
            '>126' mg/dL signals diabetes
           
          </Typography>
          <Typography gutterBottom>
          restecg - resting electrocardiographic results
          0: Nothing to note
          1: ST-T Wave abnormality
          can range from mild symptoms to severe problems
          signals non-normal heart beat
          2: Possible or definite left ventricular hypertrophy
          Enlarged heart's main pumping chamber
           
          </Typography>
          <Typography gutterBottom>
            thalach - maximum heart rate achieved
           
          </Typography>
          <Typography gutterBottom>
            exang - exercise induced angina (1 = yes; 0 = no)
           
          </Typography>
          <Typography gutterBottom>
            oldpeak - ST depression induced by exercise relative to rest
            looks at stress of heart during excercise
            unhealthy heart will stress more
           
          </Typography>
          <Typography gutterBottom>
              slope - the slope of the peak exercise ST segment
              0: Upsloping: better heart rate with excercise (uncommon)
              1: Flatsloping: minimal change (typical healthy heart)
              2: Downslopins: signs of unhealthy heart
           
          </Typography>
          <Typography gutterBottom>
            ca - number of major vessels (0-3) colored by flourosopy
            colored vessel means the doctor can see the blood passing through
            the more blood movement the better (no clots)
            
          </Typography>
          <Typography gutterBottom>
            thal - thalium stress result
            1,3: normal
            6: fixed defect: used to be defect but ok now
            7: reversable defect: no proper blood movement when excercising
           
          </Typography>
          <Typography gutterBottom>
            target - have disease or not (1=yes, 0=no) (= the predicted attribute)
           
          </Typography>
          
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
