import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";

export function TabsDefault() {
  const data = [
    {
      label: "CA / CS/ CPA Firms",
      value: "CA / CS/ CPA Firms",
      src: "https://cdn.taskopad.com/user/themes/quark/images/feature_details/ca.webp",
      desc: `We understand how important and stringent government compliance has become. We see that a lot of CA and CPA firms go through a lot of stress and undue pressure for basic task management and client information so that they can comply to the government norms on time and in the right way. Inability to do so leads to the loss of the client and they also end up shelling huge penalties. With TaskOPad, Managers can easily assign tasks to their team mates for various clients, take control of the dashboard to check the progress and also share insights and information real time with their team.`,
    },
    {
      label: "IT Companies",
      value: "IT Companies",
      src: "https://cdn.taskopad.com/user/themes/quark/images/feature_details/law.webp",
      desc: `We understand how important and stringent government compliance has become. We see that a lot of CA and CPA firms go through a lot of stress and undue pressure for basic task management and client information so that they can comply to the government norms on time and in the right way. Inability to do so leads to the loss of the client and they also end up shelling huge penalties. With TaskOPad, Managers can easily assign tasks to their team mates for various clients, take control of the dashboard to check the progress and also share insights and information real time with their team.`,
    },
    {
      label: "Service Sectors",
      value: "Service Sectors",
      src: "https://cdn.taskopad.com/user/themes/quark/images/feature_details/service.webp",
      desc: `We understand how important and stringent government compliance has become. We see that a lot of CA and CPA firms go through a lot of stress and undue pressure for basic task management and client information so that they can comply to the government norms on time and in the right way. Inability to do so leads to the loss of the client and they also end up shelling huge penalties. With TaskOPad, Managers can easily assign tasks to their team mates for various clients, take control of the dashboard to check the progress and also share insights and information real time with their team.`,
    },
  ];

  return (
    <Tabs value={data[0].value} >
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value} className=" text-xsm lg:text-lg">
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc, src }) => (
          <TabPanel key={value} value={value} className="mt-9 p-6 lg:p-0">
            <div className="flex flex-col lg:flex-row justify-center items-center">
              <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                <img src={src} className="mx-auto max-h-96" alt="" />
              </div>
              <div className="w-full lg:w-1/2 px-4">
                <h3 className="text-xs lg:text-xl">{desc}</h3>
              </div>
            </div>
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs >
  );
}