"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Spacer,
  CardBody,
  Button,
  CardFooter,
  Spinner,
  ModalFooter,
  ModalContent,
  Modal,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { Typography, Chip, Grid, IconButton } from "@mui/material";
import {
  ArrowForward,
  CalendarToday,
  Person,
  Description,
} from "@mui/icons-material";
import TableItemHistory from "../Tables/TableItemHistory/TableItemHistory";
import { func_GetItemHistoryByItemId } from "@/services/itemhistory.service";

const sampleData = {
  message: "Get All Histories successfully",
  payload: [
    {
      id: "669a0a8490769163d2eb7df2",
      itemId: "LAPTOP-001",
      employeeId: "111",
      useInttId: "222",
      description: "MacBook Pro 13-inch",
      givenDate: "2024-05-15",
      returnedDate: "",
      givenBy: "John Doe",
      receivedBy: "",
      condition: "Excellent",
      status: "In Use",
    }
  ],
  date: "2024-07-19T13:41:23.7313187",
};

export default function ViewHistoryModal({ selectItem, openHistory, setOpenHistory }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [itemHistory, setItemHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([])

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setItemHistory(sampleData.payload);
      setLoading(false);
    }, 1000);    
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner size="lg" />
      </div>                                                                      
    );
  }

  return (
    <>
      <Modal
        isOpen={openHistory}
        onOpenChange={() => setOpenHistory(false)}
        size="5xl"
        // className="w-[100vw]"
      >
        <ModalContent  className="h-[650px]">
          {(onClose) => (
            <>                                                                        
              <ModalHeader className="flex flex-col gap-1">
                <p className="text-center font-bold text-2xl">
                  Item Detail
                </p>
              </ModalHeader>
              <ModalBody className="overflow-y-auto py-0 gap-0 ">
                <div className="py-0 px-5">
                  <TableItemHistory selectItem={selectItem} />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => setOpenHistory(false)}
                >
                  Close
                </Button>
                {/* <Button color="primary" onPress={() => setOpenHistory(false)}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
