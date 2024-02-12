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

export interface ProfilesAndGrades {
  architects: InformeTotal[];
  softwareEngineer: InformeTotal[];
  industryExperts: InformeTotal[];
  engagementManagers: InformeTotal[];
  businessAnalyst: InformeTotal[];
  architectsCustomApps: InformeTotal[];
  architectsIntegration: InformeTotal[];
  gradeTotal: GradesRole[];
}
