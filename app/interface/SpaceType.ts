
export interface SpaceInfo  {
    spaceId?: number;
    spaceType?: string;
    orgId?:string,
    buildingId?:string;
    spaceAliasName?: string;
    floorId?: number;
    directionNotes?: string;
    email?: string;
    servicingFacilities?: string[];
    resource_count:number;
  };