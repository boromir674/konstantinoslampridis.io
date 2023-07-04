import ExperienceItemGeneric from "./ExperienceItemGeneric";

export default {
  component: ExperienceItemGeneric,
  title: "ExperienceItemGeneric",
  tags: ["autodocs"],
};

const experinceItemData = {
  title: "Full-stack Developer",
  company: "Feel Robotics",
  location: "Amsterdam",
  duration: "Duration",
  description: "Description",
  technology_tags: ["python"],
};

type OnClickCallback = () => void;

interface ExperienceItemData {
    [key: string]: any;
};


export const Light = {
  args: {
    // same interface as the props of the Component
    renderProps: ({
      onClick,
      dataInterface,
    }: {
      onClick: OnClickCallback;
      dataInterface: ExperienceItemData;
    }) => (
        <div onClick={onClick}>
        {Object.entries(dataInterface).map(([key, value]) => (
          <><a
            key={key}
          >
            {value}
          </a><p></p></>
        ))}
      </div>
    ),
    data: {
      title: "Full-stack Developer",
      company: "Feel Robotics",
      location: "Amsterdam",
      duration: "Duration",
      description: "Description",
      technology_tags: ["python"],
    },
  },
};

export const Dark = {
  args: {
    // same interface as the props of the Component
    ...Light.args,
  },
};
