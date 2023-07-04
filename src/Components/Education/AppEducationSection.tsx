import AppEducationItem from "./AppEducationItem";
import { css } from "@emotion/react";

interface AppSectionProps {
  theme: {
    item: {
      textColor: string;
      backgroundColor: string;
      linkColor: string;
      onHoverBackgroundColor: string;
      onHoverTextColor: string;
      onHoverTransformDuration: string;
      onHoverBackgroundColorChangeDuration: string;
    };
  };
  data: {
    title: string;
    educationItems: {
      degree_title: string;
      university_name: string;
      location: string;
      duration: string;
      thesis_title: string;
      topics: string[];
    }[];
  };
}

const AppEducationSection: React.FC<AppSectionProps> = (
  props: AppSectionProps
) => {
  return (
    <div
      css={css`
        margin-top: 20px;
        // display: flex;
      `}
    >
      <span
        css={css`
          word-break: break-all;
          display: inline-flex;
          align-items: left;
          justify-content: center;
        `}
      >
        <h2>{props.data.title}</h2>
      </span>
      {props.data.educationItems.map((item, index) => (
        <AppEducationItem
          key={index}
          theme={props.theme.item}
          educationItemData={{
            name: item.university_name,
            location: item.location,
            degree: item.degree_title,
            thesis_title: item.thesis_title,
            date: item.duration,
            topics: item.topics,
          }}
        />
      ))}
    </div>
  );
};

export default AppEducationSection;
