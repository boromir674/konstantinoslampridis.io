
interface EducationItemData {
    // university name
    name: string;
    // university location
    location: string;
    // degree title/name
    degree: string;
    thesis_title: string;
    // thesis:
    //    title: 'Political Spectrum Aware Topic Model'
    //   url: ''
    // date (ie '2019') or date range (ie '2014 - 2019')
    date: string
    // list of courses or topics
    topics: string[];
};

export default EducationItemData;
