// @flow

import type { NameId } from './NameId';

type FormStringField = {
  value: string,
  valid: boolean,
};

type FormNumberField = {
  value: number,
  valid: boolean,
};

type FormNumberArrayField = {
  value: number[],
  valid: boolean,
};

type FormNameIdField = {
  value: NameId,
  valid: boolean,
};
