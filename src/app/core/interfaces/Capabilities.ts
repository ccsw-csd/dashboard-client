export interface Role {
  id : number;
  role : string;
}

export interface GradesRole {
  grade : string;
  totals : number[];
}

export interface InformeTotal {
  profile : string;
  totals : number[];
}

export interface ColumnDetails {
  id : number;
  type : string;
  subtype : string;
  ord : number;
  desc : string;
}
