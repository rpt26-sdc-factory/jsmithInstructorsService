# Project Name

> Ingenuity

## Related Projects

  - https://github.com/Ingenuity-rpt26/shane-service-about
  - https://github.com/Ingenuity-rpt26/vinayService1
  - https://github.com/Ingenuity-rpt26/jsmithSyllabusesService
  - https://github.com/Ingenuity-rpt26/Grant--Service_1
  - https://github.com/Ingenuity-rpt26/vinayService2
  - https://github.com/Ingenuity-rpt26/shane-service-summary
  - https://github.com/Ingenuity-rpt26/vinayService2
  - https://github.com/Ingenuity-rpt26/jsmithService1
  - https://github.com/Ingenuity-rpt26/jsmithInstructorsService

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [API](#API)

## Usage
> npm install

Ensure database is running and address and port are correct in ./.env

> npm run seed

## Requirements

Instructors relies on Images service for data

Ensure URL's are correct in ./client/components/instructors/instructors.jsx for instructors service to render images properly.

## Development

Each course has a syllabus.  Each syllabus has one or more weeks.  Each week has one or more lessons.  Each lesson has one or more videos, readings, and exercises.

>The component flow goes...

>Syllabus => Weeks =>  Week => Lesson =>

>        Videos => Video
>        Readings => Reading
>        Exercises => Exercise


### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## API

### Create

Endpoint | Type | Expected input
--- | --- | ---
'/api/addinstructors' | POST | [{<br>  id: Number,<br>  firstName: String,<br>  middleInitial: String,<br>  lastName: String,<br>  academicTitle: String,<br>  title: String,<br>  organization: String,<br>  learners: Number,<br>  courses: [{<br>    courseNumber: Number,<br>    isPrimaryInstructor: Boolean<br>  }],<br>  instructorAverageRating: String,<br>  numberOfRatings: Number<br>}]
'/api/addofferedbys' | POST | [{<br>  id: Number,<br>  offeredByIndex: Number,<br>  offeredByName: String,<br>  offeredByDescription: String,<br>}]
'/api/addtestimonals' | POST | [{<br>  id: Number,<br>  name: String,<br>  testimonialText: String<br>}]

### Read

Endpoint | Type | Response
--- | --- | ---
'/api/allinstructors' | GET | [{<br>  id: Number,<br>  firstName: String,<br>  middleInitial: String,<br>  lastName: String,<br>  academicTitle: String,<br>  title: String,<br>  organization: String,<br>  learners: Number,<br>  courses: [{<br>    courseNumber: Number,<br>    isPrimaryInstructor: Boolean<br>  }],<br>  instructorAverageRating: String,<br>  numberOfRatings: Number<br>}]
'/api/instructors/:courseNumber' | GET | {<br>  id: Number,<br>  firstName: String,<br>  middleInitial: String,<br>  lastName: String,<br>  academicTitle: String,<br>  title: String,<br>  organization: String,<br>  learners: Number,<br>  courses: [{<br>    courseNumber: Number,<br>    isPrimaryInstructor: Boolean<br>  }],<br>  instructorAverageRating: String,<br>  numberOfRatings: Number<br>}
'/api/primaryInstructor/:courseNumber' | GET | {<br>_id: Number,<br>firstName: String,<br>...<br>numberOfRatings: Number<br>}
'/api/offeredByAll' | GET | [{<br>  id: Number,<br>  offeredByIndex: Number,<br>  offeredByName: String,<br>  offeredByDescription: String,<br>}]
'/api/offeredBy/:courseNumber' | GET | {<br>  id: Number,<br>  offeredByName: String,<br>  offeredByDescription: String<br>}
'/api/testimonials/:courseNumber' | GET | [{<br>  id: Number,<br>  name: String,<br>  testimonialText: String<br>}]

### Update

Endpoint | Type | Expected input
--- | --- | ---
'/api/editinstructor/:instructorid' | PUT | {<br>  id: Number,<br>  firstName: String,<br>  middleInitial: String,<br>  lastName: String,<br>  academicTitle: String,<br>  title: String,<br>  organization: String,<br>  learners: Number,<br>  courses: [{<br>    courseNumber: Number,<br>    isPrimaryInstructor: Boolean<br>  }],<br>  instructorAverageRating: String,<br>  numberOfRatings: Number<br>}
'/api/editinstructor/:instructorid/addcourse' | PUT | {<br>    courseNumber: Number,<br>    isPrimaryInstructor: Boolean<br>  }
'/api/editinstructor/:instructorid/addcourses' | PUT | [{<br>    courseNumber: Number,<br>    isPrimaryInstructor: Boolean<br>  }]
'/api/editinstructor/:instructorid/removecourse' | PUT | {<br>    courseNumber: Number<br>  }
'/api/editinstructor/:instructorid/removecourses' | PUT | [{<br>    courseNumber: Number<br>  }]
'/api/editofferedby/:offeredbyid' | PUT | {<br>  id: Number,<br>  offeredByName: String,<br>  offeredByDescription: String<br>}
'/api/edittestimonal/:testimonialid' | PUT | {<br>  id: Number,<br>  offeredByName: String,<br>  offeredByDescription: String<br>}

### Delete

Endpoint | Type | Expected input
--- | --- | ---
'/api/deleteinstructor/:instructorid' | DELETE | {<br>  id: Number<br>}
'/api/deleteofferedby/:offeredbyid' | DELETE | {<br>  id: Number<br>}
'/api/deletetestimonal/:testimonialid' | DELETE | {<br>  id: Number<br>}
