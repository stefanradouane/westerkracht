import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Check from "@mui/icons-material/Check";
import Delete from "@mui/icons-material/Delete";
import Close from "@mui/icons-material/Close";

import handleMessage from "../admin/messages/handle-message";

const actions = [
  {
    icon: <Check />,
    name: "Afgehandeld",
    type: "done",
    click: (message, setHandled, useMessage) => {
      handleMessage(message, setHandled, useMessage);
    },
  },
  {
    icon: <Close />,
    name: "Open",
    type: "open",
    click: (message, setHandled, useMessage) => {
      handleMessage(message, setHandled, useMessage);
    },
  },
  {
    icon: <Delete />,
    name: "Verwijder",
    type: "delete",
    click: (message, setHandled, useMessage) => {
      handleMessage(message, setHandled, useMessage, true);
    },
  },
];

export default function SpeedDialTooltipOpen(props) {
  const { message, useMessage, setHandled } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <section>
      <SpeedDial
        ariaLabel="SpeedDial playground example"
        hidden={false}
        icon={<SpeedDialIcon />}
        direction={"left"}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}>
        {actions.map((action) => {
          if (message.handled && action.type === "done") return null;
          if (!message.handled && action.type === "open") return null;

          return (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              sx={{ backgroundColor: "white" }}
              onClick={() => {
                action.click(message, setHandled, useMessage);
              }}
            />
          );
        })}
      </SpeedDial>
    </section>
  );
}
