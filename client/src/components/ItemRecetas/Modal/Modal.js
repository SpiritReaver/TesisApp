import * as React from "react";
import { useState, useContext } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./PorcionesSelect.css";
import { useParams } from "react-router-dom";
import UpdatePorciones from "../../../services/UpdatePorciones";
import RecetasToList from "../../../services/RecetaToList";
import Context from "../../../context/UserIdContext";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    porciones: 1,
  });
  const [open, setOpen] = useState(false);
  const { RecetaId } = useParams();
  const { UserId } = useContext(Context);

  console.log(UserId);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(false);
    console.log(options.porciones);
    UpdatePorciones({ porciones: options.porciones, idreceta: RecetaId })
      .then((res) => {
        console.log(res.data);
        RecetasToList({ UserId: UserId, idreceta: RecetaId }).then((res) => {
          console.log(res.data);
        });
      })
      .finally(() => {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  };

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Agregar a la lista de compra
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Selecciona el número de porciones que deseas
        </BootstrapDialogTitle>
        <div className="UwU">
          <div>
            <div>
              <div>
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.porciones} PORCIONES  `}</span>
                {!openOptions && (
                  <div>
                    <div className="options">
                      <div className="optionCounter">
                        <button
                          disabled={options.porciones <= 1}
                          onClick={() => handleOption("porciones", "d")}
                          className="optionCounterButton"
                        >
                          -
                        </button>
                        <span className="optionCounter">
                          {options.porciones}
                        </span>
                        <button
                          onClick={() => handleOption("porciones", "i")}
                          className="optionCounterButton"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <DialogActions>
          <Button autoFocus onClick={handleClick}>
            Guardar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
