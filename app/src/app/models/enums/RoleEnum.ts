import {EnumToString, ResolveEnumNameTable} from '../../utilities/enum.utility';

export enum Role {
  Internal = 0,
  Contractor = 1,
  Homeowner = 2
}


export const RoleNameTable = ResolveEnumNameTable(Role);

export const RoleToString = (role: Role): string => EnumToString(RoleNameTable, role);
