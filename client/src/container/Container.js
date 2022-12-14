import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Registro from "../components/Registro";
import Login from "../components/Login";

const RegistroContainer = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const paperStyle = { width: 400, margin: "20px auto" };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Paper elevation={20} style={paperStyle}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disbled tabs example"
        variant="fullWidth"
      >
        <Tab label="Login" />
        <Tab label="Registro" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Login handleChange={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Registro />
      </TabPanel>
    </Paper>
  );
};

export default RegistroContainer;
