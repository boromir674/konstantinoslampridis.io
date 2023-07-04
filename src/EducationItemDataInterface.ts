/** 
* A Person's Education Item information.
* @summary This is how the App represents a Person's Education item.
* @interface EducationItemData
* @property {string} degree_title - The title of the degree.
* @property {string} university_name - The name of the university.
* @property {string} location - The location of the university.
* @property {string} duration - The duration of the degree/studies (ie '2018', '2014 - 2019').
* @property {string} thesis_title - The title of the thesis.
* @property {string[]} topics - List of courses/topics in the degree curriculum.
*/
interface EducationItemData {
    degree_title: string;
    university_name: string;
    location: string;
    duration: string;
    thesis_title: string;
    topics: string[];
  }

export default EducationItemData;
