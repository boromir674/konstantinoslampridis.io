/**
 * A Person's Experience Item information.
 * @summary This is how the App represents a Person's Experience item.
 * @interface ExperienceItemData
 * @property {string} title - The Job title of the Person.
 * @property {string} company - The Company name
 * @property {string} location - The location of the company (or Remote)
 * @property {string} duration - The duration of the occupation (ie '2020 - 2021').
 * @property {string} description - The description of the job.
 * @property {string[]} activities - List of activities performed in the job.
 * @property {string[]} technology_tags - List of technologies used in the job.
 */
interface ExperienceItemData {
  title: string;
  company: string
  location: string;
  duration: string;
  description: string;
  activities: string[];
  technology_tags: string[];
}

export default ExperienceItemData;
