export interface IPaymentResponse {
    id: string;
    object: string;
    is_live: boolean;
    amount: number;
    amount_refunded: number;
    currency: string;
    created_at: number;
    description: string | null;
    is_paid: boolean;
    paid_at: number | null;
    is_refunded: boolean;
    is_3ds: boolean | null;
    save_card: boolean;
    card: {
      last4: string | null;
      country: string | null;
      exp_year: number | null;
      exp_month: number | null;
      brand: string | null;
      id: string | null;
      metadata: any | null;
    };
    hosted_payment: {
      payment_url: string;
      return_url: string;
      cancel_url: string;
      paid_at: number | null;
      sent_by: string | null;
    };
    notification: {
      url: string;
      response_code: number | null;
    };
    metadata: {
      customer_id: string;
    };
    failure: string | null;
    installment_plan_id: string | null;
    authorization: string | null;
    refundable_after: number | null;
    refundable_until: number | null;
    integration: any | null;
    billing: {
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
      mobile_phone_number: string | null;
      landline_phone_number: string | null;
      language: string;
    };
    shipping: {
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
      mobile_phone_number: string | null;
      landline_phone_number: string | null;
      language: string;
      delivery_type: string;
    };
  
  
  }
  