interface FindRoom {
  key: string;
  value: RoomDetails;
}
interface RoomDetails {
  orgId: number;
  spaceName: string;
  spaceId: number;
  buildingId: number;
  floorId: number;
  floorName: string;
  organizationId: number;
  isAvailable: boolean;
  availableIn: number;
  spaceResources: ISpaceResource[];
}
interface ISpaceResource {
  facilityId: number;
  facilityName: string;
  resourceCount: number;
  resourceId: number;
}
