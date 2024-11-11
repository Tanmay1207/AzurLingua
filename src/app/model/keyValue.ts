export class KeyValue {
  text: any;
  value: any;
  type: string;

  
  constructor(text: any, value: any, type:string) {
    this.text = text;
    this.value = value;
    this.type=type;
  }
}


export class DropDownCollection {
  text: any;
  value: any;
  
  constructor(text: any, value: any) {
    this.text = text;
    this.value = value; 
  }
}