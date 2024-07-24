import React from "react";
const columns = [
  // {name: "ID", uid: "id"},
  {name: "EMPLOYEE NAME", uid: "name"},
  {name: "GIVEN BY", uid: "givenby"},
  {name: "GIVEN DATE", uid: "givendate"},
  {name: "RECEIVED BY", uid: "receiveby"},
  {name: "RETURNED DATE", uid: "returneddate"},
  {name: "DESCRIPTION", uid: "description"},
  {name: "CONDITION", uid: "condition"},
  {name: "STATUS", uid: "status"},
  // {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "In use", uid: "INUSE"},
  {name: "Returned", uid: "RETURNED"},
];

const datas = [
  {
    id: 1,
    name: "Employee 1",
    givenby: "Giver 1",
    receiveby: "Receiver 1",
    givendate: "2024-07-1",
    returneddate: "2024-08-1",
    description: "Description 1",
    condition: "Good",
    status: "In Use",
    actions: "View/Edit"
  },
  {
    id: 2,
    name: "Employee 2",
    givenby: "Giver 2",
    receiveby: "Receiver 2",
    givendate: "2024-07-2",
    returneddate: "",
    description: "Description 2",
    condition: "Poor",
    status: "Returned",
    actions: "View/Edit"
  },
];


export {columns, datas, statusOptions};
