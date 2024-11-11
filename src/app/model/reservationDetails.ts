
export class ReservationDetails {
    courseId: string;
    levelId: string;
    courseDuration: string;
    startDate: string;
    endDate: string;
    accomodation: string;
    arrivalOption: string;
    departureOption: string;
    travelOption: string;
    currency: string;
    courseFee: number;
    hostingFee: number;
    administrativeFee: number;
    grandTotal: number;
    paymentOption: string;
    paid: number;
    balance: number;
    status: string;
    comments: string;

    constructor(
        courseId: string,
        levelId: string,
        courseDuration: string,
        startDate: string,
        endDate: string,
        accomodation: string,
        arrivalOption: string,
        departureOption: string,
        travelOption: string,
        currency: string,
        courseFee: number,
        hostingFee: number,
        administrativeFee: number,
        grandTotal: number,
        paymentOption: string,
        paid: number,
        balance: number,
        status: string,
        comments: string
    ) {
        this.courseId = courseId;
        this.levelId = levelId;
        this.courseDuration = courseDuration;
        this.startDate = startDate;
        this.endDate = endDate;
        this.accomodation = accomodation;
        this.arrivalOption = arrivalOption;
        this.departureOption = departureOption;
        this.travelOption = travelOption;
        this.currency = currency;
        this.courseFee = courseFee;
        this.hostingFee = hostingFee;
        this.administrativeFee = administrativeFee;
        this.grandTotal = grandTotal;
        this.paymentOption = paymentOption;
        this.paid = paid;
        this.balance = balance;
        this.status = status;
        this.comments = comments;
    }
}


export class CustomerDetails {
    title: string;
    first_name: string;
    last_name: string;
    address1: string;
    address2: string | null;
    company_name: string | null;
    postcode: string;
    city: string;
    state: string | null;
    country: string;
    email: string;
    mobile_phone_number: string;
    landline_phone_number: string | null;
    language: string;
    birthdate: string;

    constructor(
        title: string,
        first_name: string,
        last_name: string,
        address1: string,
        address2: string | null,
        company_name: string | null,
        postcode: string,
        city: string,
        state: string | null,
        country: string,
        email: string,
        mobile_phone_number: string,
        landline_phone_number: string | null,
        language: string,
        birthdate: string
    ) {
        this.title = title;
        this.first_name = first_name;
        this.last_name = last_name;
        this.address1 = address1;
        this.address2 = address2;
        this.company_name = company_name;
        this.postcode = postcode;
        this.city = city;
        this.state = state;
        this.country = country;
        this.email = email;
        this.mobile_phone_number = mobile_phone_number;
        this.landline_phone_number = landline_phone_number;
        this.language = language;
        this.birthdate = birthdate;
    }
}