import { Stack } from "@mui/material";
import { useState } from "react";
import { Excersise } from "../types";
import { ExcersiseItem } from "./ExcersiseItem";

export const ExcersiseList = ({ excercises }: { excercises: Excersise[] }) => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  return (
    <Stack spacing={2}>
      {activeIndex}
      {excercises.map((excercises, index) => {
        return (
          <ExcersiseItem
            key={index}
            excersise={excercises}
            onClick={() => {
              setActiveIndex(index);
            }}
          />
        );
      })}
    </Stack>
  );
};
