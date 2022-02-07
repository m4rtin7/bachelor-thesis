import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Excersise } from "../types";

export const ExcersiseItem = ({
  excersise,
  onClick,
}: {
  excersise: Excersise;
  onClick: (v: void) => void;
}) => {
  const { title } = excersise;
  return (
    <Paper>
      <Box
        display="flex"
        flexDirection="row"
        onClick={() => onClick()}
        sx={{
          ":hover": {
            cursor: "pointer",
            background: "red",
          },
        }}
      >
        <Typography>{title}</Typography>
      </Box>
    </Paper>
  );
};
