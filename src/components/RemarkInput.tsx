"use client";
import React from "react";
import { Textarea } from "@nextui-org/react";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
export default function RemarkInput({ textNote, setTextNote }) {
  const onchangeNote = (e) => {
    console.log("remark ", e.target.value);
    setTextNote(e.target.value);
  };
  return (
    <div className="">
      <Textarea
        onChange={onchangeNote}
        value={textNote}
        label={
            <div className="flex justify-center items-center gap-1">
                <EditNoteOutlinedIcon  />
                <span>Remark</span>
            </div>
        }
        placeholder="Enter item remark ..."
        disableAnimation
        minRows={5}
        maxRows={5}
        classNames={{
          base: `w-full h-fit bg-gray-100 border-0 dark:bg-dark dark:text-white rounded-xl`,
          input: `w-full h-fit overflow-y-auto rounded-lg hover:bg-white hover:shadow-md p-1 focus:bg-white focus:shadow-md dark:bg-dark dark:text-white custom-scroll`,
        }}
      />
    </div>
  );
}
