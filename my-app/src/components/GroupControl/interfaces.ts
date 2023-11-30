export interface IGroupControl {
  label: string;
  values: IOption[];
  selected: number;
}

export interface IOption {
  label: string;
  value: string;
  id?: number;
}