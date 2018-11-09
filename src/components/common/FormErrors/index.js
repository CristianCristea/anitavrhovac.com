import React from 'react';
import Typography from '@material-ui/core/Typography';
import './FormErrors.scss';

const FormErrors = ({ formErrors }) => {
  return (
    <div className="formErrors">
      {Object.keys(formErrors).map((fieldName, i) => {
        if (formErrors[fieldName].length > 0) {
          let field = fieldName === 'name' ? 'Name' : 'Ort';
          return (
            <Typography variant="subtitle2" key={i}>
              {`Der ${field}`} {formErrors[fieldName]}
            </Typography>
          );
        } else {
          return '';
        }
      })}
    </div>
  );
};

export default FormErrors;
