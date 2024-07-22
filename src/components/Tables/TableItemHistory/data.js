import React from "react";
const columns = [
  // {name: "ID", uid: "id", sortable: true},
  {name: "EMPLOYEE NAME", uid: "name", sortable: true},
  {name: "GIVEN BY", uid: "givenby", sortable: true},
  {name: "RECEIVED BY", uid: "receiveby", sortable: true},
  {name: "GIVEN DATE", uid: "givendate", sortable: true},
  {name: "RETURNED DATE", uid: "returneddate", sortable: true},
  {name: "DESCRIPTION", uid: "description", sortable: true},
  {name: "CONDITION", uid: "condition", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
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
