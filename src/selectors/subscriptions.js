// @flow
/*  eslint-disable import/prefer-default-export */

import { denormalize } from 'denormalizr';

import {
  createImmutableSelectorCreator,
  createImmutableSelector,
  entitiesSelector,
} from './shared';

import { SubscriptionSchema } from '../utils/normalizr/schemas';

export const subscriptionIdSelector = (state, { subscriptionId }) => subscriptionId;

export const subscriptionsSelector = state => entitiesSelector(state).get('subscriptions');

export const denormalizedSubscriptionsSelector = createImmutableSelectorCreator(1)(
  subscriptionsSelector,
  entitiesSelector,
  (subscriptions, entities) => (
    denormalize(subscriptions, entities, [SubscriptionSchema])
  ),
);

export const subscriptionSelector = createImmutableSelector(
  subscriptionIdSelector,
  subscriptionsSelector,
  (subscriptionId, subscriptions) => subscriptions.get(subscriptionId),
);

export default denormalizedSubscriptionsSelector;
