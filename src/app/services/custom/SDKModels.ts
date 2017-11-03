/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { AccessToken } from '../../models/AccessToken';
import { UserCredential } from '../../models/UserCredential';
import { UserIdentity } from '../../models/UserIdentity';
import { ACL } from '../../models/ACL';
import { RoleMapping } from '../../models/RoleMapping';
import { Role } from '../../models/Role';

interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    AccessToken: AccessToken,
    UserCredential: UserCredential,
    UserIdentity: UserIdentity,
    ACL: ACL,
    RoleMapping: RoleMapping,
    Role: Role,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
