import { BRAND } from "@/types/brand";
import Image from "next/image";

const brandData: BRAND[] = [
  {
    logo: "/images/materail/desktop.svg",
    name: "Desktop (CPU)",
    visitors: 3.5,
    revenues: "68",
    sales: 590,
    conversion: "Desktop=37, Clone=25",
  },
  {
    logo: "/images/materail/laptop.svg",
    name: "Laptop",
    visitors: 2.2,
    revenues: "35",
    sales: 467,
    conversion: "",
  },
  {
    logo: "/images/materail/monitor.svg",
    name: "Monitor",
    visitors: 2.1,
    revenues: "90",
    sales: 420,
    conversion: "Size:17inch=3, 19inch=5, 20inch=37, 21.5inch=101",
  },
  {
    logo: "/images/materail/ups.svg",
    name: "UPS",
    visitors: 1.5,
    revenues: "80",
    sales: 389,
    conversion: "UPS: Old=63, Old-650VA=3, New-650VA=9",
  },
  {
    logo: "/images/materail/imac.svg",
    name: "iMac",
    visitors: 3.5,
    revenues: "212",
    sales: 390,
    conversion: "Size: (27-inch=2), (21.5-inch=10)",
  },
  {
    logo: "/images/materail/korean-phone.svg",
    name: "Korea-Black phone",
    visitors: 3.5,
    revenues: "88",
    sales: 390,
    conversion: "",
  },
  {
    logo: "/images/materail/Camintel-ip-phone.svg",
    name: "Camintel-ip-phone",
    visitors: 32,
    revenues: "100",
    sales: 390,
    conversion: "",
  },
];

const TableOne = () => {
  return (
    <div className="w-full rounded-xl border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Material Usage
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Material
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Inform-Material	
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Total Usage
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Remark
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <Image src={brand.logo} alt="Brand" width={48} height={48} />
              </div>
              <b className="hidden text-black dark:text-white sm:block">
                {brand.name}
              </b>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.visitors}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{brand.revenues}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{brand.conversion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
