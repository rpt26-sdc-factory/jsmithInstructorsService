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
'/api/instructors' | POST | [{<br>  _id: Number,<br>  firstName: String,<br>  middleInitial: String,<br>  lastName: String,<br>  academicTitle: String,<br>  title: String,<br>  organization: String,<br>  learners: Number,<br>  courses: [{<br>    courseNumber: Number,<br>    isPrimaryInstructor: Boolean<br>  }],<br>  instructorAverageRating: String,<br>  numberOfRatings: Number<br>}]
'/api/offeredbys' | POST | [{<br>  _id: Number,<br>  offeredByIndex: Number,<br>  offeredByName: String,<br>  offeredByDescription: String,<br>}]
'/api/testimonals' | POST | [{<br>  _id: Number,<br>  courseNumber: Number,<br>  name: String,<br>  testimonialText: String<br>}]

### Read

Endpoint | Type | Response
--- | --- | ---
'/api/allinstructors' | GET | [{<br>  _id: Number,<br>  firstName: String,<br>  middleInitial: String,<br>  lastName: String,<br>  academicTitle: String,<br>  title: String,<br>  organization: String,<br>  learners: Number,<br>  courses: [{<br>    courseNumber: Number,<br>    isPrimaryInstructor: Boolean<br>  }],<br>  instructorAverageRating: String,<br>  numberOfRatings: Number<br>}]
'/api/instructors/:courseNumber' | GET | {<br>  _id: Number,<br>  firstName: String,<br>  middleInitial: String,<br>  lastName: String,<br>  academicTitle: String,<br>  title: String,<br>  organization: String,<br>  learners: Number,<br>  courses: [{<br>    courseNumber: Number,<br>    isPrimaryInstructor: Boolean<br>  }],<br>  instructorAverageRating: String,<br>  numberOfRatings: Number<br>}
'/api/primaryinstructor/:courseNumber' | GET | {<br>_id: Number,<br>firstName: String,<br>...<br>numberOfRatings: Number<br>}
'/api/offeredbyall' | GET | [{<br>  id: Number,<br>  offeredByIndex: Number,<br>  offeredByName: String,<br>  offeredByDescription: String,<br>}]
'/api/offeredbys/:courseNumber' | GET | {<br>  _id: Number,<br>  offeredByName: String,<br>  offeredByDescription: String<br>}
'/api/testimonials/:courseNumber' | GET | [{<br>  _id: Number,<br>  courseNumber: Number,<br>  name: String,<br>  testimonialText: String<br>}]

### Update

Endpoint | Type | Expected input
--- | --- | ---
'/api/instructors/:instructorid' | PUT | {<br>  firstName: String,<br>  middleInitial: String,<br>  lastName: String,<br>  academicTitle: String,<br>  title: String,<br>  organization: String,<br>  learners: Number,<br>  courses: [{<br>    courseNumber: Number,<br>    isPrimaryInstructor: Boolean<br>  }],<br>  instructorAverageRating: String,<br>  numberOfRatings: Number<br>}
'/api/offeredbys/:offeredbyid' | PUT | {<br>  offeredByName: String,<br>  offeredByDescription: String<br>}
'/api/testimonals/:testimonialid' | PUT | {<br>  courseNumber: Number,<br>  name: String,<br>  testimonialText: String<br>}

### Delete

Endpoint | Type
--- | ---
'/api/instructors/:instructorid' | DELETE
'/api/offeredbys/:courseNumber' | DELETE
'/api/testimonials/:testimonialid' | DELETE
