export  interface DescriptionItem {
  key: string;
  value: string;
}

export interface ExtraNightOptions {
  arrival: {
      saturday: number;
      sunday: string;
  } | null;
  departure: {
      saturday: string;
      sunday: number;
  } | null;
  default_arrival_day: string;
  default_departure_day: string;
}

export interface Hosting {
  value: string;
  description: string;
  hostingFee:number;
  extra_night_options: ExtraNightOptions | null;
}

export interface Level {
  options: LevelOption[];
}

export interface LevelOption {
  level: string;
  value: string;
}


export interface CourseDetails {
  start_dates: string[];
  name:string;
  duration: string;
  hostings: Hosting[];
  travelPriceBox: TravelPriceBox[];
}

export interface TravelPriceBox {
  title: string;
  time: string;
  modes: string[];
  price_container: number;
  recommended:boolean;
  prefered:boolean,
  transfer:string;
}

export  interface Course {
  name: string;
  duration: number;
  minduration:number;
  maxduration:number;
  timeFrame:string;
  courseFee:number,
  administrativeFee:number,
  hostingFee:number,
  currency:string,

}

export  interface ContentItem {
  type: string;
  src?: string;
  class?: string;
  alt?: string;
  text?: string;
}

export interface CourseInformation {
  courseType: string;
  description: DescriptionItem[];
  content: ContentItem[];
  course: Course;
  level: Level;
  course_details: CourseDetails;
  courseFee:number,
  AdministrativeFee:number,
  Currency:string,
}