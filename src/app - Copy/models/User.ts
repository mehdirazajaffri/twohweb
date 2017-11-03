/* tslint:disable */
import {
  AccessToken,
  UserCredential,
  UserIdentity
} from './index';

declare var Object: any;
export interface UserInterface {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  facebook_id?: string;
  google_id?: string;
  realm?: string;
  username?: string;
  emailVerified?: boolean;
  verificationToken?: string;
  accessTokens?: Array<AccessToken>;
  credentials?: Array<UserCredential>;
  identities?: Array<UserIdentity>;
}

export class User implements UserInterface {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  facebook_id: string;
  google_id: string;
  realm: string;
  username: string;
  emailVerified: boolean;
  verificationToken: string;
  accessTokens: Array<AccessToken>;
  credentials: Array<UserCredential>;
  identities: Array<UserIdentity>;
  constructor(data?: UserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `User`.
   */
  public static getModelName() {
    return "User";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of User for dynamic purposes.
  **/
  public static factory(data: UserInterface): User{
    return new User(data);
  }  
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'User',
      plural: 'users',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
        email: {
          name: 'email',
          type: 'string'
        },
        first_name: {
          name: 'first_name',
          type: 'string'
        },
        last_name: {
          name: 'last_name',
          type: 'string'
        },
        password: {
          name: 'password',
          type: 'string'
        },
        facebook_id: {
          name: 'facebook_id',
          type: 'string'
        },
        google_id: {
          name: 'google_id',
          type: 'string'
        },
        realm: {
          name: 'realm',
          type: 'string'
        },
        username: {
          name: 'username',
          type: 'string'
        },
        emailVerified: {
          name: 'emailVerified',
          type: 'boolean'
        },
        verificationToken: {
          name: 'verificationToken',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'Array<AccessToken>',
          model: 'AccessToken'
        },
        credentials: {
          name: 'credentials',
          type: 'Array<UserCredential>',
          model: 'UserCredential'
        },
        identities: {
          name: 'identities',
          type: 'Array<UserIdentity>',
          model: 'UserIdentity'
        },
      }
    }
  }
}
