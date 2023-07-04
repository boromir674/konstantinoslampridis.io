/** 
* A Person's Personal / Contact information.
* @summary This is how the App represents the Personal Information of a Person.
* @interface PersonalInfo
* @property {string} name - The full name of the Person.
* @property {string} email - The email address of the Person.
* @property {string} github - The github account username of the Person.
* @property {string} gitlab - The gitlab account username of the Person.
* @property {string} linkedin - The linkedin account url of the Person.
*/
interface PersonalInfoInterface {
    name: string;
    email: string;
    github: string;
    gitlab: string;
    linkedin: string;
};

export default PersonalInfoInterface;
