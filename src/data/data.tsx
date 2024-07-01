import React from "react";
const columns = [
  { name: "ID", uid: "id", sortable: true },
  // { name: "USER ID", uid: "userid", sortable: true },
  { name: "ASSET TYPE", uid: "asset_type", sortable: true },
  { name: "ASSET Name", uid: "asset_name", sortable: true },
  { name: "TYPE", uid: "type", sortable: true },
  { name: "LABEL NO", uid: "label_no", sortable: true },
  { name: "MAC ADDRESS", uid: "mac_address" },
  { name: "INCH A", uid: "inch_a" },
  { name: "UPS TYPE", uid: "ups_type" },
  { name: "UPS LABEL", uid: "ups_label" },
  { name: "HDD SATA", uid: "hdd_sata" },
  { name: "HDD SSD", uid: "hdd_ssd" },
  { name: "RAM", uid: "ram" },
  { name: "Remark", uid: "remark", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const category = [
  {
    category_Id: "6678e3e29d66750b6de12cc0",
    category_name: "Laptop",
    sub_category: ["name", "model", "type"],
  },
  {
    category_Id: "6678e3e29d66750b6de12cc0",
    category_name: "Monitor",
    sub_category: ["name", "mac", "inch"],
  },
];
const asset_user = [
  {
    id: "665d39921a52d071f490cbdbx",
    userId: "rithysak",
    username: "Ren Rithysak",
    team: "B2B",
    department: "B2B R&D",
    company: "KOSIGN",
    tel: "0992344454",
    prfl_PHTG:
      "https://i.pinimg.com/736x/2e/7a/a5/2e7aa5fc8a1eaa81f604d1b992acbcb1.jpg",
    allAssets: [
      {
        category_Id: "6678e3es29d66750b6de12cc0",
        name: "Laptop",
        subCategories: [
          {
            name: "Laptop",
            type: "Dell",
            core: "i7",
          },
        ],
      },
      {
        category_Id: "667b6f58q3c221868097b2a54",
        name: "Keyboard",
        subCategories: [
          {
            name: "Dell",
            color: "Pink",
          },
        ],
      },
    ],
    remark: "",
  },
  {
    id: "665d39921a52d071f490csddb",
    userId: "moniroit",
    username: "Morn Moniroit",
    team: "B2B",
    department: "B2B R&D",
    company: "KOSIGN",
    tel: "092344454",
    prfl_PHTG:
      "https://i.pinimg.com/originals/be/ce/4f/bece4fb55afdd7bbdc55628cc8242aea.jpg",
    allAssets: [],
    remark: "",
  },
  {
    id: "665d39921a52d0c71f490cbxdb",
    userId: "rithysak",
    username: "Ren Rithysak",
    team: "B2B",
    department: "B2B R&D",
    company: "KOSIGN",
    tel: "0992344454",
    prfl_PHTG:
      "https://i.pinimg.com/736x/2e/7a/a5/2e7aa5fc8a1eaa81f604d1b992acbcb1.jpg",
    allAssets: [
      {
        category_Id: "6678e3e29d66750b6deq12cc0",
        name: "Laptop",
        subCategories: [
          {
            name: "Laptop",
            type: "Dell",
            core: "i7",
          },
        ],
      },
      {
        category_Id: "667b6f583c22186809a7b2a54",
        name: "Keyboard",
        subCategories: [
          {
            name: "Dell",
            color: "Pink",
          },
        ],
      },
    ],
    remark: "",
  },
  {
    id: "665d39921a52d071f490cbdb",
    userId: "rithysak",
    username: "Ren Rithysak",
    team: "B2B",
    department: "B2B R&D",
    company: "KOSIGN",
    tel: "0992344454",
    prfl_PHTG:
      "https://i.pinimg.com/736x/2e/7a/a5/2e7aa5fc8a1eaa81f604d1b992acbcb1.jpg",
    allAssets: [
      {
        category_Id: "6678e3e29d66750b6de12cc0",
        name: "Laptop",
        subCategories: [
          {
            name: "Laptop",
            type: "Dell",
            core: "i7",
          },
        ],
      },
      {
        category_Id: "667b6f583c221868097b2a54",
        name: "Keyboard",
        subCategories: [
          {
            name: "Dell",
            color: "Pink",
          },
        ],
      },
    ],
    remark: "",
  },
  {
    id: "665d39af1a52ad071f490cbdc",
    userId: "chivorn",
    username: "Ngoun Chivorn",
    team: "B2B",
    department: "B2B R&D",
    company: "비즈플레이(주)",
    tel: "0992344454",
    prfl_PHTG:
      "https://i.pinimg.com/736x/8d/96/08/8d960872618c86ab63bd51922c4da6de.jpg",
    allAssets: [
      {
        category_Id: "6678e3e29d66r750b6de12cc0",
        name: "Laptop",
        subCategories: [
          {
            name: "Laptop",
            type: "Dell",
            core: "i7",
          },
        ],
        remark: "",
      },
      {
        category_Id: "667b6f583ca221868097b2a54",
        name: "Monitor",
        subCategories: [
          {
            name: "Dell",
            inch: "20",
            type: "sss",
          },
        ],
        remark: "",
      },
    ],
    remark: "",
  },
  {
    id: "665d39af1a52d071f49v0cbdc",
    userId: "chivorn",
    username: "Ngoun Chivorn",
    team: "B2B",
    department: "B2B R&D",
    company: "비즈플레이(주)",
    tel: "0992344454",
    prfl_PHTG:
      "https://i.pinimg.com/736x/8d/96/08/8d960872618c86ab63bd51922c4da6de.jpg",
    allAssets: [
      {
        category_Id: "6678e3e29d66750b6de12ccc0",
        name: "Laptop",
        subCategories: [
          {
            name: "Laptop",
            type: "Dell",
            core: "i7",
          },
        ],
        remark: "",
      },
      {
        category_Id: "667b6f583c221868097b2am54",
        name: "Monitor",
        subCategories: [
          {
            name: "Dell",
            inch: "20",
            type: "sss",
          },
        ],
        remark: "",
      },
    ],
    remark: "",
  },
  {
    id: "665d39af1a52d071fg490cbdc",
    userId: "chivorn",
    username: "Ngoun Chivorn",
    team: "B2B",
    department: "B2B R&D",
    company: "비즈플레이(주)",
    tel: "0992344454",
    prfl_PHTG:
      "https://i.pinimg.com/736x/8d/96/08/8d960872618c86ab63bd51922c4da6de.jpg",
    allAssets: [
      {
        category_Id: "6678e3e29dt66750b6de12cc0",
        name: "Laptop",
        subCategories: [
          {
            name: "Laptop",
            type: "Dell",
            core: "i7",
          },
        ],
        remark: "",
      },
      {
        category_Id: "667b6f583cy221868097b2a54",
        name: "Monitor",
        subCategories: [
          {
            name: "Dell",
            inch: "20",
            type: "sss",
          },
        ],
        remark: "",
      },
    ],
    remark: "",
  },
  {
    id: "665d39af1a52d071f490cibdc",
    userId: "chivorn",
    username: "Ngoun Chivorn",
    team: "B2B",
    department: "B2B R&D",
    company: "비즈플레이(주)",
    tel: "0992344454",
    prfl_PHTG:
      "https://i.pinimg.com/736x/8d/96/08/8d960872618c86ab63bd51922c4da6de.jpg",
    allAssets: [
      {
        category_Id: "6678e3e2f9d66750b6de12cc0",
        name: "Laptop",
        subCategories: [
          {
            name: "Laptop",
            type: "Dell",
            core: "i7",
          },
        ],
        remark: "",
      },
      {
        category_Id: "667b6f583c2218680797b2a54",
        name: "Monitor",
        subCategories: [
          {
            name: "Dell",
            inch: "20",
            type: "sss",
          },
        ],
        remark: "",
      },
    ],
    remark: "",
  },
  {
    id: "6662c6465f21945835g204e12",
    userId: "kongrady",
    username: "KongRady",
    team: "B2B",
    department: "B2B R&D",
    company: "비플페이(주)",
    tel: "0992344454",
    prfl_PHTG:
      "https://i.pinimg.com/originals/a8/e6/e2/a8e6e23c75885dd1ba558506b2c02c09.jpg",
    allAssets: [
      {
        category_Id: "6678e3e299d66750b6de12cc0",
        name: "Phone",
        subCategories: [
          {
            name: "Nokia",
            model: "2000",
          },
        ],
        remark: "Transfer from senior Ngoun Chivorn",
      },
    ],
    remark: "Internship",
  },
  {
    id: "6662c6465f21945835204e12",
    userId: "kongrady",
    username: "KongRady",
    team: "B2B",
    department: "B2B R&D",
    company: "비플페이(주)",
    tel: "0992344454",
    prfl_PHTG:
      "https://i.pinimg.com/originals/a8/e6/e2/a8e6e23c75885dd1ba558506b2c02c09.jpg",
    allAssets: [
      {
        category_Id: "6678e3e29d66750b6de12cc0",
        name: "Phone",
        subCategories: [
          {
            name: "Nokia",
            model: "2000",
          },
        ],
        remark: "Transfer from senior Ngoun Chivorn",
      },
    ],
    remark: "Internship",
  },
  {
    id: "6662c6465f21945835204de66",
    userId: "sokhen",
    username: "Sim Sokhen",
    team: "B2B",
    department: "B2B R&D",
    company: "비플페이(주)",
    prfl_PHTG:
      "https://i.pinimg.com/564x/62/a2/b5/62a2b5e86f23ff89ce394d7eed6a4d43.jpg",
    allAssets: [
      {
        category_Id: "6678e3e29id66750b6de12cc0",
        name: "Laptop",
        subCategories: [
          {
            name: "Laptop",
            type: "Dell",
            core: "i7",
          },
        ],
        remark: "",
      },
      {
        category_Id: "667b6f583cr221868097b2a54",
        name: "Mouse",
        subCategories: [
          {
            model: "Logi",
          },
        ],
        remark: "",
      },
      {
        category_Id: "667b6f583oc221868097b2a54",
        name: "Phone",
        subCategories: [
          {
            name: "Camintel IP-Phone",
          },
        ],
        remark: "",
      },
    ],
    remark: "New member",
  },
  {
    id: "6662c6465f21945835204ee66",
    userId: "sokhen",
    username: "Sim Sokhen",
    team: "B2B",
    department: "B2B R&D",
    company: "비플페이(주)",
    prfl_PHTG:
      "https://i.pinimg.com/564x/62/a2/b5/62a2b5e86f23ff89ce394d7eed6a4d43.jpg",
    allAssets: [
      {
        category_Id: "6678e3e2t9d66750b6de12cc0",
        name: "Laptop",
        subCategories: [
          {
            name: "Laptop",
            type: "Dell",
            core: "i7",
          },
        ],
        remark: "",
      },
      {
        category_Id: "667b6f583co221868097b2a54",
        name: "Mouse",
        subCategories: [
          {
            model: "Logi",
          },
        ],
        remark: "",
      },
      {
        category_Id: "667b6f583cp221868097b2a54",
        name: "Phone",
        subCategories: [
          {
            name: "Camintel IP-Phone",
          },
        ],
        remark: "",
      },
    ],
    remark: "New member",
  },
  {
    id: "6662c6465f219458352x04e66",
    userId: "sokhen",
    username: "Sim Sokhen",
    team: "B2B",
    department: "B2B R&D",
    company: "비플페이(주)",
    prfl_PHTG:
      "https://i.pinimg.com/564x/62/a2/b5/62a2b5e86f23ff89ce394d7eed6a4d43.jpg",
    allAssets: [
      {
        category_Id: "6678e3e29d66750b6dve12cc0",
        name: "Laptop",
        subCategories: [
          {
            name: "Laptop",
            type: "Dell",
            core: "i7",
          },
        ],
        remark: "",
      },
      {
        category_Id: "667b6f583c221868f097b2a54",
        name: "Mouse",
        subCategories: [
          {
            model: "Logi",
          },
        ],
        remark: "",
      },
      {
        category_Id: "667b6f583c221n868097b2a54",
        name: "Phone",
        subCategories: [
          {
            name: "Camintel IP-Phone",
          },
        ],
        remark: "",
      },
    ],
    remark: "New member",
  },
  {
    id: "6662c6465f2194583r5204e66",
    userId: "sokhen",
    username: "Sim Sokhen",
    team: "B2B",
    department: "B2B R&D",
    company: "비플페이(주)",
    prfl_PHTG:
      "https://i.pinimg.com/564x/62/a2/b5/62a2b5e86f23ff89ce394d7eed6a4d43.jpg",
    allAssets: [
      {
        category_Id: "6678e3ey29d66750b6de12cc0",
        name: "Laptop",
        subCategories: [
          {
            name: "Laptop",
            type: "Dell",
            core: "i7",
          },
        ],
        remark: "",
      },
      {
        category_Id: "667b6f583cj221868097b2a54",
        name: "Mouse",
        subCategories: [
          {
            model: "Logi",
          },
        ],
        remark: "",
      },
      {
        category_Id: "667b6f583c2d21868097b2a54",
        name: "Phone",
        subCategories: [
          {
            name: "Camintel IP-Phone",
          },
        ],
        remark: "",
      },
    ],
    remark: "New member",
  },
  {
    id: "61662c6465f21945835204e66",
    userId: "sokhen",
    username: "Sim Sokhen",
    team: "B2B",
    department: "B2B R&D",
    company: "비플페이(주)",
    prfl_PHTG:
      "https://i.pinimg.com/564x/62/a2/b5/62a2b5e86f23ff89ce394d7eed6a4d43.jpg",
    allAssets: [
      {
        category_Id: "66784e3e29d66750b6de12cc0",
        name: "Laptop",
        subCategories: [
          {
            name: "Laptop",
            type: "Dell",
            core: "i7",
          },
        ],
        remark: "",
      },
      {
        category_Id: "667vb6f583c221868097b2a54",
        name: "Mouse",
        subCategories: [
          {
            model: "Logi",
          },
        ],
        remark: "",
      },
      {
        category_Id: "667yb6f583c221868097b2a54",
        name: "Phone",
        subCategories: [
          {
            name: "Camintel IP-Phone",
          },
        ],
        remark: "",
      },
    ],
    remark: "New member",
  },
];

const items = [
  {
    id: 1,
    userId: "kongrady",
    asset_name: [
      {
        laptop: [
          {
            name: "Laptop",
            type: "Dell-3440",
            lable_no: "KS-2014-EL043",
            mac_address: "192.168.178",
          },
          {
            name: "Laptop",
            type: "Dell-3440",
            lable_no: "KS-2014-EL043",
            mac_address: "192.168.178",
          },
          {
            name: "Laptop",
            type: "Dell-3440",
            lable_no: "KS-2014-EL043",
            mac_address: "192.168.178",
          },
        ],
      },
      {
        phone: [
          {
            name: "Camintel IP-Phone",
          },
          {
            name: "Black-Phone(Korea)",
          },
        ],
      },
      {
        monitor_A: [
          {
            name: "Mnitor_A",
            inch_A: "string",
          },
        ],
      },
      {
        monitor_B: [
          {
            name: "Mnitor_B",
            inch_A: "string",
          },
        ],
      },
      {
        ups: [
          {
            name: "ups",
            ups_type: "string",
            ups_label: "string",
          },
        ],
      },
      {
        hdd: [
          {
            name: "hdd",
            hdd_sata: "string",
            hdd_ssd: "",
          },
        ],
      },
    ],
    ram: "string",
    remark: "string",
    use_INTT_ID: "string",
  },
  {
    id: 2,
    userId: "kongrady",
    asset_name: [
      {
        laptop: [
          {
            name: "Laptop",
            type: "Dell-3440",
            lable_no: "KS-2014-EL043",
            mac_address: "192.168.178",
          },
          {
            name: "Laptop",
            type: "Dell-3440",
            lable_no: "KS-2014-EL043",
            mac_address: "192.168.178",
          },
          {
            name: "Laptop",
            type: "Dell-3440",
            lable_no: "KS-2014-EL043",
            mac_address: "192.168.178",
          },
        ],
      },
      {
        phone: [
          {
            name: "Camintel IP-Phone",
          },
          {
            name: "Black-Phone(Korea)",
          },
        ],
      },
      {
        monitor_A: [
          {
            name: "Mnitor_A",
            inch_A: "string",
          },
        ],
      },
      {
        monitor_B: [
          {
            name: "Mnitor_B",
            inch_A: "string",
          },
        ],
      },
      {
        ups: [
          {
            name: "ups",
            ups_type: "string",
            ups_label: "string",
          },
        ],
      },
      {
        hdd: [
          {
            name: "hdd",
            hdd_sata: "string",
            hdd_ssd: "",
          },
        ],
      },
    ],
    ram: "string",
    remark: "string",
    use_INTT_ID: "string",
  },
];

export { columns, asset_user, statusOptions, items };
