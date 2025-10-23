import { Earn } from '@renderer/atoms/EarningItem/types'

export interface PropsOnChangeMaterial {
  onChange?: (earn:Earn) => void;
  onlyAvailable?: boolean;
}
