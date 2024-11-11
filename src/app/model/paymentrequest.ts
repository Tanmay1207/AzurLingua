import { CustomerDetails, ReservationDetails } from "./reservationDetails";

export interface CourseRegistration {
 
    paymmentInfo: {
      gender: string;
      firstName: string;
      lastName: string;
      birthDate: string;
      phoneNumber: string;
      email: string;
      address: string;
      postalCode: string;
      city: string;
      country: string;
      authorization: string;
      emergencyPhoneNumber: string;
      comment: string;
      amount:number;
      currency: string;
    }
    courseInfo: {
      level: string;
      courseStart: string;
      duration_weeks: number;
      individualLesson: string;
      hosting: string;
      arrivalOption: string;
      departureOption: string;
    };
    reservationDetails:ReservationDetails,
    customerDetails:CustomerDetails
  }
  