import _ from 'lodash';
import { REDUX_APP } from 'src/components/redux/Matcher';

export const REDUX_NAMESPACE_COMMON = `${REDUX_APP}/common` as const;

/**
 * @param actionType The action type.
 * @returns Whether the action is part of this namespace.
 */
export const match = (actionType: string): boolean => {
  return _.startsWith(actionType, REDUX_NAMESPACE_COMMON);
};
