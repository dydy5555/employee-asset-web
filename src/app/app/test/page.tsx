"use client";
import ViewHistoryModal from '@/components/Modals/ViewHistoryModal';
import { Button } from '@nextui-org/react';
import { useState, useEffect } from 'react';




export default function Page() {
    const [openHistory, setOpenHistory] = useState(false)

  return (
    <div className="py-20 px-20">
      <p  className="text-center mb-4 font-bold text-2xl">
        Asset History
      </p>
      <hr />
      <br />
      <Button onPress={()=>setOpenHistory(true)}>Open Modal</Button>
      <ViewHistoryModal openHistory={openHistory} setOpenHistory={setOpenHistory} />
    </div>
  )
}
