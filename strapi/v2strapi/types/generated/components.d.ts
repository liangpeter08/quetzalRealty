import type { Schema, Attribute } from '@strapi/strapi';

export interface ActivitiesActivities extends Schema.Component {
  collectionName: 'components_activities_activities';
  info: {
    displayName: 'Activities';
  };
  attributes: {
    time: Attribute.DateTime;
    activityId: Attribute.String;
    data: Attribute.JSON;
    description: Attribute.String;
    member: Attribute.Relation<
      'activities.activities',
      'oneToOne',
      'api::member.member'
    >;
  };
}

export interface DepositDeposit extends Schema.Component {
  collectionName: 'components_deposit_deposits';
  info: {
    displayName: 'Deposit';
  };
  attributes: {
    depositNumber: Attribute.Integer;
    depositAmount: Attribute.Float;
    date: Attribute.Date;
    status: Attribute.Enumeration<
      ['Outstanding', 'Received', 'Cleared', 'NSF']
    >;
    amountReceived: Attribute.Float;
  };
}

export interface UserPurchaser extends Schema.Component {
  collectionName: 'components_test_purchasers';
  info: {
    displayName: 'Purchaser';
    description: '';
  };
  attributes: {
    firstName: Attribute.String;
    lastName: Attribute.String;
    streetAddress: Attribute.String;
    city: Attribute.String;
    province: Attribute.String;
    idFront: Attribute.Media;
    idBack: Attribute.Media;
    isCorporation: Attribute.Boolean;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'activities.activities': ActivitiesActivities;
      'deposit.deposit': DepositDeposit;
      'user.purchaser': UserPurchaser;
    }
  }
}
